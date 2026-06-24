// ============================================================
//  ui.js — Interfaz: intro, panel de pieza, nav lateral,
//          tooltip, minimapa, consentimiento GA
// ============================================================

import { SALAS } from './data.js';
import { cargarGaleria, detenerRotacion } from './gallery.js';
import {
  getPos, setPos, getDimensions, getSalaActual, setSalaActual,
  raycastFromClient, getRenderer,
} from './museum.js';

let panelAbierto = false;

export function getPanelAbierto() { return panelAbierto; }

// ---------- Intro / splash ----------

export function iniciarIntro() {
  const intro = document.getElementById('intro');
  intro.style.transition = 'opacity .7s';
  intro.style.opacity = '0';
  setTimeout(() => intro.style.display = 'none', 700);
}

// ---------- Nav lateral de salas ----------

export function construirNav() {
  const nav = document.getElementById('salanav');
  nav.innerHTML = '';
  SALAS.forEach((s, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' on' : '');
    d.setAttribute('role', 'button');
    d.setAttribute('tabindex', '0');
    d.setAttribute('aria-label', `Ir a ${s.nombre}`);
    d.innerHTML = `<div class="dl">${s.nombre}</div>`;
    d.addEventListener('click', () => irASala(i));
    d.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); irASala(i); } });
    nav.appendChild(d);
  });
}

function irASala(i) {
  const { SL } = getDimensions();
  setPos(0, -i * SL + 1.5, 0);
  setSalaActual(i);
  if (onSalaUIUpdate) onSalaUIUpdate(i);
  actualizarNavDots(i);
}

function actualizarNavDots(salaIdx) {
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('on', i === salaIdx));
}

// ---------- Panel lateral ----------

let lastFocus = null;   // para devolver el foco al cerrar

export function abrirPanel(d, origenEl) {
  lastFocus = origenEl || document.activeElement;
  document.getElementById('ptag').textContent   = d.tag;
  document.getElementById('ptitle').textContent = d.titulo;
  document.getElementById('pdesc').textContent  = d.desc;
  document.getElementById('pdet').innerHTML     = d.det;

  cargarGaleria(d);

  const panel = document.getElementById('panel');
  panel.classList.add('open');
  panel.setAttribute('aria-hidden', 'false');
  panelAbierto = true;

  // Mover foco al botón de cerrar
  setTimeout(() => document.getElementById('closebtn').focus(), 50);
}

export function cerrarPanel() {
  const panel = document.getElementById('panel');
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden', 'true');
  panelAbierto = false;
  detenerRotacion();
  if (lastFocus && typeof lastFocus.focus === 'function') {
    lastFocus.focus();
  }
}

export function manejarClick(e) {
  if (panelAbierto) return;
  const hits = raycastFromClient(e.clientX, e.clientY);
  if (hits.length && hits[0].object.userData.es === 'pieza') {
    abrirPanel(hits[0].object.userData.data, getRenderer().domElement);
  }
}

export function manejarMover(e) {
  const hits = raycastFromClient(e.clientX, e.clientY);
  const tip = document.getElementById('tip');
  const dom = getRenderer().domElement;
  if (hits.length && hits[0].object.userData.es === 'pieza') {
    tip.textContent = '🖱 ' + hits[0].object.userData.data.titulo;
    tip.style.left = e.clientX + 'px';
    tip.style.top  = (e.clientY - 40) + 'px';
    tip.style.opacity = '1';
    dom.style.cursor = 'pointer';
  } else {
    tip.style.opacity = '0';
    dom.style.cursor = 'default';
  }
}

// ---------- #salabox (Sala N de M) ----------

export function actualizarSalaUI(salaIdx) {
  document.getElementById('snum').textContent  = `Sala ${salaIdx + 1} de ${SALAS.length}`;
  document.getElementById('sname').textContent = SALAS[salaIdx].nombre;
  actualizarNavDots(salaIdx);
}

// ---------- Minimapa ----------

export function dibujarMM() {
  const c = document.getElementById('mc');
  if (!c) return;
  const ctx = c.getContext('2d');
  const W = 108, H = 108;
  const { SALAS: salas, SL } = getDimensions();
  const total = salas.length * SL;
  ctx.fillStyle = '#C4A882'; ctx.fillRect(0, 0, W, H);
  salas.forEach((_, i) => {
    const rh = (H - 10) / salas.length;
    const actual = getSalaActual();
    ctx.fillStyle = i === actual ? 'rgba(212,160,23,.45)' : 'rgba(90,62,43,.12)';
    ctx.fillRect(5, 5 + i * rh, W - 10, rh - 1);
    ctx.fillStyle = 'rgba(90,62,43,.6)'; ctx.font = '7px Arial';
    ctx.fillText(i + 1, 8, 5 + i * rh + 10);
  });
  const { px, pz, yaw } = getPos();
  const { RW } = getDimensions();
  const mx = 5 + (px + RW / 2) / RW * (W - 10);
  const mz = 5 + (-pz) / total * (H - 10);
  ctx.fillStyle = '#5A3E2B'; ctx.beginPath(); ctx.arc(mx, mz, 3, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#D4A017'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(mx, mz);
  ctx.lineTo(mx + Math.sin(yaw) * 8, mz - Math.cos(yaw) * 8); ctx.stroke();
}

// ---------- Banner de consentimiento Google Analytics ----------

const GA_ID = 'G-PZD9RXQZZ4';
const CONSENT_KEY = 'ga_consent';

export function initConsent() {
  // Solo mostrar si el usuario aún no ha decidido
  if (localStorage.getItem(CONSENT_KEY) !== null) {
    if (localStorage.getItem(CONSENT_KEY) === '1') cargarGA();
    return;
  }
  const banner = document.getElementById('consent');
  banner.classList.add('show');

  document.getElementById('consent-accept').addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, '1');
    banner.classList.remove('show');
    cargarGA();
  });
  document.getElementById('consent-deny').addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, '0');
    banner.classList.remove('show');
  });
}

function cargarGA() {
  if (document.getElementById('ga-loader')) return;
  const s = document.createElement('script');
  s.id = 'ga-loader';
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });
}
