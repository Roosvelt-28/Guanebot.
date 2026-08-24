// ============================================================
//  calima.js — Contenido de la sala Calima
//  Mismo esquema que js/data/guane.js.
//  Fotos: piezas reales del Museo del Oro Calima. 11 imágenes
//  distintas repartidas en 20 piezas (antes solo 5).
//  Rutas locales (img/calima/) para evitar el problema de CORS.
//  Cada pieza incluye su fuente y URL en `det`.
// ============================================================

const FUENTE_CALIMA     = 'https://enciclopedia.banrepcultural.org/index.php?title=Calima';
const FUENTE_COLECCION  = 'https://colecciones.banrepcultural.org/es/pagina/coleccion-arqueologica-de-los-museos-del-oro/6357a765e27d753f221c6160?v=mosaic&q=calima';
const FUENTE_COLGANTE   = 'https://colecciones.banrepcultural.org/es/documento/colgante/63a069085d96b8790f2c365d?pageId=6357a765e27d753f221c6160';

const credito = (url) => `<br><span>Fuente:</span> <a href="${url}" target="_blank" rel="noopener">Banco de la República – Museo del Oro</a>`;
const creditoFoto = (url) => `<br><span>Fuente:</span> Foto Clark Manuel Rodríguez – Banco de la República (<a href="${url}" target="_blank" rel="noopener">CC BY-NC-ND 4.0</a>)`;

export const salasCalima = [
    { nombre: "¿Quiénes eran los Calima?",     color: 0xC9A227 },
    { nombre: "Períodos Calima",                color: 0xA6851F },
    { nombre: "Orfebrería monumental",          color: 0xA6851F },
    { nombre: "Cerámica Calima",                color: 0xA6851F },
    { nombre: "Territorio y vida cotidiana",    color: 0xA6851F },
];

