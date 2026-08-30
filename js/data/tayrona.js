// ============================================================
//  tayrona.js — Contenido de la sala Tayrona
//  Mismo esquema que js/data/guane.js.
//  Fotos: piezas y fotografías reales del Museo del Oro Tairona.
//  14 imágenes distintas repartidas en 20 piezas (antes solo 8).
//  Rutas locales (img/tayrona/) para evitar el problema de CORS.
//  Cada pieza incluye su fuente y URL en `det`.
// ============================================================

const FUENTE_TAIRONA   = 'https://enciclopedia.banrepcultural.org/index.php?title=Tairona';
const FUENTE_COLECCION = 'https://colecciones.banrepcultural.org/es/pagina/coleccion-arqueologica-de-los-museos-del-oro/6357a765e27d753f221c6160?v=mosaic&q=tairona';

const credito     = (url) => `<br><span>Fuente:</span> <a href="${url}" target="_blank" rel="noopener">Banco de la República – Museo del Oro</a>`;
const creditoFoto = (url) => `<br><span>Fuente:</span> Foto Clark Manuel Rodríguez – Banco de la República (<a href="${url}" target="_blank" rel="noopener">CC BY-NC-ND 4.0</a>)`;

export const salasTayrona = [
    { nombre: "¿Quiénes eran los Tayrona?",     color: 0x1E5C5C },
    { nombre: "Ciudades de piedra",              color: 0x184A4A },
    { nombre: "Orfebrería sagrada",               color: 0x184A4A },
    { nombre: "Cerámica y vida cotidiana",        color: 0x184A4A },
    { nombre: "Cosmovisión y legado Kogui-Wiwa",  color: 0x184A4A },
];

