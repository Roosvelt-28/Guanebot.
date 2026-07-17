// ============================================================
//  app.js — Punto de entrada. Orquesta los módulos.
//
//  Flujo: selector de culturas → splash (#intro) → museo 3D.
// ============================================================

import { initMuseo, cerrarMuseo } from './museum.js';
import { initControles, bucle,
         setClickHandler, setMoveHandler, setSalaHandler, setFrameHandler } from './controls.js';
import {
  construirSelectorCultura, mostrarSelectorCultura, ocultarSelectorCultura,
  prepararIntroPara, iniciarIntro, construirNav, cerrarPanel,
  manejarClick, manejarMover, actualizarSalaUI,
  dibujarMM, initConsent, volverASelector,
} from './ui.js';

// Consentimiento GA (puede cargarse antes del selector)
initConsent();

// 1. Pintar las tarjetas de cultura y esperar a que el usuario elija una
construirSelectorCultura((culturaId) => {
  ocultarSelectorCultura();
  prepararIntroPara(culturaId);
  // El botón "Entrar al Museo" (#ibtn) ya está en el HTML del splash;
  // solo lo conectamos ahora, pasándole la cultura elegida.
  const btn = document.getElementById('ibtn');
  btn.onclick = () => arrancar(culturaId);
});
mostrarSelectorCultura();

function arrancar(culturaId) {
  iniciarIntro();          // oculta el splash
  initMuseo(culturaId);    // construye el museo 3D de esa cultura
  construirNav();          // pinta la nav lateral de salas
  initControles();         // conecta teclado + joysticks + canvas

  // Mostrar de nuevo los elementos de UI del museo (por si se venía
  // de "Cambiar de cultura", donde se habían ocultado)
  document.getElementById('topbar').setAttribute('aria-hidden', 'false');
  document.getElementById('salabox').style.display = '';
  document.getElementById('mm').style.display = '';
  document.getElementById('salanav').style.display = '';
  document.getElementById('clabel').style.display = '';

  // Conectar handlers de UI con los callbacks de controls
  setClickHandler(manejarClick);
  setMoveHandler(manejarMover);
  setSalaHandler(actualizarSalaUI);

  // Botón cerrar panel
  document.getElementById('closebtn').addEventListener('click', cerrarPanel);

  // Botón "← Cambiar de cultura"
  const btnCambiar = document.getElementById('btn-cambiar-cultura');
  if (btnCambiar) {
    btnCambiar.onclick = () => {
      volverASelector(cerrarMuseo);
      construirSelectorCultura((nuevaCulturaId) => {
        ocultarSelectorCultura();
        prepararIntroPara(nuevaCulturaId);
        document.getElementById('ibtn').onclick = () => arrancar(nuevaCulturaId);
      });
    };
  }

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
