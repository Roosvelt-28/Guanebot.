// ============================================================
//  controls.js — Entrada de usuario (teclado + joysticks) y bucle
// ============================================================

import {
  getClock, getPos, setPos, getDimensions,
  getSalaActual, setSalaActual,
  animarObjetos, render,
} from './museum.js';

const joyState = { lx: 0, ly: 0, rx: 0, ry: 0 };
const keys = {};

let onClickPieza = null;   // callback inyectado por ui.js
let onMovePieza  = null;
let onSalaChange = null;
let onFrame      = null;   // callback por frame (para minimapa)

export function setClickHandler(fn) { onClickPieza = fn; }
export function setMoveHandler(fn)  { onMovePieza  = fn; }
export function setSalaHandler(fn)  { onSalaChange = fn; }
export function setFrameHandler(fn) { onFrame      = fn; }

export function initControles() {
  document.addEventListener('keydown', e => {
    keys[e.code] = true;
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
  });
  document.addEventListener('keyup', e => keys[e.code] = false);

  crearJoystick('joyL-base', 'joyL-knob', 'lx', 'ly');
  crearJoystick('joyR-base', 'joyR-knob', 'rx', 'ry');

  // Click en piezas (canvas)
  const dom = document.querySelector('canvas');
  dom.addEventListener('click', e => onClickPieza && onClickPieza(e));
  dom.addEventListener('touchend', e => {
    e.preventDefault();
    const t = e.changedTouches[0];
    onClickPieza && onClickPieza({ clientX: t.clientX, clientY: t.clientY });
  }, { passive: false });

  // Mousemove con throttle rAF
  let pending = false;
  dom.addEventListener('mousemove', e => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      onMovePieza && onMovePieza(e);
    });
  });
}

function crearJoystick(baseId, knobId, stateX, stateY) {
  const base = document.getElementById(baseId);
  const knob = document.getElementById(knobId);
  const R = 33;
  let active = false, tid = null;

  function getCenter() {
    const r = base.getBoundingClientRect();
    return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
  }
  function move(cx, cy, tx, ty) {
    let dx = tx - cx, dy = ty - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > R) { dx = dx / dist * R; dy = dy / dist * R; }
    knob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
    joyState[stateX] = dx / R;
    joyState[stateY] = dy / R;
  }
  function reset() {
    knob.style.transform = 'translate(-50%,-50%)';
    joyState[stateX] = 0; joyState[stateY] = 0;
    active = false; tid = null;
  }

  base.addEventListener('touchstart', e => {
    e.preventDefault();
    const t = e.changedTouches[0];
    tid = t.identifier; active = true;
    const { cx, cy } = getCenter();
    move(cx, cy, t.clientX, t.clientY);
  }, { passive: false });

  base.addEventListener('touchmove', e => {
    e.preventDefault();
    for (const t of e.changedTouches) {
      if (t.identifier === tid) {
        const { cx, cy } = getCenter();
        move(cx, cy, t.clientX, t.clientY);
      }
    }
  }, { passive: false });

  base.addEventListener('touchend', e => {
    for (const t of e.changedTouches) { if (t.identifier === tid) reset(); }
  });
  base.addEventListener('touchcancel', reset);

  base.addEventListener('mousedown', e => {
    active = true;
    const { cx, cy } = getCenter();
    move(cx, cy, e.clientX, e.clientY);
    const mm = ev => { if (active) { const { cx, cy } = getCenter(); move(cx, cy, ev.clientX, ev.clientY); } };
    const mu = () => { reset(); document.removeEventListener('mousemove', mm); document.removeEventListener('mouseup', mu); };
    document.addEventListener('mousemove', mm);
    document.addEventListener('mouseup', mu);
  });
}

// ---- Bucle principal ----

const MOBILE = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
let frame = 0;
export function bucle() {
  requestAnimationFrame(bucle);
  frame++;
  const dt = Math.min(getClock().getDelta(), 0.05);
  mover(dt);
  // En móvil: render y animación a 30 fps (mitad de CPU/GPU) sin perder input
  if (MOBILE && frame % 2 !== 0) return;
  animarObjetos();
  render();
  if (onFrame) onFrame();
}

function mover(dt) {
  const { SL, RW, SALAS } = getDimensions();
  const { px, pz, yaw } = getPos();
  const VEL = 4.5, GIRO = 1.9;

  let nYaw = yaw;
  if (keys['ArrowLeft']  || keys['KeyA']) nYaw += GIRO * dt;
  if (keys['ArrowRight'] || keys['KeyD']) nYaw -= GIRO * dt;
  nYaw -= joyState.rx * GIRO * dt;

  const sinY = Math.sin(nYaw), cosY = Math.cos(nYaw);
  let nPx = px, nPz = pz;
  if (keys['ArrowUp']   || keys['KeyW']) { nPx += sinY * VEL * dt; nPz -= cosY * VEL * dt; }
  if (keys['ArrowDown'] || keys['KeyS']) { nPx -= sinY * VEL * dt; nPz += cosY * VEL * dt; }
  nPx += (sinY * (-joyState.ly) + cosY * joyState.lx) * VEL * dt;
  nPz -= (cosY * (-joyState.ly) - sinY * joyState.lx) * VEL * dt;

  nPx = Math.max(-RW / 2 + 0.55, Math.min(RW / 2 - 0.55, nPx));
  nPz = Math.max(-(SALAS.length * SL) + 1.5, Math.min(2.4, nPz));

  for (let s = 0; s < SALAS.length - 1; s++) {
    const dz = -s * SL;
    if (nPz > dz - 5 && nPz < dz + 1) {
      nPx += (0 - nPx) * 0.1;
      if (Math.abs(nPx) > 2.9 && nPz > dz - 0.4 && nPz < dz + 0.4) {
        nPz = nPz < dz ? dz - 0.41 : dz + 0.41;
      }
    }
  }

  setPos(nPx, nPz, nYaw);

  const ns = Math.min(SALAS.length - 1, Math.max(0, Math.floor(-nPz / SL)));
  if (ns !== getSalaActual()) {
    setSalaActual(ns);
    if (onSalaChange) onSalaChange(ns);
  }
}