export const piezasCalima = [
    // ── SALA 1: ¿Quiénes eran los Calima? ────────────────────────────────
    {
      sala: 0, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Historia", titulo: "¿Quiénes eran los Calima?",
      foto: "img/calima/mascara-oro-palmira.jpeg",
      desc: "Calima es el nombre que reciben las culturas prehispánicas que habitaron la cuenca del río Calima, en el suroccidente colombiano, hoy departamento del Valle del Cauca, desde hace más de 5.000 años hasta la llegada de los españoles.",
      det: "<span>Territorio:</span> cuenca del río Calima<br><span>Departamento actual:</span> Valle del Cauca<br><span>Antigüedad:</span> más de 5.000 años<br><span>Pieza:</span> Máscara, oro, 200 a.C.–200 d.C., Palmira (Valle del Cauca), 26,3 x 41,4 cm" + credito(FUENTE_CALIMA)
    },
    {
      sala: 0, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Historia", titulo: "Una región, varias culturas",
      foto: "img/calima/vasija-zoomorfa.jpg",
      desc: "'Calima' no designa un solo pueblo sino una secuencia de culturas que se sucedieron en la misma región a lo largo de milenios, cada una con estilos propios de cerámica y orfebrería, estudiados por la arqueología.",
      det: "<span>Nombre:</span> designación regional, no étnica<br><span>Uso:</span> secuencia de culturas arqueológicas<br><span>Pieza:</span> Vasija zoomorfa, cerámica, período Yotoco (200 a.C.–1300 d.C.), Restrepo (Valle del Cauca), 9,3 x 16,5 cm, reg. C04513" + creditoFoto(FUENTE_COLECCION)
    },
    {
      sala: 0, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Sociedad", titulo: "Cacicazgos del suroccidente",
      foto: "img/calima/pectoral-circular-antropomorfo.jpg",
      desc: "Las comunidades Calima se organizaban en cacicazgos con líderes que concentraban poder político y religioso, reflejado en el acceso privilegiado a los objetos de oro más elaborados hallados en sus tumbas.",
      det: "<span>Organización:</span> cacicazgos<br><span>Evidencia:</span> orfebrería en tumbas de élite<br><span>Pieza:</span> Pectoral circular con figura antropomorfa y adornos colgantes, orfebrería, período Yotoco, 26 x 27,5 cm, reg. O05196" + creditoFoto(FUENTE_COLECCION)
    },
    {
      sala: 0, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Historia", titulo: "El Museo del Oro Calima",
      foto: "img/calima/colgante-oro-restrepo.jpeg",
      desc: "En Cali, el Museo del Oro Calima del Banco de la República reúne piezas de orfebrería y cerámica de las distintas culturas de la región, permitiendo comprender su larga secuencia histórica.",
      det: "<span>Sede:</span> Cali, Valle del Cauca<br><span>Colección:</span> orfebrería y cerámica regional<br><span>Pieza:</span> Colgante, oro, 100 a.C.–1000 d.C., Restrepo (Valle del Cauca), 7,1 x 3,2 cm" + credito(FUENTE_CALIMA)
    },

    // ── SALA 2: Períodos Calima ──────────────────────────────────────────
    {
      sala: 1, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Arqueología", titulo: "Ilama, el período más antiguo",
      foto: "img/calima/alcarraza-armadillo-ilama.jpeg",
      desc: "El período Ilama, entre aproximadamente 1600 a.C. y 100 d.C., corresponde a las primeras comunidades agrícolas y alfareras de la región, con una cerámica sencilla pero ya con presencia de figuras humanas.",
      det: "<span>Período:</span> Ilama (~1500–100 a.C.)<br><span>Rasgo:</span> primeras comunidades agrícolas y alfareras<br><span>Pieza:</span> Alcarraza en forma de armadillo, período Ilama, región Calima" + credito(FUENTE_CALIMA)
    },
    {
      sala: 1, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Arqueología", titulo: "Yotoco, la orfebrería clásica",
      foto: "img/calima/colgante-danzante.jpg",
      desc: "El período Yotoco (200 a.C.–1300 d.C.) es el más conocido por su orfebrería: piezas fundidas a la cera perdida con gran detalle, entre las más admiradas del arte precolombino colombiano.",
      det: "<span>Período:</span> Yotoco (200 a.C.–1300 d.C.)<br><span>Técnica:</span> fundición a la cera perdida<br><span>Pieza:</span> Colgante (danzante), oro, Restrepo (Valle del Cauca), 5,7 x 2,5 cm, reg. O26634" + creditoFoto(FUENTE_COLECCION)
    },
    {
      sala: 1, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Arqueología", titulo: "Sonso, el período tardío",
      foto: "img/calima/vasija-ceramica-restrepo.jpeg",
      desc: "El período Sonso (650–1700 d.C.) corresponde a los grupos indígenas que los españoles encontraron a su llegada. Su orfebrería es más sencilla que la Yotoco, pero conservan una rica tradición cerámica y textil.",
      det: "<span>Período:</span> Sonso (650–1700 d.C.)<br><span>Contacto:</span> presente a la llegada española<br><span>Pieza:</span> Vasija, cerámica, Restrepo (Valle del Cauca), tradición alfarera de la región" + credito(FUENTE_CALIMA)
    },
    {
      sala: 1, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Arqueología", titulo: "Una secuencia de casi 3.000 años",
      foto: "img/calima/recipiente-cal-fitomorfo.jpg",
      desc: "Entre Ilama, Yotoco y Sonso, la región Calima ofrece una de las secuencias culturales mejor documentadas de Colombia, mostrando cómo evolucionaron las técnicas de cerámica y orfebrería a lo largo de casi 3.000 años.",
      det: "<span>Secuencia:</span> Ilama → Yotoco → Sonso<br><span>Duración total:</span> cerca de 3.000 años<br><span>Pieza:</span> Recipiente para cal fitomorfo, oro, período Yotoco, 7,1 x 5,4 cm, reg. O05564" + creditoFoto(FUENTE_COLECCION)
    },

    // ── SALA 3: Orfebrería monumental ────────────────────────────────────
    {
      sala: 2, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Orfebrería", titulo: "Pectorales de gran formato",
      foto: "img/calima/pectoral-circular-antropomorfo.jpg",
      desc: "Los orfebres del período Yotoco crearon algunos de los pectorales de oro más grandes de la América precolombina, láminas martilladas con diseños geométricos que cubrían buena parte del pecho de sus portadores.",
      det: "<span>Objeto:</span> pectorales de gran formato<br><span>Técnica:</span> laminado y martillado<br><span>Pieza:</span> Pectoral circular con figura antropomorfa y adornos colgantes, período Yotoco, 26 x 27,5 cm, reg. O05196" + creditoFoto(FUENTE_COLECCION)
    },
    {
      sala: 2, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Orfebrería", titulo: "Máscaras funerarias de oro",
      foto: "img/calima/mascara-oro-palmira.jpeg",
      desc: "Entre las piezas más impactantes de la orfebrería calima están las máscaras funerarias de oro laminado, colocadas sobre el rostro de los difuntos de mayor rango como parte del ritual de entierro.",
      det: "<span>Objeto:</span> máscara funeraria<br><span>Material:</span> oro laminado<br><span>Uso:</span> ritual funerario<br><span>Pieza:</span> Máscara, oro, 200 a.C.–200 d.C., Palmira (Valle del Cauca)" + credito(FUENTE_CALIMA)
    },
    {
      sala: 2, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Orfebrería", titulo: "Figuras de danzantes y guerreros",
      foto: "img/calima/colgante-danzante.jpg",
      desc: "Los colgantes calima representaban con frecuencia danzantes ataviados con diadema, nariguera y taparrabo, sosteniendo objetos rituales como pieles de lagarto o bastones adornados, ligados a ceremonias de poder.",
      det: "<span>Motivo:</span> danzante con atuendo ritual<br><span>Técnica:</span> fundición a la cera perdida<br><span>Pieza:</span> Colgante, oro, período Yotoco, Restrepo (Valle del Cauca), 5,7 x 2,5 cm" + creditoFoto(FUENTE_COLGANTE)
    },
    {
      sala: 2, lado: "R2", forma: "esfera", escala: [0.65],
      tag: "Orfebrería", titulo: "Técnica del laminado y repujado",
      foto: "img/calima/recipiente-cal-fitomorfo.jpg",
      desc: "A diferencia de otras culturas que preferían solo la cera perdida, los orfebres calima también dominaban el martillado y el repujado: golpeaban el oro desde el reverso para crear volumen y relieve en la superficie.",
      det: "<span>Técnica:</span> martillado y repujado, ensamblado por fusión<br><span>Resultado:</span> piezas de volumen escultórico<br><span>Pieza:</span> Recipiente para cal fitomorfo (poporo), oro, período Yotoco, 7,1 x 5,4 cm, reg. O05564" + creditoFoto(FUENTE_COLECCION)
    },

    // ── SALA 4: Cerámica Calima ──────────────────────────────────────────
    {
      sala: 3, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Cerámica", titulo: "Figuras antropomorfas Ilama",
      foto: "img/calima/alcarraza-armadillo-ilama.jpeg",
      desc: "La cerámica del período Ilama incluye figuras humanas de cuerpo sencillo y cabeza destacada, muchas veces asociadas a contextos funerarios y usadas como ofrendas para acompañar a los muertos.",
      det: "<span>Período:</span> Ilama<br><span>Tipo:</span> figuras antropomorfas y zoomorfas funerarias<br><span>Pieza:</span> Alcarraza en forma de armadillo, período Ilama, región Calima" + credito(FUENTE_CALIMA)
    },
    {
      sala: 3, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Cerámica", titulo: "Vasijas zoomorfas",
      foto: "img/calima/vasija-zoomorfa.jpg",
      desc: "Los alfareros calima modelaban vasijas con forma de aves y otros animales, combinando la función utilitaria del recipiente con una representación cuidadosa de la fauna de su entorno.",
      det: "<span>Tipo:</span> vasija zoomorfa (ave)<br><span>Período:</span> Yotoco<br><span>Pieza:</span> Vasija zoomorfa, cerámica, Restrepo (Valle del Cauca), 9,3 x 16,5 cm, reg. C04513" + creditoFoto(FUENTE_COLECCION)
    },
    {
      sala: 3, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Cerámica", titulo: "Recipientes para chicha",
      foto: "img/calima/alcarraza-ceramica-palmira.jpeg",
      desc: "Grandes vasijas de cerámica servían para preparar y almacenar chicha de maíz, bebida central en las celebraciones y rituales de las comunidades Calima a lo largo de sus distintos períodos.",
      det: "<span>Uso:</span> preparación y almacenamiento de chicha<br><span>Materia prima:</span> maíz fermentado<br><span>Pieza:</span> Alcarraza, cerámica, Palmira (Valle del Cauca), 12,3 x 15,3 x 12,4 cm" + credito(FUENTE_CALIMA)
    },
    {
      sala: 3, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Cerámica", titulo: "Ofrendas funerarias",
      foto: "img/calima/alcarraza-zoomorfa-mono.jpg",
      desc: "Las tumbas Calima solían incluir vasijas de cerámica con formas de animales como el mono, evidencia de la importancia que estas comunidades daban al acompañamiento simbólico de sus difuntos en el más allá.",
      det: "<span>Contexto:</span> ofrenda funeraria<br><span>Período:</span> Malagana<br><span>Pieza:</span> Alcarraza zoomorfa (mono), cerámica, Palmira (Valle del Cauca), 19 x 16 cm, reg. C13064" + creditoFoto(FUENTE_COLECCION)
    },

    // ── SALA 5: Territorio y vida cotidiana ──────────────────────────────
    {
      sala: 4, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Territorio", titulo: "El valle del río Calima",
      foto: "img/calima/mascara-oro-palmira.jpeg",
      desc: "El río Calima, afluente del río San Juan en el Pacífico colombiano, da nombre a la región y proporcionó a sus habitantes tierras fértiles, agua abundante y acceso a distintos pisos térmicos.",
      det: "<span>Río:</span> Calima (cuenca del San Juan)<br><span>Recursos:</span> tierras fértiles, agua, variedad climática<br><span>Pieza:</span> Máscara, oro, Palmira (Valle del Cauca), pieza representativa de la región" + credito(FUENTE_CALIMA)
    },
    {
      sala: 4, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Vida cotidiana", titulo: "Agricultura de maíz y frijol",
      foto: "img/calima/recipiente-cal-fitomorfo.jpg",
      desc: "La base alimentaria de las comunidades Calima era el cultivo de maíz, frijol y yuca. El maíz en particular tenía tanta importancia que su forma inspiraba directamente el diseño de piezas de orfebrería como este recipiente.",
      det: "<span>Cultivos principales:</span> maíz, frijol, yuca<br><span>Inspiración:</span> la mazorca de maíz en el diseño del objeto<br><span>Pieza:</span> Recipiente para cal fitomorfo, oro, período Yotoco, reg. O05564" + creditoFoto(FUENTE_COLECCION)
    },
    {
      sala: 4, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Vida cotidiana", titulo: "Comercio con el Pacífico y los Andes",
      foto: "img/calima/trompeta-oro.jpg",
      desc: "Gracias a su posición entre la costa Pacífica y la cordillera Occidental, las comunidades Calima participaron en redes de intercambio que conectaban productos marinos, orfebrería y bienes agrícolas de distintas regiones, incluyendo instrumentos musicales usados en rituales colectivos.",
      det: "<span>Posición:</span> entre Pacífico y cordillera Occidental<br><span>Rol:</span> nodo de intercambio regional<br><span>Pieza:</span> Trompeta, orfebrería, período Malagana, Palmira (Valle del Cauca), 40 x 5,6 cm, reg. O33395" + creditoFoto(FUENTE_COLECCION)
    },
    {
      sala: 4, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Legado", titulo: "Calima en el Valle del Cauca de hoy",
      foto: "img/calima/alcarraza-ceramica-palmira.jpeg",
      desc: "El nombre Calima permanece en la geografía y la identidad del Valle del Cauca —en el río, el municipio de Calima-Darién y el embalse homónimo— como recordatorio de una de las tradiciones orfebres más importantes de Colombia.",
      det: "<span>Huella actual:</span> río, municipio y embalse Calima<br><span>Legado:</span> tradición orfebre reconocida, hoy en el Museo del Oro Calima (Cali)<br><span>Pieza:</span> Alcarraza, cerámica, Palmira (Valle del Cauca)" + credito(FUENTE_CALIMA)
    },
];
