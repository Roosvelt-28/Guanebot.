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

// paleta: identidad visual del museo 3D para cada cultura.
//   pared          — color base de piedra de los muros
//   techo          — color base de piedra del techo
//   fondo          — color de fondo/niebla de la escena (ambiente general)
//   acento         — color de marcos, puertas, guías de suelo y textos
//                    destacados (letreros de sala, placas de las piezas)
//   alfombra       — color de la alfombra que marca el paso entre salas
//   veta           — color de las vetas/motas minerales o de oro en la piedra
//   vetaIntensidad — 0..1, qué tan marcadas se ven las vetas/motas
//   bloques        — true: piedra tallada en sillares con juntas visibles.
//                    false: piedra lisa y pulida (vetas fluidas, más lujosa)
export const CULTURAS = [
  {
    id: 'guane',
    nombre: 'Cultura Guane',
    subtitulo: 'Cañón del Chicamocha, Santander',
    colorTema: 0x7A4A28,
    portada: 'img/JxI7cze.jpeg',
    salas: salasGuane,
    piezas: piezasGuane,
    // Tierra y barro del cañón del Chicamocha: adobe con vetas de arcilla.
    paleta: {
      pared: 0x8B5230,
      techo: 0x2A1A0A,
      fondo: 0x1E1008,
      acento: 0xD4A017,
      alfombra: 0xC56A3D,
      veta: 0xC9793F,
      vetaIntensidad: 0.25,
      bloques: true,
    },
  },
  {
    id: 'muisca',
    nombre: 'Cultura Muisca',
    subtitulo: 'Altiplano cundiboyacense y sur de Santander',
    colorTema: 0x2E5C4A,
    portada: 'img/muisca/portada.jpeg', // PENDIENTE: subir imagen de portada
    salas: salasMuisca,
    piezas: piezasMuisca,
    // Piedra pulida del templo con vetas de oro fluido: la leyenda de El Dorado.
    paleta: {
      pared: 0x2E5C4A,
      techo: 0x142A20,
      fondo: 0x0D1A14,
      acento: 0xD4AF37,
      alfombra: 0x4A7A5E,
      veta: 0xE8C34A,
      vetaIntensidad: 0.65,
      bloques: false,
    },
  },
  {
    id: 'tayrona',
    nombre: 'Cultura Tayrona',
    subtitulo: 'Sierra Nevada de Santa Marta',
    colorTema: 0x1E5C5C,
    portada: 'img/tayrona/portada.jpeg', // PENDIENTE: subir imagen de portada
    salas: salasTayrona,
    piezas: piezasTayrona,
    // Terrazas de piedra tallada de Ciudad Perdida, con vetas de cuarzo/turquesa.
    paleta: {
      pared: 0x1E5C5C,
      techo: 0x0E2C2C,
      fondo: 0x081818,
      acento: 0xCDA434,
      alfombra: 0x2E8B84,
      veta: 0x8FD9CE,
      vetaIntensidad: 0.3,
      bloques: true,
    },
  },
  {
    id: 'quimbaya',
    nombre: 'Cultura Quimbaya',
    subtitulo: 'Valle medio del río Cauca, Eje Cafetero',
    colorTema: 0xB8860B,
    portada: 'img/quimbaya/portada.jpeg', // PENDIENTE: subir imagen de portada
    salas: salasQuimbaya,
    piezas: piezasQuimbaya,
    // Piedra tallada con motas de oro: los orfebres más célebres del Museo del Oro.
    paleta: {
      pared: 0xB8860B,
      techo: 0x3D2B08,
      fondo: 0x1A1204,
      acento: 0xFFD700,
      alfombra: 0x8B6914,
      veta: 0xFFD700,
      vetaIntensidad: 0.45,
      bloques: true,
    },
  },
  {
    id: 'calima',
    nombre: 'Cultura Calima',
    subtitulo: 'Cuenca del río Calima, Valle del Cauca',
    colorTema: 0xC9A227,
    portada: 'img/calima/portada.jpeg', // PENDIENTE: subir imagen de portada
    salas: salasCalima,
    piezas: piezasCalima,
    // Piedra de río con motas de oro cálido y verdes de selva del valle del Cauca.
    paleta: {
      pared: 0x6B5B1E,
      techo: 0x2E2610,
      fondo: 0x161006,
      acento: 0xE8B923,
      alfombra: 0x9C8430,
      veta: 0xE8B923,
      vetaIntensidad: 0.35,
      bloques: true,
    },
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
