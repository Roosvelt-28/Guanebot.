// ============================================================
//  museum.js — Motor 3D (Three.js)
//
//  Crea la escena, las salas, las piezas, las luces y expone
//  referencias a las funciones de raycast que usa controls.js
//  y ui.js.
//  THREE se carga como script clásico en libs/three.min.js y
//  queda accesible como window.THREE.
// ============================================================

import { SALAS, PIEZAS, setCultura, getCulturaActual } from './data/index.js';

const SL = 22, RW = 10, RH = 5;
const MOBILE_RE = /Android|iPhone|iPad|iPod/i;
const esMovil = MOBILE_RE.test(navigator.userAgent);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Estado global del museo
let scene, cam, ren, clk;
let px = 0, pz = 1.5, yaw = 0;
let objs = [];
let ray, mouse2;
let salaActual = 0;   // compartida con ui.js (sincronizada al caminar o al click en nav)
let resizeHandler = null; // para no acumular listeners al cambiar de cultura

// Materiales compartidos (rendimiento)
let matMarcoOro;

// Paleta de la cultura activa (paredes, techo, fondo, acento, alfombra)
let paleta;
const hexStr = (n) => '#' + n.toString(16).padStart(6, '0');

// initMuseo reemplaza a la antigua init3D(). Recibe el id de la
// cultura a mostrar ('guane', 'muisca', ...) y construye la escena.
// Si ya había un museo construido (el usuario cambió de cultura),
// primero limpia todo para no dejar canvases ni luces duplicadas.
export function initMuseo(culturaId) {
  setCultura(culturaId);
  paleta = getCulturaActual().paleta;

  if (ren) {
    ren.domElement.remove();
    if (resizeHandler) removeEventListener('resize', resizeHandler);
  }
  objs = [];
  salaActual = 0;
  px = 0; pz = 1.5; yaw = 0;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(paleta.fondo);
  scene.fog = new THREE.FogExp2(paleta.fondo, esMovil ? 0.035 : 0.02);

  cam = new THREE.PerspectiveCamera(esMovil ? 65 : 72, innerWidth / innerHeight, 0.1, esMovil ? 60 : 120);
  cam.position.set(px, 1.7, pz);

  ren = new THREE.WebGLRenderer({ antialias: !esMovil, powerPreference: 'high-performance' });
  ren.setSize(innerWidth, innerHeight);
  ren.setPixelRatio(esMovil ? 1 : Math.min(devicePixelRatio, 1.5));
  ren.toneMapping = esMovil ? THREE.NoToneMapping : THREE.ACESFilmicToneMapping;
  ren.toneMappingExposure = 1.0;
  ren.shadowMap.enabled = false;
  document.body.insertBefore(ren.domElement, document.body.firstChild);

  clk = new THREE.Clock();
  ray  = new THREE.Raycaster();
  mouse2 = new THREE.Vector2();

  // Materiales compartidos
  matMarcoOro = new THREE.MeshStandardMaterial({ color: paleta.acento, roughness: 0.3, metalness: 0.65 });

  construirMuseo(PIEZAS);
  ponerLuces();

  resizeHandler = () => {
    cam.aspect = innerWidth / innerHeight;
    cam.updateProjectionMatrix();
    ren.setSize(innerWidth, innerHeight);
  };
  addEventListener('resize', resizeHandler);
}

function plano(w, h, m, x, y, z, rx, ry) {
  const p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m);
  p.rotation.x = rx; p.rotation.y = ry; p.position.set(x, y, z);
  scene.add(p);
}

function caja(w, h, d, m, x, y, z) {
  const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
  b.position.set(x, y, z); scene.add(b); return b;
}

// Oscurece un color hex por un factor 0..1 (para el piso, más oscuro que las paredes)
function oscurecer(hex, factor) {
  const r = Math.round(((hex >> 16) & 255) * factor);
  const g = Math.round(((hex >> 8) & 255) * factor);
  const b = Math.round((hex & 255) * factor);
  return (r << 16) | (g << 8) | b;
}

// Genera una textura de piedra procedural con la identidad de cada cultura:
// grano de roca, opcionalmente sillares tallados con juntas de mortero, y
// vetas/motas minerales u oro (color y cantidad definidos por la cultura).
function crearTexturaPiedra({ base, veta, vetaIntensidad = 0.3, bloques = true, tam = 512 }) {
  const c = document.createElement('canvas'); c.width = tam; c.height = tam;
  const x = c.getContext('2d');
  const seed = (n) => { const v = Math.sin(n * 127.1) * 43758.5453; return v - Math.floor(v); };

  x.fillStyle = hexStr(base);
  x.fillRect(0, 0, tam, tam);

  // Grano de piedra: manchas claras/oscuras aleatorias
  for (let i = 0; i < 130; i++) {
    const sx = seed(i) * tam, sy = seed(i + 500) * tam;
    const r = 5 + seed(i + 20) * 24;
    x.fillStyle = seed(i + 80) > 0.5 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.09)';
    x.beginPath(); x.arc(sx, sy, r, 0, Math.PI * 2); x.fill();
  }

  if (bloques) {
    // Sillares de piedra tallada: hiladas con juntas de mortero, desplazadas
    const filas = 6, altoFila = tam / filas;
    x.strokeStyle = 'rgba(0,0,0,0.35)'; x.lineWidth = 3;
    for (let f = 0; f <= filas; f++) {
      const y = f * altoFila;
      x.beginPath(); x.moveTo(0, y); x.lineTo(tam, y); x.stroke();
    }
    for (let f = 0; f < filas; f++) {
      const y = f * altoFila;
      const offset = (f % 2) * (tam / 8);
      for (let n = 0; n <= 4; n++) {
        const xx = (n * tam / 4 + offset) % tam;
        x.beginPath(); x.moveTo(xx, y); x.lineTo(xx, y + altoFila); x.stroke();
      }
    }
  }

  // Vetas: trazos fluidos de mineral/oro (más largos y curvos en piedra pulida)
  const vetaStr = hexStr(veta);
  const numVetas = Math.round(3 + vetaIntensidad * 9);
  for (let i = 0; i < numVetas; i++) {
    let cx = seed(i + 200) * tam, cy = seed(i + 300) * tam;
    x.strokeStyle = vetaStr;
    x.globalAlpha = 0.16 + vetaIntensidad * 0.5;
    x.lineWidth = bloques ? 1.3 + seed(i + 11) * 1.8 : 2.2 + seed(i + 11) * 3.5;
    x.beginPath(); x.moveTo(cx, cy);
    const pasos = 5 + Math.floor(seed(i + 7) * 5);
    for (let p = 0; p < pasos; p++) {
      cx += (seed(i + p * 13) - 0.5) * (tam / 7);
      cy += (seed(i + p * 17 + 5) - 0.5) * (tam / 7);
      x.lineTo(cx, cy);
    }
    x.stroke();
  }

  // Motas dispersas (más densas cuanta más "vetaIntensidad" = más oro/mineral)
  const motas = Math.round(vetaIntensidad * 65);
  for (let i = 0; i < motas; i++) {
    const sx = seed(i + 900) * tam, sy = seed(i + 950) * tam;
    x.globalAlpha = 0.3 + seed(i + 3) * 0.4;
    x.fillStyle = vetaStr;
    x.beginPath(); x.arc(sx, sy, 0.6 + seed(i + 6) * 1.6, 0, Math.PI * 2); x.fill();
  }
  x.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// Textura de TIERRA APISONADA (piso Guane): suelo de arcilla humedecida y
