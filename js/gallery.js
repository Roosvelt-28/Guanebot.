// ============================================================
//  gallery.js — Galería rotativa de imágenes por pieza
//
//  Recibe el objeto `data` de una pieza y muestra sus imágenes
//  en `#pgallery`. Soporta:
//    - data.foto    → imagen única (modo actual)
//    - data.galeria → array de URLs (modo futuro, sin implementar)
//
//  Rota automáticamente cada GALERIA_INTERVAL ms. Si solo hay
//  una imagen, el carrusel permanece estable pero la estructura
//  queda lista para ampliar.
// ============================================================

const GALERIA_INTERVAL = 4500;
let intervalId = null;
let indiceActual = 0;
let imgsActuales = [];

export function cargarGaleria(data) {
  // Pausar rotación previa antes de cambiar de pieza
  detenerRotacion();

  // Construir el array de imágenes: prioridad a data.galeria, fallback a data.foto
  if (Array.isArray(data.galeria) && data.galeria.length > 0) {
    imgsActuales = data.galeria.slice();
  } else if (data.foto && data.foto.trim() !== '') {
    imgsActuales = [data.foto];
  } else {
    imgsActuales = [];
  }

  const frame = document.getElementById('pg-frame');
  const img   = document.getElementById('pg-img');
  const dots  = document.getElementById('pg-dots');

  if (!frame || !img || !dots) return;

  if (imgsActuales.length === 0) {
    frame.style.display = 'none';
    return;
  }
  frame.style.display = 'block';

  indiceActual = 0;
  mostrarImagen(img, dots, 0);
  construirDots(dots, imgsActuales.length);

  if (imgsActuales.length > 1) {
    intervalId = setInterval(() => {
      indiceActual = (indiceActual + 1) % imgsActuales.length;
      mostrarImagen(img, dots, indiceActual);
    }, GALERIA_INTERVAL);
  }
}

export function detenerRotacion() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function mostrarImagen(imgEl, dotsEl, i) {
  imgEl.classList.remove('loaded');
  imgEl.src = imgsActuales[i];
  imgEl.onload  = () => imgEl.classList.add('loaded');
  imgEl.onerror = () => imgEl.classList.remove('loaded');
  actualizarDots(dotsEl, i);
}

function construirDots(dotsEl, n) {
  dotsEl.innerHTML = '';
  for (let i = 0; i < n; i++) {
    const d = document.createElement('div');
    d.className = 'pg-dot' + (i === 0 ? ' on' : '');
    d.setAttribute('role', 'button');
    d.setAttribute('aria-label', `Imagen ${i + 1} de ${n}`);
    d.addEventListener('click', () => {
      detenerRotacion();
      indiceActual = i;
      mostrarImagen(document.getElementById('pg-img'), dotsEl, i);
      // Reanudar después de 6s
      if (imgsActuales.length > 1) {
        intervalId = setInterval(() => {
          indiceActual = (indiceActual + 1) % imgsActuales.length;
          mostrarImagen(document.getElementById('pg-img'), dotsEl, indiceActual);
        }, GALERIA_INTERVAL);
      }
    });
    dotsEl.appendChild(d);
  }
}

function actualizarDots(dotsEl, i) {
  [...dotsEl.children].forEach((d, k) => d.classList.toggle('on', k === i));
}
