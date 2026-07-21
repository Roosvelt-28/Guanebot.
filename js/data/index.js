// ============================================================
//  data/index.js — Registro de culturas del museo.
//
//  Este archivo reemplaza al antiguo js/data.js. En vez de
//  exportar un solo SALAS/PIEZAS fijo, expone la lista de
//  culturas disponibles y cuál está activa en cada momento.
//
//  museum.js y ui.js importan SALAS/PIEZAS de aquí (no de un
//  archivo por cultura), y llaman a setCultura(id) para cambiar
//  cuál está activa. Como SALAS/PIEZAS se declaran con `let` y
//  se exportan, cuando este archivo las reasigna, todos los
//  módulos que las importan ven el valor nuevo automáticamente
//  (esto se llama "live binding" en módulos ES).
// ============================================================

import { salasGuane, piezasGuane } from './guane.js';
import { salasMuisca, piezasMuisca } from './muisca.js';
import { salasTayrona, piezasTayrona } from './tayrona.js';
import { salasQuimbaya, piezasQuimbaya } from './quimbaya.js';
import { salasCalima, piezasCalima } from './calima.js';

export const CULTURAS = [
  {
    id: 'guane',
    nombre: 'Cultura Guane',
    subtitulo: 'Cañón del Chicamocha, Santander',
    colorTema: 0x7A4A28,
    portada: 'img/JxI7cze.jpeg',
    salas: salasGuane,
    piezas: piezasGuane,
  },
  {
    id: 'muisca',
    nombre: 'Cultura Muisca',
    subtitulo: 'Altiplano cundiboyacense y sur de Santander',
    colorTema: 0x2E5C4A,
    portada: 'img/muisca/portada.jpeg', // PENDIENTE: subir imagen de portada
    salas: salasMuisca,
    piezas: piezasMuisca,
  },
  {
    id: 'tayrona',
    nombre: 'Cultura Tayrona',
    subtitulo: 'Sierra Nevada de Santa Marta',
    colorTema: 0x1E5C5C,
    portada: 'img/tayrona/portada.jpeg', // PENDIENTE: subir imagen de portada
    salas: salasTayrona,
    piezas: piezasTayrona,
  },
  {
    id: 'quimbaya',
    nombre: 'Cultura Quimbaya',
    subtitulo: 'Valle medio del río Cauca, Eje Cafetero',
    colorTema: 0xB8860B,
    portada: 'img/quimbaya/portada.jpeg', // PENDIENTE: subir imagen de portada
    salas: salasQuimbaya,
    piezas: piezasQuimbaya,
  },
  {
    id: 'calima',
    nombre: 'Cultura Calima',
    subtitulo: 'Cuenca del río Calima, Valle del Cauca',
    colorTema: 0xC9A227,
    portada: 'img/calima/portada.jpeg', // PENDIENTE: subir imagen de portada
    salas: salasCalima,
    piezas: piezasCalima,
  },
];

// Cultura activa por defecto: la primera de la lista (Guane)
export let SALAS  = CULTURAS[0].salas;
export let PIEZAS = CULTURAS[0].piezas;
let culturaActualId = CULTURAS[0].id;

export function setCultura(id) {
  const c = CULTURAS.find(c => c.id === id);
  if (!c) {
    console.warn(`Cultura "${id}" no encontrada, usando la primera disponible.`);
    SALAS = CULTURAS[0].salas;
    PIEZAS = CULTURAS[0].piezas;
    culturaActualId = CULTURAS[0].id;
    return CULTURAS[0];
  }
  SALAS = c.salas;
  PIEZAS = c.piezas;
  culturaActualId = c.id;
  return c;
}

export function getCulturaActual() {
  return CULTURAS.find(c => c.id === culturaActualId);
}