export const piezasTayrona = [
    // ── SALA 1: ¿Quiénes eran los Tayrona? ────────────────────────────
    {
      sala: 0, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Historia", titulo: "¿Quiénes eran los Tayrona?",
      foto: "img/tayrona/pectoral-palomino.jpeg",
      desc: "Los Tayrona fueron un pueblo indígena que habitó las vertientes norte y occidental de la Sierra Nevada de Santa Marta, en el Caribe colombiano, entre los años 900 y 1600 d.C. Desarrollaron una de las sociedades más complejas de la Colombia prehispánica.",
      det: "<span>Período:</span> 900–1600 d.C.<br><span>Territorio:</span> Sierra Nevada de Santa Marta<br><span>Departamento:</span> Magdalena<br><span>Pieza:</span> Pectoral, oro, 200–900 d.C., Río Palomino, Santa Marta, 13,8 cm" + credito(FUENTE_TAIRONA)
    },
    {
      sala: 0, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Historia", titulo: "El período Nahuange, sus antecesores",
      foto: "img/tayrona/aplicacion-minca.jpeg",
      desc: "Antes de los Tayrona, entre el 200 y el 900 d.C., las costas de la Sierra Nevada estuvieron habitadas por comunidades del período Nahuange: orfebres, agricultores y pescadores que sentaron las bases culturales de la región.",
      det: "<span>Período Nahuange:</span> 200–900 d.C.<br><span>Actividades:</span> orfebrería, agricultura, pesca<br><span>Pieza:</span> Aplicación, oro, 200–900 d.C., Minca, Santa Marta, 12,4 x 13,9 cm" + credito(FUENTE_TAIRONA)
    },
    {
      sala: 0, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Sociedad", titulo: "Una sociedad jerarquizada",
      foto: "img/tayrona/colgante-san-pedro.jpeg",
      desc: "La sociedad tayrona estaba dividida entre caciques, sacerdotes (mamas), orfebres, agricultores y comerciantes. Los caciques y sacerdotes concentraban el poder político y espiritual, y se distinguían por sus ornamentos de oro.",
      det: "<span>Jerarquía:</span> caciques y mamas (sacerdotes) → orfebres y comerciantes → agricultores<br><span>Poder:</span> político y espiritual combinado<br><span>Pieza:</span> Colgante, tumbaga, San Pedro de la Sierra, Ciénaga (Magdalena), 10,6 x 11,3 cm" + credito(FUENTE_TAIRONA)
    },
    {
      sala: 0, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Historia", titulo: "El fin del período Tayrona",
      foto: "img/tayrona/parque-tayrona-1.jpeg",
      desc: "Tras la llegada de los españoles a comienzos del siglo XVI, los Tayrona resistieron por décadas la conquista, hasta que sus ciudades fueron finalmente abandonadas o destruidas a comienzos del siglo XVII.",
      det: "<span>Llegada española:</span> inicios del siglo XVI<br><span>Fin del período:</span> inicios del siglo XVII (más de 75 años de resistencia)<br><span>Imagen:</span> Parque Natural Tayrona, territorio ancestral tairona" + credito(FUENTE_TAIRONA)
    },

    // ── SALA 2: Ciudades de piedra ───────────────────────────────────────
    {
      sala: 1, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Arquitectura", titulo: "Terrazas y caminos empedrados",
      foto: "img/tayrona/parque-tayrona-2.jpeg",
      desc: "En los valles boscosos de la Sierra Nevada, los Tayrona construyeron ciudades sobre cimientos de piedra, con caminos enlozados y sistemas de drenaje. En terrazas escalonadas de cultivo sembraban maíz, yuca y aguacate.",
      det: "<span>Infraestructura:</span> terrazas, caminos de piedra, drenajes<br><span>Cultivos:</span> maíz, yuca, aguacate<br><span>Imagen:</span> Vista del Parque Natural Tayrona" + credito(FUENTE_TAIRONA)
    },
    {
      sala: 1, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Arquitectura", titulo: "La Ciudad Perdida",
      foto: "img/tayrona/parque-tayrona-1.jpeg",
      desc: "Teyuna, conocida hoy como la Ciudad Perdida, fue uno de los principales centros urbanos tayrona, con más de 200 terrazas de piedra conectadas por escalinatas. Se calcula que fue habitada entre los siglos VIII y XVI.",
      det: "<span>Nombre original:</span> Teyuna<br><span>Terrazas:</span> más de 200<br><span>Habitada:</span> siglo VIII al XVI<br><span>Imagen:</span> Vista del Parque Natural Tayrona, cerca de la región de Teyuna" + credito(FUENTE_TAIRONA)
    },
    {
      sala: 1, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Arquitectura", titulo: "Ingeniería hidráulica",
      foto: "img/tayrona/parque-tayrona-2.jpeg",
      desc: "Los Tayrona diseñaron sofisticados sistemas de canales y drenajes para controlar el agua de las quebradas de la sierra, evitando la erosión y garantizando el suministro para sus cultivos y viviendas.",
      det: "<span>Innovación:</span> canales y drenajes<br><span>Función:</span> control del agua y prevención de erosión<br><span>Imagen:</span> Vista del Parque Natural Tayrona, terreno abrupto de la Sierra Nevada" + credito(FUENTE_TAIRONA)
    },
    {
      sala: 1, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Arquitectura", titulo: "Red de ciudades conectadas",
      foto: "img/tayrona/expo-museo-oro-tairona.jpeg",
      desc: "Las ciudades tayrona no estaban aisladas: una extensa red de caminos de piedra conectaba los asentamientos de tierra caliente en la costa con los poblados de tierra fría en las partes altas de la sierra.",
      det: "<span>Red vial:</span> caminos de piedra intersierra<br><span>Conexión:</span> costa – tierras altas<br><span>Imagen:</span> Sala Tairona en la exposición del Museo del Oro" + credito(FUENTE_TAIRONA)
    },

    // ── SALA 3: Orfebrería sagrada ───────────────────────────────────────
    {
      sala: 2, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Orfebrería", titulo: "El hombre murciélago",
      foto: "img/tayrona/pectoral-palomino.jpeg",
      desc: "Una de las piezas más emblemáticas de la orfebrería tayrona representa a un cacique o sacerdote con rasgos de murciélago. Este animal era símbolo de poder, y solo las élites podían portar adornos con su figura.",
      det: "<span>Figura:</span> hombre murciélago<br><span>Simbolismo:</span> poder y estatus élite<br><span>Pieza:</span> Pectoral, oro, Río Palomino, Santa Marta, 13,8 cm, ejemplo de orfebrería ceremonial de élite" + credito(FUENTE_TAIRONA)
    },
    {
      sala: 2, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Orfebrería", titulo: "Placas aladas",
      foto: "img/tayrona/placa-colgante-alada.jpg",
      desc: "Las placas aladas, con forma de aves de alas desplegadas, son un símbolo característico de la orfebrería tayrona y nahuange, asociadas al vuelo nocturno y al viaje espiritual entre mundos.",
      det: "<span>Objeto:</span> placa colgante alada<br><span>Material:</span> lítico, tallado y pulido<br><span>Simbolismo:</span> vuelo, viaje espiritual<br><span>Pieza:</span> Placa colgante alada, Santa Marta, 16,2 x 2,5 x 1,4 cm, reg. L00584" + creditoFoto(FUENTE_COLECCION)
    },
    {
      sala: 2, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Orfebrería", titulo: "Pectorales y narigueras en tumbaga",
      foto: "img/tayrona/nariguera-minca.jpeg",
      desc: "Los orfebres nahuange y tayrona martillaban pectorales y narigueras en tumbaga, una aleación de oro y cobre de superficie pulida y tonos rojizos, decorados con puntos, círculos y serpientes de dos cabezas.",
      det: "<span>Aleación:</span> tumbaga (oro + cobre)<br><span>Motivos:</span> puntos, círculos, serpientes bicéfalas<br><span>Pieza:</span> Nariguera, tumbaga, Minca, Santa Marta (Magdalena), 7,1 x 9 cm" + credito(FUENTE_TAIRONA)
    },
    {
      sala: 2, lado: "R2", forma: "esfera", escala: [0.65],
      tag: "Orfebrería", titulo: "Colgantes zoomorfos rituales",
      foto: "img/tayrona/colgante-zoomorfo.jpg",
      desc: "Los colgantes de oro con forma de animales —jaguares, aves, lagartos— acompañaban al poporo como parte del atuendo ritual del hombre tayrona de mayor rango, fundidos con gran detalle a la cera perdida.",
      det: "<span>Objeto:</span> colgante zoomorfo<br><span>Técnica:</span> fundición a la cera perdida con núcleo<br><span>Pieza:</span> Colgante zoomorfo, oro, Santa Marta, 3,8 x 7,1 cm, reg. O24274" + creditoFoto(FUENTE_COLECCION)
    },

    // ── SALA 4: Cerámica y vida cotidiana ────────────────────────────────
    {
      sala: 3, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Cerámica", titulo: "Vasijas antropomorfas",
      foto: "img/tayrona/figura-antropozoomorfa.jpg",
      desc: "La cerámica tayrona incluía figuras sentadas con rasgos humanos y animales combinados, usadas tanto en la vida diaria como en contextos funerarios y ceremoniales, reflejando su cosmovisión en objetos de uso cotidiano.",
      det: "<span>Tipo:</span> figura antropozoomorfa sentada en banco<br><span>Uso:</span> doméstico, funerario, ceremonial<br><span>Pieza:</span> Figura antropozoomorfa, cerámica, Sierra Nevada de Santa Marta, 34,5 x 32 cm, reg. C00736" + creditoFoto(FUENTE_COLECCION)
    },
    {
      sala: 3, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Vida cotidiana", titulo: "Pesca y agricultura",
      foto: "img/tayrona/metate-ovalado.jpg",
      desc: "La economía tayrona combinaba la pesca en el mar Caribe con una agricultura intensiva de terrazas en la sierra. El maíz se molía en metates de piedra como este, herramienta central de la cocina diaria.",
      det: "<span>Actividades:</span> pesca marina, agricultura de terrazas<br><span>Herramienta:</span> metate para moler maíz<br><span>Pieza:</span> Metate ovalado, piedra, 41 x 30 cm, reg. L00845" + creditoFoto(FUENTE_COLECCION)
    },
    {
      sala: 3, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Textiles", titulo: "Mochilas y tejidos de fique",
      foto: "img/tayrona/expo-museo-oro-tairona.jpeg",
      desc: "Los Tayrona elaboraban mochilas y tejidos con fibra de fique, una tradición textil que continúa hoy entre sus descendientes culturales, los pueblos Kogui, Wiwa, Arhuaco y Kankuamo de la Sierra Nevada.",
      det: "<span>Material:</span> fibra de fique<br><span>Continuidad:</span> Kogui, Wiwa, Arhuaco, Kankuamo<br><span>Imagen:</span> Sala Tairona en la exposición del Museo del Oro" + credito(FUENTE_TAIRONA)
    },
    {
      sala: 3, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Vida cotidiana", titulo: "El intercambio con el Caribe",
      foto: "img/tayrona/collar-cuentas-zoomorfas.jpg",
      desc: "Por su ubicación costera, los Tayrona intercambiaban productos con otros pueblos del Caribe. Collares de pequeñas cuentas de oro esquematizadas, como este, circulaban como bienes de prestigio en esas redes comerciales.",
      det: "<span>Bienes de intercambio:</span> orfebrería, sal, concha<br><span>Alcance:</span> costa Caribe colombiana<br><span>Pieza:</span> Collar de cuentas zoomorfas esquematizadas, oro, Dibulla (La Guajira), reg. O20289" + creditoFoto(FUENTE_COLECCION)
    },

    // ── SALA 5: Cosmovisión y legado Kogui-Wiwa ──────────────────────────
    {
      sala: 4, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Cosmovisión", titulo: "La Sierra Nevada, corazón del mundo",
      foto: "img/tayrona/parque-tayrona-1.jpeg",
      desc: "Para los Tayrona y sus descendientes, la Sierra Nevada de Santa Marta es el 'corazón del mundo', un territorio sagrado organizado en 'Línea Negra' que conecta lugares espirituales entre la costa y las cumbres nevadas.",
      det: "<span>Concepto:</span> corazón del mundo<br><span>Territorio sagrado:</span> Línea Negra<br><span>Imagen:</span> Vista del Parque Natural Tayrona" + credito(FUENTE_TAIRONA)
    },
    {
      sala: 4, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Cosmovisión", titulo: "Los mamas, guardianes espirituales",
      foto: "img/tayrona/aplicacion-serankua.jpg",
      desc: "Los mamas eran los sacerdotes y sabios tayrona, formados desde la infancia para interpretar el mundo espiritual. Piezas como esta representan a Serankua, figura creadora en la cosmovisión kogui heredera de los tayrona.",
      det: "<span>Rol:</span> sacerdote y sabio<br><span>Figura representada:</span> Serankua, ser creador<br><span>Pieza:</span> Aplicación semicircular con figura Serankua, orfebrería, Santa Marta, 12,4 x 13,9 cm, reg. O15451" + creditoFoto(FUENTE_COLECCION)
    },
    {
      sala: 4, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Legado", titulo: "Herederos vivos de los Tayrona",
      foto: "img/tayrona/parque-tayrona-2.jpeg",
      desc: "Los pueblos Kogui, Wiwa, Arhuaco y Kankuamo, que hoy habitan la Sierra Nevada de Santa Marta, son considerados herederos directos de la cultura tayrona y mantienen vivas muchas de sus tradiciones.",
      det: "<span>Pueblos herederos:</span> Kogui, Wiwa, Arhuaco, Kankuamo<br><span>Territorio actual:</span> Sierra Nevada de Santa Marta<br><span>Imagen:</span> Vista del Parque Natural Tayrona, territorio habitado hoy por sus descendientes" + credito(FUENTE_TAIRONA)
    },
    {
      sala: 4, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Legado", titulo: "El Museo del Oro Tayrona",
      foto: "img/tayrona/expo-museo-oro-tairona.jpeg",
      desc: "En Santa Marta, el Museo del Oro Tayrona conserva más de 470 piezas prehispánicas —orfebrería, cerámica, hueso, concha y piedra— que permiten conocer de cerca la riqueza material de esta cultura.",
      det: "<span>Sede:</span> Casa de la Aduana, Santa Marta<br><span>Colección:</span> más de 470 piezas prehispánicas<br><span>Imagen:</span> Sala de exposición del Museo del Oro Tairona" + credito(FUENTE_TAIRONA)
    },
];
