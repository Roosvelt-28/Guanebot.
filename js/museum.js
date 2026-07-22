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

function construirMuseo(piezas) {
  // Piso: piedra más oscura que las paredes, mismas vetas pero un poco más discretas
  const texSuelo = crearTexturaPiedra({
    base: oscurecer(paleta.pared, 0.5),
    veta: paleta.veta,
    vetaIntensidad: paleta.vetaIntensidad * 0.8,
    bloques: true,
  });
  texSuelo.repeat.set(2, SALAS.length * 1.3);

  // Techo: piedra en el tono más oscuro, vetas apenas insinuadas
  const texTecho = crearTexturaPiedra({
    base: paleta.techo,
    veta: paleta.veta,
    vetaIntensidad: paleta.vetaIntensidad * 0.4,
    bloques: paleta.bloques,
    tam: 384,
  });
  texTecho.repeat.set(2, SALAS.length * 1.3);

  // Paredes: la textura protagonista — pulida y con vetas de oro fluido en
  // los Muiscas (El Dorado), talladas en sillares de piedra con motas
  // minerales/doradas propias de cada cultura en las demás.
  const texPared = crearTexturaPiedra({
    base: paleta.pared,
    veta: paleta.veta,
    vetaIntensidad: paleta.vetaIntensidad,
    bloques: paleta.bloques,
  });
  texPared.repeat.set(3, 1);

  // ----- Materiales compartidos (¡gran victoria de rendimiento!) -----
  // Antes: ~180 objetos con materiales únicos. Ahora: ~10 compartidos.
  const mSuelo    = new THREE.MeshStandardMaterial({ map: texSuelo, roughness: 0.7, metalness: 0.05 + paleta.vetaIntensidad * 0.1 });
  const mTecho    = new THREE.MeshStandardMaterial({ map: texTecho, roughness: 0.9, metalness: 0.03 });
  const mPared    = new THREE.MeshStandardMaterial({ map: texPared, roughness: 0.82, metalness: 0.05 + paleta.vetaIntensidad * 0.15 });
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

  for (let s = 0; s < SALAS.length; s++) {
    const oz = -s * SL;
    plano(RW, SL, mSuelo, 0, 0, oz - SL / 2, -Math.PI / 2, 0);
    plano(RW, SL, mTecho, 0, RH, oz - SL / 2,  Math.PI / 2, 0);
    plano(SL, RH, mPared, -RW / 2, RH / 2, oz - SL / 2, 0,  Math.PI / 2);
    plano(SL, RH, mPared,  RW / 2, RH / 2, oz - SL / 2, 0, -Math.PI / 2);

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
