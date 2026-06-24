// ============================================================
//  app.js — Punto de entrada. Orquesta los módulos.
// ============================================================

import { init3D }    from './museum.js';
import { initControles, bucle,
         setClickHandler, setMoveHandler, setSalaHandler, setFrameHandler } from './controls.js';
import {
  iniciarIntro, construirNav, cerrarPanel,
  manejarClick, manejarMover, actualizarSalaUI,
  dibujarMM, initConsent,
} from './ui.js';

// Consentimiento GA (puede cargarse antes del intro)
initConsent();

// Conectar el botón "Entrar al Museo" y el onclick del HTML
document.getElementById('ibtn').addEventListener('click', arrancar);
window.iniciar = arrancar;

function arrancar() {
  iniciarIntro();    // oculta el splash
  init3D();          // construye el museo
  construirNav();    // pinta la nav lateral de salas
  initControles();   // conecta teclado + joysticks + canvas

  // Conectar handlers de UI con los callbacks de controls
  setClickHandler(manejarClick);
  setMoveHandler(manejarMover);
  setSalaHandler(actualizarSalaUI);

  // Botón cerrar panel
  document.getElementById('closebtn').addEventListener('click', cerrarPanel);

  // Escape cierra el panel
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.getElementById('panel').classList.contains('open')) {
      cerrarPanel();
    }
  });

  // Inicializar UI de sala
  actualizarSalaUI(0);

  // Bucle
  setFrameHandler(dibujarMM);
  bucle();
}