// pisada hasta compactarse. Sin juntas de sillar — en su lugar, una red fina
// de grietas de secado irregulares y grano de tierra/arena muy sutil.
function crearTexturaTierraApisonada({ base, veta, vetaIntensidad = 0.15, tam = 512 }) {
  const c = document.createElement('canvas'); c.width = tam; c.height = tam;
  const x = c.getContext('2d');
  const seed = (n) => { const v = Math.sin(n * 127.1) * 43758.5453; return v - Math.floor(v); };

  x.fillStyle = hexStr(base);
  x.fillRect(0, 0, tam, tam);

  // Manchas suaves de humedad/compactación desigual (parches ligeramente más
  // claros u oscuros, de bordes difusos — no manchas redondas nítidas)
  for (let i = 0; i < 40; i++) {
    const sx = seed(i + 40) * tam, sy = seed(i + 640) * tam;
    const r = 30 + seed(i + 60) * 70;
    const grad = x.createRadialGradient(sx, sy, 0, sx, sy, r);
    const claro = seed(i + 90) > 0.5;
    grad.addColorStop(0, claro ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = grad;
    x.beginPath(); x.arc(sx, sy, r, 0, Math.PI * 2); x.fill();
  }

  // Grano fino de tierra/arena compactada
  for (let i = 0; i < 220; i++) {
    const sx = seed(i + 1000) * tam, sy = seed(i + 1500) * tam;
    x.fillStyle = seed(i + 1080) > 0.5 ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)';
    x.beginPath(); x.arc(sx, sy, 0.8 + seed(i + 1020) * 2, 0, Math.PI * 2); x.fill();
  }

  // Grietas de secado: red de líneas finas, quebradas e irregulares — como
  // barro apisonado que se contrajo al secar. Nada de líneas rectas.
  x.strokeStyle = 'rgba(0,0,0,0.22)';
  const numGrietas = 5;
  for (let i = 0; i < numGrietas; i++) {
    let cx = seed(i + 2000) * tam, cy = seed(i + 2100) * tam;
    x.lineWidth = 0.8 + seed(i + 5) * 0.9;
    x.beginPath(); x.moveTo(cx, cy);
    const pasos = 6 + Math.floor(seed(i + 4) * 6);
    for (let p = 0; p < pasos; p++) {
      cx += (seed(i + p * 23) - 0.5) * (tam / 6);
      cy += (seed(i + p * 29 + 3) - 0.5) * (tam / 6);
      x.lineTo(cx, cy);
      // pequeñas ramificaciones ocasionales
      if (seed(i + p * 31) > 0.75) {
        const bx = cx + (seed(i + p * 37) - 0.5) * (tam / 10);
        const by = cy + (seed(i + p * 41) - 0.5) * (tam / 10);
        x.moveTo(cx, cy); x.lineTo(bx, by); x.moveTo(cx, cy);
      }
    }
    x.stroke();
  }

  // Motas de arcilla/óxido (color "veta" reutilizado como tono de arcilla)
  if (veta) {
    const vetaStr = hexStr(veta);
    const motas = Math.round(8 + vetaIntensidad * 40);
    for (let i = 0; i < motas; i++) {
      const sx = seed(i + 3000) * tam, sy = seed(i + 3100) * tam;
      x.globalAlpha = 0.12 + seed(i + 6) * 0.18;
      x.fillStyle = vetaStr;
      x.beginPath(); x.arc(sx, sy, 1 + seed(i + 8) * 3, 0, Math.PI * 2); x.fill();
    }
    x.globalAlpha = 1;
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// Textura de BAHAREQUE (paredes Guane): armazón de cañabrava/guadua relleno
// de barro con paja o bagazo. Superficie orgánica, rugosa e irregular, sin
// juntas rectas de sillar — con parches de barro desigual y fibras vegetales
// visibles asomando en la mezcla.
function crearTexturaBahareque({ base, veta, fibra, vetaIntensidad = 0.25, tam = 512 }) {
  const c = document.createElement('canvas'); c.width = tam; c.height = tam;
  const x = c.getContext('2d');
  const seed = (n) => { const v = Math.sin(n * 127.1) * 43758.5453; return v - Math.floor(v); };

  x.fillStyle = hexStr(base);
  x.fillRect(0, 0, tam, tam);

  // Parches de barro de tono desigual (greda más clara en unas zonas, más
  // rojiza/oscura en otras — el acabado nunca es uniforme a mano)
  for (let i = 0; i < 55; i++) {
    const sx = seed(i + 40) * tam, sy = seed(i + 640) * tam;
    const r = 25 + seed(i + 60) * 90;
    const grad = x.createRadialGradient(sx, sy, 0, sx, sy, r);
    const claro = seed(i + 90) > 0.5;
    grad.addColorStop(0, claro ? 'rgba(255,235,200,0.10)' : 'rgba(80,40,10,0.10)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = grad;
    x.beginPath(); x.arc(sx, sy, r, 0, Math.PI * 2); x.fill();
  }

  // Insinuación del armazón de cañabrava/guadua bajo el barro: líneas
  // verticales muy irregulares en espaciado y opacidad (no una grilla)
  x.strokeStyle = 'rgba(0,0,0,0.10)';
  const postes = 7;
  for (let i = 0; i < postes; i++) {
    const xx = (i / postes) * tam + (seed(i + 700) - 0.5) * (tam / postes) * 0.6;
    x.lineWidth = 3 + seed(i + 12) * 5;
    x.globalAlpha = 0.3 + seed(i + 15) * 0.3;
    x.beginPath(); x.moveTo(xx, 0); x.lineTo(xx + (seed(i + 20) - 0.5) * 14, tam); x.stroke();
  }
  x.globalAlpha = 1;

  // Grano rugoso general del repello de barro
  for (let i = 0; i < 260; i++) {
    const sx = seed(i + 1000) * tam, sy = seed(i + 1500) * tam;
    x.fillStyle = seed(i + 1080) > 0.5 ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)';
    x.beginPath(); x.arc(sx, sy, 1 + seed(i + 1020) * 3, 0, Math.PI * 2); x.fill();
  }

  // Fibras vegetales (paja/bagazo) asomando en la mezcla: trazos cortos y
  // finos en tono claro de paja, orientados al azar
  const fibraStr = hexStr(fibra || veta);
  const numFibras = Math.round(35 + vetaIntensidad * 40);
  x.strokeStyle = fibraStr;
  for (let i = 0; i < numFibras; i++) {
    const sx = seed(i + 4000) * tam, sy = seed(i + 4100) * tam;
    const ang = seed(i + 4200) * Math.PI * 2;
    const len = 4 + seed(i + 4300) * 10;
    x.globalAlpha = 0.15 + seed(i + 4400) * 0.35;
    x.lineWidth = 0.6 + seed(i + 4500) * 0.8;
    x.beginPath();
    x.moveTo(sx, sy);
    x.lineTo(sx + Math.cos(ang) * len, sy + Math.sin(ang) * len);
    x.stroke();
  }

  // Grietas finas de secado del repello, más dispersas que en el piso
  x.strokeStyle = 'rgba(0,0,0,0.18)';
  const numGrietas = 3;
  for (let i = 0; i < numGrietas; i++) {
    let cx = seed(i + 2000) * tam, cy = seed(i + 2100) * tam;
    x.lineWidth = 0.7 + seed(i + 5) * 0.7;
    x.globalAlpha = 0.6;
    x.beginPath(); x.moveTo(cx, cy);
    const pasos = 4 + Math.floor(seed(i + 4) * 5);
    for (let p = 0; p < pasos; p++) {
      cx += (seed(i + p * 23) - 0.5) * (tam / 5);
      cy += (seed(i + p * 29 + 3) - 0.5) * (tam / 5);
      x.lineTo(cx, cy);
    }
    x.stroke();
  }
  x.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// Textura de MADERA/CAÑA (paredes Tayrona): varas de madera maciza o caña
// entrelazada, alineadas verticalmente, SIN pañetado de barro — se ve la
// veta de cada vara individual, con nudos ocasionales.
function crearTexturaMaderaCana({ base, veta, tam = 512 }) {
  const c = document.createElement('canvas'); c.width = tam; c.height = tam;
  const x = c.getContext('2d');
  const seed = (n) => { const v = Math.sin(n * 127.1) * 43758.5453; return v - Math.floor(v); };

  x.fillStyle = hexStr(base);
  x.fillRect(0, 0, tam, tam);

  const varas = 13;
  const anchoBase = tam / varas;
  const vetaStr = hexStr(veta || base);

  for (let i = 0; i < varas; i++) {
    const w = anchoBase * (0.85 + seed(i + 10) * 0.3);
    const cx = i * anchoBase + anchoBase / 2;

    // sombreado cilíndrico de la vara: más clara al centro, oscura en los bordes
    const grad = x.createLinearGradient(cx - w / 2, 0, cx + w / 2, 0);
    const claro = seed(i + 50) > 0.5;
    grad.addColorStop(0, 'rgba(0,0,0,0.16)');
    grad.addColorStop(0.5, claro ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.02)');
    grad.addColorStop(1, 'rgba(0,0,0,0.16)');
    x.fillStyle = grad;
    x.fillRect(cx - w / 2, 0, w, tam);

    // veta de la madera: trazos verticales largos y ligeramente ondulados
    const hebras = 3 + Math.floor(seed(i + 70) * 3);
    for (let h = 0; h < hebras; h++) {
      let hx = cx - w / 2 + (h + 0.5) * (w / hebras) + (seed(i + h * 3) - 0.5) * (w / hebras) * 0.4;
      x.strokeStyle = vetaStr;
      x.globalAlpha = 0.1 + seed(i + h + 5) * 0.15;
      x.lineWidth = 0.7 + seed(i + h + 8) * 0.6;
      x.beginPath(); x.moveTo(hx, 0);
      for (let y = 0; y <= tam; y += tam / 10) {
        hx += (seed(i + h + y) - 0.5) * (w * 0.12);
        x.lineTo(hx, y);
      }
      x.stroke();
    }
    x.globalAlpha = 1;

    // nudos ocasionales
    if (seed(i + 200) > 0.6) {
      const ny = seed(i + 210) * tam;
      x.strokeStyle = 'rgba(0,0,0,0.3)'; x.lineWidth = 1.2;
      x.beginPath(); x.ellipse(cx, ny, w * 0.18, w * 0.32, 0, 0, Math.PI * 2); x.stroke();
    }

    // juntura oscura entre varas
    x.strokeStyle = 'rgba(0,0,0,0.35)'; x.lineWidth = 1.4;
    x.beginPath(); x.moveTo(cx - w / 2, 0); x.lineTo(cx - w / 2, tam); x.stroke();
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// Textura de GUADUA (paredes Quimbaya): cañas de bambú verticales con sus
// nudos característicos, más un revoque de barro muy ligero por encima.
function crearTexturaGuadua({ base, veta, tam = 512 }) {
  const c = document.createElement('canvas'); c.width = tam; c.height = tam;
  const x = c.getContext('2d');
  const seed = (n) => { const v = Math.sin(n * 127.1) * 43758.5453; return v - Math.floor(v); };

  x.fillStyle = hexStr(base);
  x.fillRect(0, 0, tam, tam);

  const canas = 11;
  const ancho = tam / canas;
  for (let i = 0; i < canas; i++) {
    const cx = i * ancho + ancho / 2;
    const w = ancho * 0.92;

    // cilindro de la caña
    const grad = x.createLinearGradient(cx - w / 2, 0, cx + w / 2, 0);
    grad.addColorStop(0, 'rgba(0,0,0,0.20)');
    grad.addColorStop(0.45, 'rgba(255,255,255,0.10)');
    grad.addColorStop(1, 'rgba(0,0,0,0.20)');
    x.fillStyle = grad;
    x.fillRect(cx - w / 2, 0, w, tam);

    // estrías finas verticales propias del bambú
    for (let e = 0; e < 5; e++) {
      const ex = cx - w / 2 + (e + 0.5) * (w / 5);
      x.strokeStyle = 'rgba(0,0,0,0.10)'; x.lineWidth = 0.6;
      x.beginPath(); x.moveTo(ex, 0); x.lineTo(ex, tam); x.stroke();
    }

    // nudos del bambú: bandas horizontales a intervalos irregulares
    let ny = seed(i + 300) * (tam / 6);
    while (ny < tam) {
      x.strokeStyle = 'rgba(0,0,0,0.35)'; x.lineWidth = 3;
      x.beginPath(); x.moveTo(cx - w / 2, ny); x.lineTo(cx + w / 2, ny); x.stroke();
      x.strokeStyle = 'rgba(255,255,255,0.12)'; x.lineWidth = 1;
      x.beginPath(); x.moveTo(cx - w / 2, ny + 3); x.lineTo(cx + w / 2, ny + 3); x.stroke();
      ny += tam / 6 + seed(i + ny) * (tam / 8);
    }

    x.strokeStyle = 'rgba(0,0,0,0.3)'; x.lineWidth = 1;
    x.beginPath(); x.moveTo(cx - w / 2, 0); x.lineTo(cx - w / 2, tam); x.stroke();
  }

  // revoque de barro muy ligero por encima (parches suaves y dispersos)
  const vetaStr = hexStr(veta || base);
  for (let i = 0; i < 30; i++) {
    const sx = seed(i + 40) * tam, sy = seed(i + 640) * tam;
    const r = 25 + seed(i + 60) * 60;
    const grad = x.createRadialGradient(sx, sy, 0, sx, sy, r);
    grad.addColorStop(0, 'rgba(255,240,210,0.06)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = grad;
    x.beginPath(); x.arc(sx, sy, r, 0, Math.PI * 2); x.fill();
  }
  void vetaStr;

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// Textura de TRONCOS con tejido vegetal / bahareque rústico (paredes Calima):
// troncos redondos de ancho irregular, envueltos por amarres de fibra que
// cruzan en diagonal, con algunos parches rústicos de barro entre troncos.
function crearTexturaTroncos({ base, veta, fibra, tam = 512 }) {
  const c = document.createElement('canvas'); c.width = tam; c.height = tam;
  const x = c.getContext('2d');
  const seed = (n) => { const v = Math.sin(n * 127.1) * 43758.5453; return v - Math.floor(v); };

  x.fillStyle = hexStr(base);
  x.fillRect(0, 0, tam, tam);

  const troncos = 9;
  let cursor = 0;
  for (let i = 0; i < troncos; i++) {
    const w = (tam / troncos) * (0.75 + seed(i + 10) * 0.6); // ancho irregular
    const cx = cursor + w / 2;

    const grad = x.createLinearGradient(cx - w / 2, 0, cx + w / 2, 0);
    grad.addColorStop(0, 'rgba(0,0,0,0.22)');
    grad.addColorStop(0.45, 'rgba(255,255,255,0.08)');
    grad.addColorStop(1, 'rgba(0,0,0,0.22)');
    x.fillStyle = grad;
    x.fillRect(cx - w / 2, 0, w, tam);

    x.strokeStyle = 'rgba(0,0,0,0.3)'; x.lineWidth = 1.3;
    x.beginPath(); x.moveTo(cx - w / 2, 0); x.lineTo(cx - w / 2, tam); x.stroke();

    cursor += w;
  }

  // amarres de fibra vegetal: bandas de tejido diagonal cruzado a distintas alturas
  const fibraStr = hexStr(fibra || veta || base);
  const bandas = 5;
  for (let b = 0; b < bandas; b++) {
    const by = seed(b + 900) * tam;
    const alto = 14 + seed(b + 20) * 10;
    x.strokeStyle = fibraStr;
    x.globalAlpha = 0.35;
    x.lineWidth = 1.6;
    for (let d = -tam; d < tam * 2; d += 12) {
      x.beginPath(); x.moveTo(d, by); x.lineTo(d + alto, by + alto); x.stroke();
      x.beginPath(); x.moveTo(d, by + alto); x.lineTo(d + alto, by); x.stroke();
    }
  }
  x.globalAlpha = 1;

  // parches rústicos de barro entre los troncos (irregularidad de bahareque)
  const vetaStr = hexStr(veta || base);
  for (let i = 0; i < 20; i++) {
    const sx = seed(i + 40) * tam, sy = seed(i + 640) * tam;
    const r = 15 + seed(i + 60) * 40;
    x.globalAlpha = 0.1 + seed(i + 3) * 0.12;
    x.fillStyle = vetaStr;
    x.beginPath(); x.arc(sx, sy, r, 0, Math.PI * 2); x.fill();
  }
  x.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// Textura de PAJA/PALMA (techos Muisca, Tayrona, Quimbaya, Calima): capas de
// fibra vegetal tejida a modo de "tejas" superpuestas de arriba hacia abajo,
// cada una hecha de muchas hebras cortas. `grueso` da capas más anchas y
// pesadas (Calima, para lluvias intensas de selva).
function crearTexturaPaja({ base, veta, grueso = false, tam = 512 }) {
  const c = document.createElement('canvas'); c.width = tam; c.height = tam;
  const x = c.getContext('2d');
  const seed = (n) => { const v = Math.sin(n * 127.1) * 43758.5453; return v - Math.floor(v); };

  x.fillStyle = hexStr(base);
  x.fillRect(0, 0, tam, tam);

  const vetaStr = hexStr(veta || base);
  const altoCapa = grueso ? tam / 7 : tam / 12;
  const capas = Math.ceil(tam / altoCapa) + 1;
  const hebrasPorCapa = grueso ? 34 : 46;

  for (let cIdx = 0; cIdx < capas; cIdx++) {
    const yBase = cIdx * altoCapa * 0.82; // se solapan como tejas
    for (let h = 0; h < hebrasPorCapa; h++) {
      const hx = seed(cIdx * 97 + h) * tam;
      const largo = altoCapa * (0.9 + seed(cIdx * 53 + h) * 0.6);
      const grosorHebra = grueso ? 2.2 + seed(cIdx + h) * 2.2 : 1 + seed(cIdx + h) * 1.4;
      const claro = seed(cIdx * 31 + h + 5) > 0.5;
      x.strokeStyle = claro ? 'rgba(255,238,200,0.22)' : vetaStr;
      x.globalAlpha = claro ? 1 : 0.22 + seed(cIdx + h + 8) * 0.25;
      x.lineWidth = grosorHebra;
      const deriva = (seed(cIdx * 71 + h) - 0.5) * altoCapa * 0.5;
      x.beginPath();
      x.moveTo(hx, yBase);
      x.lineTo(hx + deriva, yBase + largo);
      x.stroke();
    }
  }
  x.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// Franja tipo "greca" (rombos en zigzag) cerca del techo, con el acento de la cultura
function crearTexturaGreca(pal) {
  const w = 512, h = 96;
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const x = c.getContext('2d');
  x.fillStyle = hexStr(pal.techo); x.fillRect(0, 0, w, h);
  const paso = 48;
  x.strokeStyle = hexStr(pal.acento);
  x.lineWidth = 3;
  for (let i = -1; i * paso < w + paso; i++) {
    const cx = i * paso;
    x.beginPath();
    x.moveTo(cx, h / 2);
    x.lineTo(cx + paso / 2, h * 0.18);
    x.lineTo(cx + paso, h / 2);
    x.lineTo(cx + paso / 2, h * 0.82);
    x.closePath();
    x.stroke();
  }
  x.strokeStyle = hexStr(pal.acento); x.globalAlpha = 0.5; x.lineWidth = 1.5;
  x.beginPath(); x.moveTo(0, h * 0.12); x.lineTo(w, h * 0.12); x.stroke();
  x.beginPath(); x.moveTo(0, h * 0.88); x.lineTo(w, h * 0.88); x.stroke();
  x.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// Glifos geométricos simples inspirados en simbología precolombina
function glifoSol(x, cx, cy, r) {
  x.beginPath(); x.arc(cx, cy, r * 0.42, 0, Math.PI * 2); x.stroke();
  for (let a = 0; a < 8; a++) {
    const ang = (a * Math.PI) / 4;
    x.beginPath();
    x.moveTo(cx + Math.cos(ang) * r * 0.55, cy + Math.sin(ang) * r * 0.55);
    x.lineTo(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r);
    x.stroke();
  }
}
function glifoEspiral(x, cx, cy, r) {
  x.beginPath();
  for (let t = 0; t <= 620; t += 10) {
    const rad = (t / 620) * r;
    const ang = (t * Math.PI) / 90;
    const px = cx + Math.cos(ang) * rad, py = cy + Math.sin(ang) * rad;
    if (t === 0) x.moveTo(px, py); else x.lineTo(px, py);
  }
  x.stroke();
}
function glifoZigzag(x, cx, cy, r) {
  x.beginPath(); x.moveTo(cx - r, cy);
  for (let i = 0; i < 4; i++) {
    x.lineTo(cx - r + (i + 0.5) * (r * 2 / 4), cy + (i % 2 === 0 ? -r * 0.5 : r * 0.5));
  }
  x.lineTo(cx + r, cy);
  x.stroke();
}
function glifoRombo(x, cx, cy, r) {
  x.beginPath();
  x.moveTo(cx, cy - r); x.lineTo(cx + r * 0.62, cy);
  x.lineTo(cx, cy + r); x.lineTo(cx - r * 0.62, cy);
  x.closePath(); x.stroke();
}

// Franja de símbolos cerca del piso, como el friso de íconos de la referencia
function crearTexturaSimbolos(pal) {
  const w = 512, h = 128;
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const x = c.getContext('2d');
  x.fillStyle = hexStr(oscurecer(pal.pared, 0.55)); x.fillRect(0, 0, w, h);
  x.strokeStyle = hexStr(pal.acento); x.globalAlpha = 0.7; x.lineWidth = 2;
  x.beginPath(); x.moveTo(0, h * 0.1); x.lineTo(w, h * 0.1); x.stroke();
  x.beginPath(); x.moveTo(0, h * 0.9); x.lineTo(w, h * 0.9); x.stroke();
  x.globalAlpha = 1;
  x.strokeStyle = hexStr(pal.acento); x.lineWidth = 3;
  const glifos = [glifoSol, glifoEspiral, glifoZigzag, glifoRombo];
  const n = 4;
  for (let i = 0; i < n; i++) {
    const cx = (i + 0.5) * (w / n);
    glifos[i % glifos.length](x, cx, h / 2, 30);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function construirMuseo(piezas) {
  // tipoPiso/tipoPared permiten que una cultura reemplace la piedra genérica
  // por un material propio (p. ej. Guane: tierra apisonada + bahareque).
  // Si no se definen, el comportamiento es exactamente el de siempre (piedra).
  const tipoPiso  = paleta.tipoPiso  || 'piedra';
  const tipoPared = paleta.tipoPared || 'piedra';
  const tipoTecho = paleta.tipoTecho || 'piedra';

  // Piso
  const texSuelo = tipoPiso === 'tierra'
    ? crearTexturaTierraApisonada({
        base: paleta.piso || oscurecer(paleta.pared, 0.5),
        veta: paleta.veta,
        vetaIntensidad: paleta.vetaIntensidad * 0.5,
      })
    // Piedra más oscura que las paredes, mismas vetas pero un poco más discretas
    : crearTexturaPiedra({
        base: paleta.piso || oscurecer(paleta.pared, 0.5),
        veta: paleta.veta,
        vetaIntensidad: paleta.vetaIntensidad * 0.8,
        bloques: true,
      });
  texSuelo.repeat.set(2, SALAS.length * 1.3);

  // Techo: piedra por defecto; paja/palma tejida en las culturas que la usan
  const texTecho = tipoTecho === 'paja'
    ? crearTexturaPaja({
        base: paleta.techo,
        veta: paleta.veta,
        grueso: !!paleta.techoGrueso,
        tam: 384,
      })
    : crearTexturaPiedra({
        base: paleta.techo,
        veta: paleta.veta,
        vetaIntensidad: paleta.vetaIntensidad * 0.4,
        bloques: paleta.bloques,
        tam: 384,
      });
  texTecho.repeat.set(2, SALAS.length * 1.3);

  // Paredes: piedra tallada en sillares por defecto; cada cultura puede
  // reemplazarla por su propio material — bahareque (Guane, Muisca),
  // madera/caña alineada (Tayrona), guadua con revoque ligero (Quimbaya)
  // o troncos con tejido vegetal (Calima).
  const generadoresPared = {
    bahareque: () => crearTexturaBahareque({ base: paleta.pared, veta: paleta.veta, fibra: paleta.fibra, vetaIntensidad: paleta.vetaIntensidad }),
    maderaCana: () => crearTexturaMaderaCana({ base: paleta.pared, veta: paleta.veta }),
    guadua: () => crearTexturaGuadua({ base: paleta.pared, veta: paleta.veta }),
    troncos: () => crearTexturaTroncos({ base: paleta.pared, veta: paleta.veta, fibra: paleta.fibra }),
  };
  const texPared = generadoresPared[tipoPared]
    ? generadoresPared[tipoPared]()
    : crearTexturaPiedra({
        base: paleta.pared,
        veta: paleta.veta,
        vetaIntensidad: paleta.vetaIntensidad,
        bloques: paleta.bloques,
      });
  texPared.repeat.set(3, 1);

  // Franja greca cerca del techo y franja de símbolos cerca del piso
  const texGreca = crearTexturaGreca(paleta);
  texGreca.repeat.set(4, 1);
  const texSimbolos = crearTexturaSimbolos(paleta);
  texSimbolos.repeat.set(3, 1);

  // ----- Materiales compartidos (¡gran victoria de rendimiento!) -----
  // Antes: ~180 objetos con materiales únicos. Ahora: ~10 compartidos.
  const mSuelo    = tipoPiso === 'tierra'
    ? new THREE.MeshStandardMaterial({ map: texSuelo, roughness: 0.96, metalness: 0.0 })
    : new THREE.MeshStandardMaterial({ map: texSuelo, roughness: 0.7, metalness: 0.05 + paleta.vetaIntensidad * 0.1 });
  const mTecho    = tipoTecho === 'paja'
    ? new THREE.MeshStandardMaterial({ map: texTecho, roughness: 0.97, metalness: 0.0 })
    : new THREE.MeshStandardMaterial({ map: texTecho, roughness: 0.9, metalness: 0.03 });
  const rugosidadPared = { bahareque: 0.95, maderaCana: 0.65, guadua: 0.55, troncos: 0.9 };
  const mPared    = rugosidadPared[tipoPared]
    ? new THREE.MeshStandardMaterial({ map: texPared, roughness: rugosidadPared[tipoPared], metalness: 0.0 })
    : new THREE.MeshStandardMaterial({ map: texPared, roughness: 0.82, metalness: 0.05 + paleta.vetaIntensidad * 0.15 });
  const mPuertaDm = new THREE.MeshStandardMaterial({ color: 0x150A04, roughness: 0.90, metalness: 0.04 });
  const mPuertaGm = new THREE.MeshStandardMaterial({ color: paleta.acento, roughness: 0.25, metalness: 0.75 });
  const mGuiaSuelo = new THREE.MeshStandardMaterial({
    color: paleta.acento, roughness: 0.3, metalness: 0.7,
    emissive: paleta.acento, emissiveIntensity: 0.07
  });
  const mAlfombra = new THREE.MeshStandardMaterial({
    color: paleta.alfombra, roughness: 0.9,
    emissive: paleta.alfombra, emissiveIntensity: 0.05
  });
  const mGreca     = new THREE.MeshBasicMaterial({ map: texGreca });
  const mSimbolos  = new THREE.MeshBasicMaterial({ map: texSimbolos });

  for (let s = 0; s < SALAS.length; s++) {
    const oz = -s * SL;
    plano(RW, SL, mSuelo, 0, 0, oz - SL / 2, -Math.PI / 2, 0);
    plano(RW, SL, mTecho, 0, RH, oz - SL / 2,  Math.PI / 2, 0);
    plano(SL, RH, mPared, -RW / 2, RH / 2, oz - SL / 2, 0,  Math.PI / 2);
    plano(SL, RH, mPared,  RW / 2, RH / 2, oz - SL / 2, 0, -Math.PI / 2);

    // Franja greca cerca del techo y franja de símbolos cerca del piso
    plano(SL, 0.5, mGreca, -RW / 2 + 0.015, RH - 0.35, oz - SL / 2, 0,  Math.PI / 2);
    plano(SL, 0.5, mGreca,  RW / 2 - 0.015, RH - 0.35, oz - SL / 2, 0, -Math.PI / 2);
    plano(SL, 0.65, mSimbolos, -RW / 2 + 0.015, 0.55, oz - SL / 2, 0,  Math.PI / 2);
    plano(SL, 0.65, mSimbolos,  RW / 2 - 0.015, 0.55, oz - SL / 2, 0, -Math.PI / 2);

    // Marco de puerta (entrada desde la sala anterior)
    plano(1.9, RH, mPared, -4.05, RH / 2, oz - SL + 0.4, 0, 0);
    plano(1.9, RH, mPared,  4.05, RH / 2, oz - SL + 0.4, 0, 0);
    plano(RW,  1.4, mPared,   0, RH - 0.7, oz - SL + 0.4, 0, 0);
    caja(1.9, RH, 0.26, mPuertaDm, -4.05, RH / 2, oz - SL + 0.53);
    caja(1.9, RH, 0.26, mPuertaDm,  4.05, RH / 2, oz - SL + 0.53);
    caja(RW,  1.4, 0.26, mPuertaDm,  0, RH - 0.7, oz - SL + 0.53);
    caja(0.09, RH - 1.4, 0.3, mPuertaGm, -3.06, (RH - 1.4) / 2, oz - SL + 0.56);
    caja(0.09, RH - 1.4, 0.3, mPuertaGm,  3.06, (RH - 1.4) / 2, oz - SL + 0.56);
    caja(6.21, 0.09,    0.3, mPuertaGm,  0, RH - 1.4, oz - SL + 0.56);

    // Guías luminosas del suelo (comparten material)
    [-RW / 2 + 0.25, RW / 2 - 0.25].forEach(sx => {
      const g = new THREE.PlaneGeometry(0.07, SL);
      const f = new THREE.Mesh(g, mGuiaSuelo);
      f.rotation.x = -Math.PI / 2; f.position.set(sx, 0.015, oz - SL / 2); scene.add(f);
    });

    labelSala(SALAS[s].nombre, `SALA ${s + 1}`, 0, 3.6, oz - SL + 0.45);

    // Puerta hacia la siguiente sala
    if (s < SALAS.length - 1) {
      caja(1.9, RH, 0.26, mPuertaDm, -4.05, RH / 2, oz + 0.13);
      caja(1.9, RH, 0.26, mPuertaDm,  4.05, RH / 2, oz + 0.13);
      caja(RW,  1.4, 0.26, mPuertaDm,  0, RH - 0.7, oz + 0.13);
      caja(0.09, RH - 1.4, 0.3, mPuertaGm, -3.06, (RH - 1.4) / 2, oz + 0.13);
      caja(0.09, RH - 1.4, 0.3, mPuertaGm,  3.06, (RH - 1.4) / 2, oz + 0.13);
      caja(6.21, 0.09,    0.3, mPuertaGm,  0, RH - 1.4, oz + 0.13);
      caja(1.9, RH, 0.26, mPuertaDm, -4.05, RH / 2, oz - 0.13);
      caja(1.9, RH, 0.26, mPuertaDm,  4.05, RH / 2, oz - 0.13);
      caja(RW,  1.4, 0.26, mPuertaDm,  0, RH - 0.7, oz - 0.13);
      caja(0.09, RH - 1.4, 0.3, mPuertaGm, -3.06, (RH - 1.4) / 2, oz - 0.13);
      caja(0.09, RH - 1.4, 0.3, mPuertaGm,  3.06, (RH - 1.4) / 2, oz - 0.13);
      caja(6.21, 0.09,    0.3, mPuertaGm,  0, RH - 1.4, oz - 0.13);
      const ag = new THREE.PlaneGeometry(5.8, 0.9);
      const al = new THREE.Mesh(ag, mAlfombra);
      al.rotation.x = -Math.PI / 2; al.position.set(0, 0.012, oz - 0.2); scene.add(al);
      labelPuerta(`→ ${SALAS[s + 1].nombre}`, 0, RH - 0.88, oz + 0.16);
    }
  }
  piezas.forEach((p, i) => agregarPieza(p, i));
}

function labelSala(nombre, num, x, y, z) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = hexStr(paleta.acento); ctx.font = 'bold 17px Georgia'; ctx.textAlign = 'center'; ctx.fillText(num, 256, 36);
  ctx.fillStyle = '#5A3E2B'; ctx.font = '22px Georgia'; ctx.fillText(nombre, 256, 70);
  ctx.strokeStyle = hexStr(paleta.acento) + '73'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(70, 84); ctx.lineTo(442, 84); ctx.stroke();
  const m = new THREE.Mesh(new THREE.PlaneGeometry(4, 1), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true }));
  m.position.set(x, y, z); scene.add(m);
}

function labelPuerta(txt, x, y, z) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 52;
  const ctx = c.getContext('2d');
  ctx.fillStyle = hexStr(paleta.acento); ctx.font = 'bold 14px Georgia'; ctx.textAlign = 'center'; ctx.fillText(txt.toUpperCase(), 256, 32);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(4, .42), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true }));
  m.position.set(x, y, z); scene.add(m);
}

function crearPlaceholder(data) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 340;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#E8D8B8'; ctx.fillRect(0, 0, 512, 340);
  ctx.fillStyle = 'rgba(90,62,43,.08)'; ctx.fillRect(16, 16, 480, 308);
  ctx.strokeStyle = hexStr(paleta.acento) + '73'; ctx.lineWidth = 2; ctx.strokeRect(16, 16, 480, 308);
  ctx.fillStyle = hexStr(paleta.acento) + '47'; ctx.font = '56px Georgia'; ctx.textAlign = 'center'; ctx.fillText('◆', 256, 128);
  ctx.fillStyle = hexStr(paleta.alfombra); ctx.font = 'bold 16px Georgia'; ctx.fillText(data.tag.toUpperCase(), 256, 186);
  ctx.fillStyle = '#5A3E2B'; ctx.font = '17px Georgia';
  const words = data.titulo.split(' '); let line = '', lines = [];
  words.forEach(w => { const t = line + w + ' '; if (ctx.measureText(t).width > 430 && line) { lines.push(line.trim()); line = w + ' '; } else line = t; });
  lines.push(line.trim());
  lines.forEach((l, i) => ctx.fillText(l, 256, 218 + i * 24));
  return new THREE.CanvasTexture(c);
}

function agregarPieza(data, idx) {
  const oz = -data.sala * SL;
  let mesh;

  if (data.forma === 'cuadro') {
    const [sw, sh] = data.escala;
    const esIzq     = data.lado === 'L' || data.lado === 'L2';
    const esSegundo = data.lado === 'L2' || data.lado === 'R2';
    const wx = esIzq ? -RW / 2 + 0.04 : RW / 2 - 0.04;
    const wz = esSegundo ? oz - SL / 2 - 4.5 : oz - SL / 2 + 4.5;
    const ry = esIzq ? Math.PI / 2 : -Math.PI / 2;

    // Marco dorado (material compartido)
    const marco = new THREE.Mesh(new THREE.PlaneGeometry(sw + 0.22, sh + 0.22), matMarcoOro);
    marco.position.set(wx, 2.3, wz);
    marco.rotation.y = ry;
    scene.add(marco);

    // Lienzo: se crea PRIMERO con placeholder
    const canvasTex = data.foto && data.foto.trim() !== '' ? crearPlaceholder(data) : crearPlaceholder(data);
    const lienzo = new THREE.Mesh(
      new THREE.PlaneGeometry(sw, sh),
      new THREE.MeshBasicMaterial({ map: canvasTex })
    );
    lienzo.position.set(esIzq ? wx + 0.02 : wx - 0.02, 2.3, wz);
    lienzo.rotation.y = ry;
    scene.add(lienzo);
    mesh = lienzo;

    // Ahora el loader puede usar `lienzo` con seguridad
    if (data.foto && data.foto.trim() !== '') {
      const loader = new THREE.TextureLoader();
      loader.load(
        data.foto,
        (tex) => { lienzo.material.map = tex; lienzo.material.needsUpdate = true; },
        undefined,
        () => { /* fallo silencioso: se queda el placeholder */ }
      );
    }

    if (!esMovil) {
      // Antes: un SpotLight por pieza (24 luces). Ahora: 0 luces extra por pieza
      // porque la iluminación ambiental + un PointLight por sala ya cubren la escena.
    }
  } else {
    const r = data.escala[0];
    const mPed = new THREE.MeshStandardMaterial({ color: 0x3A2010, roughness: 0.95 });
    const zPos = oz - SL / 2 + 4.5;

    if (data.sala === 1) {
      const pts = [];
      [[0, .0], [.12, .03], [.30, .10], [.52, .28], [.66, .52], [.70, .78], [.66, 1.02], [.50, 1.20],
       [.36, 1.30], [.38, 1.42], [.50, 1.56], [.58, 1.72], [.54, 1.88], [.40, 2.00], [.28, 2.08],
       [.22, 2.18], [.24, 2.26], [.28, 2.30], [.20, 2.32], [.00, 2.33]
      ].forEach(([x, y]) => pts.push(new THREE.Vector2(x * r, y * r)));
      mesh = new THREE.Mesh(new THREE.LatheGeometry(pts, 40),
        new THREE.MeshStandardMaterial({ map: texTerracota(), roughness: 0.92, metalness: 0.0 }));
      mesh.position.set(0, 0, zPos);

      const ped = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.42, 0.48, 24), mPed);
      ped.position.set(0, 0.24, zPos); scene.add(ped);
    } else {
      mesh = new THREE.Mesh(new THREE.SphereGeometry(0.001, 4, 4),
        new THREE.MeshBasicMaterial({ visible: false }));
      mesh.position.set(0, 0, zPos);
    }

    scene.add(mesh);
  }

  mesh.userData = { es: 'pieza', data };
  objs.push(mesh);
  etiquetaPieza(data, mesh);
}

function texTerracota() {
  const vc = document.createElement('canvas'); vc.width = 256; vc.height = 256;
  const vx = vc.getContext('2d');
  const g = vx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, '#7A3A1E'); g.addColorStop(0.4, '#A05030');
  g.addColorStop(0.7, '#C07050'); g.addColorStop(1, '#6A2C10');
  vx.fillStyle = g; vx.fillRect(0, 0, 256, 256);
  const sd = (n) => Math.abs(Math.sin(n * 91.7) * 43758.5) % 1;
  for (let i = 0; i < 20; i++) {
    const rg = vx.createRadialGradient(sd(i) * 256, sd(i + 10) * 256, 0, sd(i) * 256, sd(i + 10) * 256, 20 + sd(i + 2) * 40);
    rg.addColorStop(0, sd(i + 5) > 0.5 ? 'rgba(50,20,5,0.3)' : 'rgba(180,110,70,0.25)');
    rg.addColorStop(1, 'rgba(0,0,0,0)');
    vx.fillStyle = rg; vx.beginPath(); vx.arc(sd(i) * 256, sd(i + 10) * 256, 40, 0, Math.PI * 2); vx.fill();
  }
  return new THREE.CanvasTexture(vc);
}

function etiquetaPieza(data, mesh) {
  const c = document.createElement('canvas'); c.width = 280; c.height = 58;
  const ctx = c.getContext('2d');
  ctx.fillStyle = 'rgba(242,230,201,.93)'; ctx.fillRect(0, 0, 280, 58);
  ctx.strokeStyle = 'rgba(90,62,43,.35)'; ctx.lineWidth = 1; ctx.strokeRect(1, 1, 278, 56);
  ctx.fillStyle = hexStr(paleta.alfombra); ctx.font = 'bold 11px Georgia'; ctx.textAlign = 'center'; ctx.fillText(data.tag.toUpperCase(), 140, 19);
  ctx.fillStyle = '#5A3E2B'; ctx.font = '13px Georgia';
  const t = data.titulo.length > 24 ? data.titulo.substring(0, 24) + '…' : data.titulo;
  ctx.fillText(t, 140, 40);
  const lm = new THREE.Mesh(new THREE.PlaneGeometry(1.5, .33),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, side: THREE.DoubleSide }));
  const [sw, sh] = data.escala;
  lm.position.copy(mesh.position);
  lm.position.y += (data.forma === 'cuadro' ? sh / 2 + 0.36 : data.escala[0] + 0.36);
  if (data.forma === 'cuadro') lm.rotation.copy(mesh.rotation);
  scene.add(lm);
}

