// ============================================================
//  quimbaya.js — Contenido de la sala Quimbaya
//  Mismo esquema que js/data/guane.js.
//  Fotos: piezas reales de la colección del Museo del Oro,
//  tomadas de la Enciclopedia Banrepcultural (Banco de la
//  República). Cada pieza incluye su fuente y URL en `det`.
// ============================================================

const FUENTE_QUIMBAYA = 'https://enciclopedia.banrepcultural.org/index.php?title=Quimbaya';
const FUENTE_POPORO   = 'https://enciclopedia.banrepcultural.org/Poporo_Quimbaya';
const credito = (url) => `<br><span>Fuente:</span> <a href="${url}" target="_blank" rel="noopener">Banco de la República – Museo del Oro</a>`;

export const salasQuimbaya = [
    { nombre: "¿Quiénes eran los Quimbaya?",  color: 0xB8860B },
    { nombre: "Maestros de la orfebrería",     color: 0x9A6F09 },
    { nombre: "El Tesoro Quimbaya",            color: 0x9A6F09 },
    { nombre: "Cerámica y vida cotidiana",     color: 0x9A6F09 },
    { nombre: "Ritual, poporo y coca",         color: 0x9A6F09 },
];

export const piezasQuimbaya = [
    // ── SALA 1: ¿Quiénes eran los Quimbaya? ──────────────────────────────
    {
      sala: 0, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Historia", titulo: "¿Quiénes eran los Quimbaya?",
      foto: "img/quimbaya/poporo-quimbaya.jpg",
      desc: "Los Quimbaya fueron un pueblo indígena que habitó la región del valle medio del río Cauca, en lo que hoy son los departamentos de Quindío, Risaralda y Caldas. Se destacaron como uno de los pueblos orfebres más hábiles de la América precolombina.",
      det: "<span>Territorio:</span> valle medio del río Cauca<br><span>Departamentos actuales:</span> Quindío, Risaralda, Caldas<br><span>Fama:</span> orfebrería<br><span>Pieza:</span> Poporo Quimbaya, tumbaga (200 a.C.–1000 d.C.), pieza fundacional del Museo del Oro (1939)" + credito(FUENTE_POPORO)
    },
    {
      sala: 0, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Historia", titulo: "Dos períodos: Quimbaya Temprano y Tardío",
      foto: "img/quimbaya/pectoral-montenegro.jpeg",
      desc: "Los arqueólogos distinguen un período Quimbaya Temprano o Clásico (500 a.C.–700 d.C.), famoso por su orfebrería refinada, y un período Tardío (1200–1600 d.C.), asociado a los grupos que encontraron los españoles a su llegada.",
      det: "<span>Quimbaya Temprano:</span> 500 a.C.–700 d.C.<br><span>Quimbaya Tardío:</span> 1200–1600 d.C.<br><span>Pieza:</span> Pectoral, oro, 900–1600 d.C., Montenegro (Quindío), típico del período Tardío" + credito(FUENTE_QUIMBAYA)
    },
    {
      sala: 0, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Sociedad", titulo: "Agricultores del valle del Cauca",
      foto: "img/quimbaya/vasija-santafe-antioquia.jpeg",
      desc: "Además de la orfebrería, los Quimbaya fueron hábiles agricultores. Cultivaban maíz, yuca y frutales en las tierras fértiles del valle del Cauca, lo que sostenía una población densa y organizada en cacicazgos.",
      det: "<span>Cultivos:</span> maíz, yuca, frutales<br><span>Organización:</span> cacicazgos<br><span>Pieza:</span> Vasija, cerámica, Santafé de Antioquia, uso doméstico cotidiano" + credito(FUENTE_QUIMBAYA)
    },
    {
      sala: 0, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Historia", titulo: "Encuentro con los españoles",
      foto: "img/quimbaya/poporo-puerto-nare.jpeg",
      desc: "A la llegada de los conquistadores españoles en el siglo XVI, el nombre 'Quimbaya' se aplicó a los grupos indígenas del valle medio del Cauca, cuya orfebrería deslumbró de inmediato a los recién llegados.",
      det: "<span>Siglo de contacto:</span> XVI<br><span>Reacción española:</span> asombro por la orfebrería<br><span>Pieza:</span> Poporo, tumbaga, Puerto Nare (Antioquia)" + credito(FUENTE_QUIMBAYA)
    },

    // ── SALA 2: Maestros de la orfebrería ────────────────────────────────
    {
      sala: 1, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Orfebrería", titulo: "La técnica de la cera perdida",
      foto: "img/quimbaya/poporo-loma-pajarito.jpeg",
      desc: "Los orfebres quimbaya dominaron con maestría la técnica de la cera perdida, que permite fundir piezas de oro con gran detalle y volumen en una sola colada, sin necesidad de soldaduras posteriores.",
      det: "<span>Técnica:</span> cera perdida con núcleo<br><span>Resultado:</span> piezas de una sola pieza fundida<br><span>Pieza:</span> Poporo, tumbaga, Loma de Pajarito (Antioquia), 23,5 x 11,4 cm" + credito(FUENTE_QUIMBAYA)
    },
    {
      sala: 1, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Orfebrería", titulo: "Tumbaga quimbaya",
      foto: "img/quimbaya/cuenta-tumbaga.jpeg",
      desc: "Al igual que otros pueblos orfebres de Colombia, los Quimbaya trabajaban la tumbaga, aleación de oro y cobre, que les permitía obtener piezas más resistentes y de tonalidades doradas a rojizas.",
      det: "<span>Aleación:</span> tumbaga (≈60% oro, 30% cobre, 10% plata)<br><span>Ventaja:</span> mayor resistencia y variedad de tonos<br><span>Pieza:</span> Cuenta, tumbaga, 2 x 1,7 cm" + credito(FUENTE_QUIMBAYA)
    },
    {
      sala: 1, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Orfebrería", titulo: "Figuras humanas y antropomorfas",
      foto: "img/quimbaya/poporo-filandia.jpeg",
      desc: "Una de las marcas distintivas de la orfebrería quimbaya son las figuras humanas de formas voluminosas y pulidas, muchas veces representando personajes sentados, con narigueras, orejeras y tocados elaborados.",
      det: "<span>Motivo característico:</span> figuras humanas voluminosas<br><span>Adornos representados:</span> narigueras, orejeras, tocados<br><span>Pieza:</span> Poporo, tumbaga, Filandia (Quindío), 11 x 9,5 cm" + credito(FUENTE_QUIMBAYA)
    },
    {
      sala: 1, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Orfebrería", titulo: "Reconocimiento internacional",
      foto: "img/quimbaya/poporo-pueblorrico.jpeg",
      desc: "La orfebrería quimbaya es considerada una de las cumbres del arte precolombino de América, admirada por la precisión técnica y el sentido estético de sus formas, muy por encima de la joyería de otros pueblos contemporáneos.",
      det: "<span>Reconocimiento:</span> arte precolombino de referencia mundial<br><span>Cualidad destacada:</span> precisión técnica y estética<br><span>Pieza:</span> Poporo, tumbaga, Pueblorrico (Risaralda), 24 x 11,8 x 7,2 cm" + credito(FUENTE_QUIMBAYA)
    },

    // ── SALA 3: El Tesoro Quimbaya ───────────────────────────────────────
    {
      sala: 2, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Historia", titulo: "El hallazgo del Tesoro Quimbaya",
      foto: "img/quimbaya/poporo-quimbaya.jpg",
      desc: "En 1890 se descubrió, en un montículo funerario cerca de Filandia (Quindío), un extraordinario conjunto de piezas de orfebrería que pasó a conocerse como el Tesoro Quimbaya, una de las colecciones prehispánicas más famosas de Colombia.",
      det: "<span>Año del hallazgo:</span> 1890<br><span>Lugar:</span> cerca de Filandia, Quindío<br><span>Pieza:</span> Poporo Quimbaya, la pieza más emblemática de la orfebrería del Cauca medio" + credito(FUENTE_POPORO)
    },
    {
      sala: 2, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Historia", titulo: "El regalo a la corona española",
      foto: "img/quimbaya/poporo-roldanillo.jpeg",
      desc: "En 1892 el gobierno colombiano obsequió el Tesoro Quimbaya a la reina regente de España, María Cristina de Habsburgo, como parte de las celebraciones del cuarto centenario del viaje de Colón. Hoy se conserva en el Museo de América, en Madrid.",
      det: "<span>Año del regalo:</span> 1892<br><span>Destino actual:</span> Museo de América, Madrid<br><span>Pieza:</span> Poporo, tumbaga, Roldanillo (Valle del Cauca), del mismo tipo de piezas que integraron el tesoro" + credito(FUENTE_QUIMBAYA)
    },
    {
      sala: 2, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Patrimonio", titulo: "Un debate sobre patrimonio",
      foto: "img/quimbaya/recipientes-puerto-nare.jpeg",
      desc: "El Tesoro Quimbaya sigue siendo hoy objeto de debate en Colombia sobre la restitución del patrimonio arqueológico enviado al extranjero durante la República, y sobre cómo se cuenta y se posee la historia de los pueblos originarios.",
      det: "<span>Tema actual:</span> restitución de patrimonio arqueológico<br><span>Vigencia:</span> debate abierto hoy<br><span>Pieza:</span> Recipientes con tapa, tumbaga, Puerto Nare (Antioquia), 29,3 x 13,4 cm" + credito(FUENTE_QUIMBAYA)
    },
    {
      sala: 2, lado: "R2", forma: "esfera", escala: [0.65],
      tag: "Orfebrería", titulo: "Piezas icónicas del tesoro",
      foto: "img/quimbaya/poporo-quimbaya.jpg",
      desc: "Entre las piezas más conocidas del Tesoro Quimbaya están los poporos en forma de figura humana, considerados obras maestras por el equilibrio entre la forma anatómica y la función ritual del objeto.",
      det: "<span>Pieza icónica:</span> poporo antropomorfo<br><span>Valor:</span> equilibrio entre forma y función<br><span>Registro:</span> O00015, Museo del Oro (adquirido en 1939)" + credito(FUENTE_POPORO)
    },

    // ── SALA 4: Cerámica y vida cotidiana ────────────────────────────────
    {
      sala: 3, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Cerámica", titulo: "Alcarrazas y vasijas dobles",
      foto: "img/quimbaya/vasija-santafe-antioquia.jpeg",
      desc: "La cerámica quimbaya incluye las famosas alcarrazas de doble pico y asa puente, piezas funcionales y estéticas usadas para contener y servir líquidos, con formas que a veces recuerdan figuras humanas o animales.",
      det: "<span>Pieza característica:</span> vasija de doble pico<br><span>Uso:</span> contener y servir líquidos<br><span>Pieza:</span> Vasija, cerámica, Santafé de Antioquia, 20,5 x 40 cm" + credito(FUENTE_QUIMBAYA)
    },
    {
      sala: 3, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Vida cotidiana", titulo: "Agricultura y comercio",
      foto: "img/quimbaya/recipientes-puerto-nare.jpeg",
      desc: "La riqueza del valle del Cauca permitió a los Quimbaya sostener una economía agrícola sólida, complementada con el comercio de sal, algodón y objetos de oro con pueblos vecinos de la región andina.",
      det: "<span>Economía:</span> agricultura y comercio regional<br><span>Bienes comerciados:</span> sal, algodón, orfebrería<br><span>Pieza:</span> Recipientes con tapa, tumbaga, usados para guardar y transportar hojas de coca, Puerto Nare (Antioquia)" + credito(FUENTE_QUIMBAYA)
    },
    {
      sala: 3, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Cerámica", titulo: "Urnas funerarias",
      foto: "img/quimbaya/vasija-periodo-temprano.jpeg",
      desc: "Los Quimbaya enterraban a sus muertos en tumbas de pozo profundo con cámara lateral, acompañados de urnas funerarias de cerámica y ofrendas de orfebrería, reflejo de la importancia del ritual funerario en su cultura.",
      det: "<span>Tipo de tumba:</span> pozo con cámara lateral<br><span>Ofrendas:</span> urnas de cerámica y piezas de oro<br><span>Pieza:</span> Vasija, cerámica, Período Temprano, 8,8 x 23,6 cm" + credito(FUENTE_QUIMBAYA)
    },
    {
      sala: 3, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Vida cotidiana", titulo: "Vestido y ornamento personal",
      foto: "img/quimbaya/pectoral-montenegro.jpeg",
      desc: "Los Quimbaya de mayor rango social lucían narigueras, orejeras, pectorales y diademas de oro, símbolos visibles de estatus que hoy se conocen principalmente a través de las piezas de sus tumbas.",
      det: "<span>Ornamentos:</span> narigueras, orejeras, pectorales, diademas<br><span>Función:</span> símbolo de estatus social<br><span>Pieza:</span> Pectoral, oro, Montenegro (Quindío), 17,5 cm de diámetro" + credito(FUENTE_QUIMBAYA)
    },

    // ── SALA 5: Ritual, poporo y coca ────────────────────────────────────
    {
      sala: 4, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Ritual", titulo: "El mambeo de la hoja de coca",
      foto: "img/quimbaya/poporo-loma-pajarito.jpeg",
      desc: "El consumo ritual de hoja de coca, mezclada con cal extraída del poporo, era una práctica central en la vida ceremonial quimbaya, asociada al estatus social, la comunicación espiritual y los encuentros entre líderes.",
      det: "<span>Práctica:</span> mambeo de coca con cal<br><span>Significado:</span> estatus y comunicación espiritual<br><span>Pieza:</span> Poporo, tumbaga, Loma de Pajarito (Antioquia)" + credito(FUENTE_QUIMBAYA)
    },
    {
      sala: 4, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Ritual", titulo: "El poporo, símbolo de vida adulta",
      foto: "img/quimbaya/poporo-pueblorrico.jpeg",
      desc: "Entregar un poporo a un joven marcaba su paso a la vida adulta y su capacidad de participar en la vida ceremonial y política de la comunidad, una tradición compartida con otros pueblos orfebres colombianos.",
      det: "<span>Objeto:</span> poporo<br><span>Significado:</span> paso a la vida adulta<br><span>Pieza:</span> Poporo, tumbaga, Pueblorrico (Risaralda)" + credito(FUENTE_QUIMBAYA)
    },
    {
      sala: 4, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Cosmovisión", titulo: "Orfebrería como lenguaje espiritual",
      foto: "img/quimbaya/poporo-filandia.jpeg",
      desc: "Para los Quimbaya, trabajar el oro no era solo una actividad artesanal: cada figura fundida podía representar seres espirituales, antepasados o fuerzas de la naturaleza, dando a la orfebrería un profundo sentido ritual.",
      det: "<span>Función del oro:</span> representación espiritual<br><span>Motivos:</span> antepasados, seres y fuerzas naturales<br><span>Pieza:</span> Poporo, tumbaga, Filandia (Quindío)" + credito(FUENTE_QUIMBAYA)
    },
    {
      sala: 4, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Legado", titulo: "Legado quimbaya hoy",
      foto: "img/quimbaya/poporo-roldanillo.jpeg",
      desc: "El nombre Quimbaya permanece vivo hoy en la región del Eje Cafetero, tanto en la identidad cultural de Quindío, Risaralda y Caldas como en las réplicas de orfebrería que continúan produciendo artesanos actuales.",
      det: "<span>Región actual:</span> Eje Cafetero (Quindío, Risaralda, Caldas)<br><span>Continuidad:</span> identidad regional y artesanía<br><span>Pieza:</span> Poporo, tumbaga, Roldanillo (Valle del Cauca)" + credito(FUENTE_QUIMBAYA)
    },
];
