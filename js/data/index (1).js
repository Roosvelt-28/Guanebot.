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
//   pared          — color base del material de los muros
//   piso           — color base del material del piso (si se omite, se
//                    deriva oscureciendo `pared`)
//   techo          — color base del material del techo
//   fondo          — color de fondo/niebla de la escena (ambiente general)
//   acento         — color de marcos, puertas, guías de suelo y textos
//                    destacados (letreros de sala, placas de las piezas)
//   alfombra       — color de la alfombra que marca el paso entre salas
//   veta           — color de las vetas/motas minerales, de arcilla o de
//                    revoque, según el material de pared/piso
//   fibra          — color de las fibras vegetales visibles (paja, bagazo,
//                    amarres de tejido) en bahareque/troncos/paja
//   vetaIntensidad — 0..1, qué tan marcadas se ven las vetas/motas
//   bloques        — true: piedra tallada en sillares con juntas visibles.
//                    false: piedra lisa y pulida (vetas fluidas, más lujosa)
//                    (solo aplica cuando tipoPared/tipoPiso usan piedra)
//   tipoPiso       — 'piedra' (por defecto) | 'tierra' (tierra apisonada)
//   tipoPared      — 'piedra' (por defecto) | 'bahareque' | 'maderaCana'
//                    | 'guadua' | 'troncos'
//   tipoTecho      — 'piedra' (por defecto) | 'paja' (techo vegetal)
//   techoGrueso    — true: capas de paja más anchas/pesadas (techo 'paja')
export const CULTURAS = [
  {
    id: 'guane',
    nombre: 'Cultura Guane',
    subtitulo: 'Cañón del Chicamocha, Santander',
    colorTema: 0x7A4A28,
    portada: 'img/JxI7cze.jpeg',
    salas: salasGuane,
    piezas: piezasGuane,
    // Tierra y barro del cañón del Chicamocha: piso de tierra apisonada
    // (guachana/aterrazamiento) y paredes de bahareque — barro con paja
    // sobre armazón de cañabrava, tonos ocres y rojizos de la arcilla local.
    paleta: {
      pared: 0x8B5230,
      piso: 0x6B4423,       // tierra apisonada: más oscura y mate que la pared
      techo: 0x2A1A0A,
      fondo: 0x1E1008,
      acento: 0xD4A017,
      alfombra: 0xC56A3D,
      veta: 0xC9793F,        // vetas de arcilla/óxido
      fibra: 0xD9B87C,       // paja/bagazo visible en el repello de barro
      vetaIntensidad: 0.25,
      bloques: true,         // usado como fallback si tipoPared no aplica
      tipoPiso: 'tierra',     // piso de tierra apisonada en vez de piedra
      tipoPared: 'bahareque', // paredes de bahareque en vez de sillares
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
    // Altiplano cundiboyacense: piso de tierra apisonada sobre plataformas
    // circulares, paredes de bahareque (cañabrava con barros rojizos y
    // amarillentos) y techo cónico de paja/cortadera muy tupido.
    paleta: {
      pared: 0xA8823A,
      piso: 0x7A5A28,
      techo: 0x4A3418,
      fondo: 0x140D06,
      acento: 0xD4AF37,
      alfombra: 0x8C6B35,
      veta: 0xC77D3D,        // barros rojizos entreverados en el bahareque
      fibra: 0xE0C989,       // paja clara visible en el repello
      vetaIntensidad: 0.3,
      bloques: false,
      tipoPiso: 'tierra',
      tipoPared: 'bahareque',
      tipoTecho: 'paja',
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
    // Terrazas de piedra tallada y lajas de Ciudad Perdida como base fría y
    // dura; paredes de madera maciza y caña entrelazada sin pañete de barro;
    // techo de altas cúpulas cónicas de paja y palma tejida.
    paleta: {
      pared: 0x6B4A2E,
      piso: 0x6E6C64,
      techo: 0x4B4A28,
      fondo: 0x0B0F0D,
      acento: 0xCDA434,
      alfombra: 0x5C7A52,
      veta: 0x8B6032,        // veta/grano de la madera
      vetaIntensidad: 0.3,
      bloques: true,
      tipoPared: 'maderaCana',
      tipoTecho: 'paja',
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
    // Tierra compactada sobre terrazas de ladera; paredes de guadua nativa
    // y caña con un revoque de barro muy ligero; techo de hojas de palma de
    // cera o paja a dos-cuatro aguas — los orfebres del Museo del Oro.
    paleta: {
      pared: 0xA07A3E,
      piso: 0x6B4A22,
      techo: 0x4A3C18,
      fondo: 0x1A1204,
      acento: 0xFFD700,
      alfombra: 0x8B6914,
      veta: 0xC98A3E,        // revoque de arcilla ligera sobre la guadua
      vetaIntensidad: 0.4,
      bloques: true,
      tipoPiso: 'tierra',
      tipoPared: 'guadua',
      tipoTecho: 'paja',
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
    // Tierra apisonada sobre plataformas excavadas en la colina; paredes
    // circulares de troncos envueltos en tejido vegetal / bahareque
    // rústico; techo de paja gruesa a dos aguas o cónica para las lluvias
    // intensas de selva — pardo oscuro y húmedo del piso térmico.
    paleta: {
      pared: 0x5C4426,
      piso: 0x4A331A,
      techo: 0x362B12,
      fondo: 0x0E0B04,
      acento: 0xE8B923,
      alfombra: 0x9C8430,
      veta: 0x7A6030,        // parches rústicos de barro entre troncos
      fibra: 0xC9B37A,       // amarres de fibra vegetal tejida
      vetaIntensidad: 0.35,
      bloques: true,
      tipoPiso: 'tierra',
      tipoPared: 'troncos',
      tipoTecho: 'paja',
      techoGrueso: true,      // capas vegetales más gruesas por la lluvia
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