function ponerLuces() {
  // Ambient fuerte para iluminar bien sin coste extra de luces puntuales
  scene.add(new THREE.AmbientLight(0xF5ECD8, esMovil ? 2.4 : 1.4));
  const d = new THREE.DirectionalLight(0xFFF8E8, esMovil ? 0.7 : 0.9);
  d.position.set(5, 10, 5); scene.add(d);
  if (!esMovil) {
    // Una sola PointLight por sala (antes 2)
    for (let s = 0; s < SALAS.length; s++) {
      const oz = -s * SL - SL / 2;
      const pt = new THREE.PointLight(0xFFF0D0, 0.7, SL * 1.4);
      pt.position.set(0, RH - 0.3, oz);
      scene.add(pt);
    }
  }
}

// Quita el museo 3D de la pantalla (usado por el botón "Cambiar de cultura").
export function cerrarMuseo() {
  if (ren) {
    ren.domElement.remove();
    if (resizeHandler) removeEventListener('resize', resizeHandler);
  }
  ren = null;
}

// ---- API pública consumida por controls.js y ui.js ----

export function getRenderer() { return ren; }
export function getCamera()   { return cam; }
export function getScene()    { return scene; }
export function getClock()    { return clk; }
export function getObjs()     { return objs; }

export function getPos() { return { px, pz, yaw }; }
export function setPos(nx, nz, nyaw) {
  px = nx; pz = nz; yaw = nyaw;
  cam.position.set(px, 1.7, pz);
  cam.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
}

export function getDimensions() { return { SL, RW, RH, SALAS }; }
export function isReducedMotion() { return reducedMotion; }

export function getSalaActual() { return salaActual; }
export function setSalaActual(i) { salaActual = i; }

export function raycastFromClient(clientX, clientY) {
  mouse2.x = (clientX / innerWidth) * 2 - 1;
  mouse2.y = -(clientY / innerHeight) * 2 + 1;
  ray.setFromCamera(mouse2, cam);
  return ray.intersectObjects(objs);
}

export function render() { ren.render(scene, cam); }

let tick = 0;
let frameCount = 0;
export function animarObjetos() {
  if (reducedMotion) return;
  // Saltar frames en móvil para ahorrar CPU (animación a 30 fps en lugar de 60)
  frameCount++;
  if (esMovil && frameCount % 2 !== 0) return;
  tick += 0.012;
  objs.forEach((o, i) => {
    if (o.userData.data?.forma !== 'cuadro') {
      o.rotation.y = tick * 0.5 + i * 1.1;
      o.position.y = 1.05 + Math.sin(tick + i) * 0.055;
    }
  });
}
