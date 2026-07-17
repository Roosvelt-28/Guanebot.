// ============================================================
//  data.js — Contenido del museo
//  Cada pieza puede incluir opcionalmente `galeria: [url, ...]`
//  para mostrar varias imágenes rotando en el panel. Si no se
//  define, se usa `foto` como única imagen de la galería.
// ============================================================

export const salasGuane = [
  { nombre: "¿Quiénes eran los Guane?",  color: 0x7A4A28 },
  { nombre: "Cerámica doméstica",         color: 0x6B3A22 },
  { nombre: "Economía Guane",             color: 0x6B3A22 },
  { nombre: "Tejidos, vanidad y adornos", color: 0x6B3A22 },
  { nombre: "Cerámica y rituales fúnebres", color: 0x6B3A22 },
  { nombre: "Preguntas sobre las salas",  color: 0x6B3A22 },
];

export const piezasGuane = [
  // ── SALA 1: ¿Quiénes eran los Guane? ──────────────────────────────────────────────────────────
  {
    sala: 0, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
    tag: "Historia", titulo: "¿Quiénes eran los Guane?",
    foto: "img/JxI7cze.jpeg",
    desc: "Los Guane fueron un pueblo indígena precolombino que habitó el territorio que hoy corresponde al departamento de Santander. Eran una comunidad organizada con agricultura, artesanía y tejidos, con sus propias costumbres, creencias y formas de organización social.",
    det: "<span>Período:</span> Siglo VI–XVI d.C.<br><span>Territorio:</span> Río Chicamocha<br><span>Población:</span> ~70.000 personas"
  },
  {
    sala: 0, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
    tag: "Historia", titulo: "Territorio y asentamiento",
    foto: "img/4mZLQ6j.jpeg",
    desc: "Los Guane ocuparon una extensa zona del nororiente colombiano. Sus principales centros de asentamiento estaban en Barichara, San Gil, Socorro, Vélez y lo que hoy es Bucaramanga.",
    det: "<span>Municipios:</span> Barichara, San Gil, Socorro<br><span>Río:</span> Chicamocha<br><span>Dpto:</span> Santander"
  },
  {
    sala: 0, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
    tag: "Sociedad", titulo: "Organización social",
    foto: "img/yzmvv7y.jpeg",
    desc: "Los Guane vivían en cacicazgos liderados por el 'Guanentá'. La sociedad estaba dividida en artesanos, agricultores y guerreros. Las mujeres eran las principales tejedoras y jugaban un rol central en la economía doméstica.",
    det: "<span>Gobierno:</span> Cacicazgo<br><span>Líder:</span> Guanentá<br><span>Rol femenino:</span> Tejido y agricultura"
  },
  {
    sala: 0, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
    tag: "Sociedad", titulo: "Lengua y cosmovisión",
    foto: "img/XqwLyl2.jpeg",
    desc: "Los Guane hablaban una lengua propia emparentada con el chibcha. Su cosmovisión giraba en torno al sol, el agua y los ancestros. Muchos topónimos actuales como Chicamocha y Bucaramanga son de origen Guane.",
    det: "<span>Lengua:</span> Guane (familia chibcha)<br><span>Palabras:</span> Chicamocha, Bucaramanga<br><span>Cosmovisión:</span> Sol, agua, ancestros"
  },
  // ── SALA 2: Cerámica doméstica ─────────────────────────────────────────────────────────────────
  {
    sala: 1, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
    tag: "Cerámica", titulo: "La alfarería cotidiana",
    foto: "img/lASNZTl.jpeg",
    desc: "La cerámica doméstica Guane era producida principalmente por las mujeres. Fabricaban ollas, cuencos, múcuras y budares para cocinar, almacenar agua, chicha y alimentos. Las formas eran funcionales y estaban adaptadas a la vida diaria.",
    det: "<span>Técnica:</span> Modelado a mano<br><span>Usos:</span> Cocina, almacenamiento, agua<br><span>Productoras:</span> Mujeres"
  },
  {
    sala: 1, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
    tag: "Cerámica", titulo: "Formas y decoración",
    foto: "img/cakf0Uj.jpeg",
    desc: "La cerámica Guane se caracteriza por decoraciones geométricas en rojo y negro sobre fondo beige o crema. Los motivos incluyen líneas paralelas, triángulos, rombos y puntos. El acabado podía ser bruñido para impermeabilizar la vasija.",
    det: "<span>Colores:</span> Rojo, negro, beige<br><span>Motivos:</span> Geométricos<br><span>Acabado:</span> Bruñido"
  },
  {
    sala: 1, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
    tag: "Cerámica", titulo: "La múcura — vasija de agua",
    foto: "img/Wuxw1sb.jpeg",
    desc: "La múcura era la vasija más importante del hogar Guane. Su forma de doble bulbo con cuello estrecho permitía mantener el agua fresca gracias a la porosidad de la arcilla. Era cargada por las mujeres desde los ríos y quebradas.",
    det: "<span>Forma:</span> Doble bulbo<br><span>Función:</span> Almacenar agua<br><span>Material:</span> Arcilla local"
  },
  {
    sala: 1, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
    tag: "Cerámica", titulo: "Metate",
    foto: "img/PVIORGN.jpeg",
    desc: "El metate es un instrumento tradicional utilizado para moler granos y otros alimentos en la cocina mesoamericana. Originalmente, se fabricaba de piedra y se usaba principalmente por las mujeres indígenas para procesar ingredientes como el maíz y el cacao.",
    det: "<span>Forma:</span> Plana circular<br><span>Uso:</span> Asar arepas y yuca<br><span>Contexto:</span> Fogón doméstico"
  },
  {
    sala: 1, lado: "C", forma: "esfera", escala: [0.65],
    tag: "Cerámica", titulo: "Múcura Guane",
    foto: "",
    desc: "La múcura era la vasija más importante del hogar Guane. Su forma de doble bulbo con cuello estrecho permitía mantener el agua fresca gracias a la porosidad de la arcilla.",
    det: "<span>Forma:</span> Doble bulbo<br><span>Material:</span> Arcilla local<br><span>Función:</span> Almacenar agua"
  },
  // ── SALA 3: Economía Guane ─────────────────────────────────────────────────────────────────────
  {
    sala: 2, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
    tag: "Economía", titulo: "Agricultura y cultivos",
    foto: "img/ykFiDP0.jpeg",
    desc: "La base de la economía Guane era la agricultura. Cultivaban maíz, yuca, fríjol, algodón, tabaco y una gran variedad de frutas tropicales. Usaban terrazas de cultivo en las laderas del Chicamocha para aprovechar el terreno.",
    det: "<span>Cultivos:</span> Maíz, yuca, algodón, tabaco<br><span>Técnica:</span> Terrazas de cultivo<br><span>Clima:</span> Seco-cálido"
  },
  {
    sala: 2, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
    tag: "Economía", titulo: "Intercambio y comercio",
    foto: "img/EFWSZDH.jpeg",
    desc: "Los Guane practicaban el intercambio con pueblos vecinos como los Muiscas. Comerciaban mantas de algodón, sal, pescado seco del Chicamocha y productos agrícolas. Los tejidos eran su principal producto de exportación.",
    det: "<span>Socios:</span> Muiscas, Laches<br><span>Productos:</span> Mantas, sal, pescado<br><span>Moneda:</span> Trueque"
  },
  {
    sala: 2, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
    tag: "Economía", titulo: "Pesca y caza",
    foto: "img/8c64hZs.jpeg",
    desc: "El río Chicamocha proveía abundante pesca. Los Guane también cazaban venados, armadillos y aves. La pesca era realizada con redes, anzuelos de hueso y venenos vegetales que aturdían a los peces.",
    det: "<span>Río:</span> Chicamocha<br><span>Técnicas:</span> Redes, anzuelos de hueso<br><span>Caza:</span> Venado, armadillo"
  },
  {
    sala: 2, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
    tag: "Economía", titulo: "El algodón — riqueza Guane",
    foto: "img/u58BhK3.jpeg",
    desc: "El algodón era el producto más valioso de la economía Guane. Lo cultivaban en los valles cálidos del Chicamocha, lo hilaban con volantes de huso y lo tejían en telares de cintura. Las mantas de algodón Guane eran famosas en toda la región.",
    det: "<span>Cultivo:</span> Valles del Chicamocha<br><span>Herramienta:</span> Huso y telar<br><span>Valor:</span> Principal bien de intercambio"
  },
  // ── SALA 4: Tejidos, vanidad y adornos ────────────────────────────────────────────────────────
  {
    sala: 3, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
    tag: "Textiles", titulo: "El arte del tejido",
    foto: "img/d7P5dwZ.jpeg",
    desc: "Los tejidos Guane en algodón eran tan finos que los cronistas españoles los compararon con los mejores tejidos europeos. Las mujeres tejían en telares de cintura mantas, hamacas, bolsos y ropa con patrones geométricos de gran complejidad.",
    det: "<span>Material:</span> Algodón nativo<br><span>Técnica:</span> Telar de cintura<br><span>Productos:</span> Mantas, hamacas, ropa"
  },
  {
    sala: 3, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
    tag: "Textiles", titulo: "Patrones y significado",
    foto: "img/f9LrIVQ.jpeg",
    desc: "Los diseños tejidos comunicaban el clan, el estatus y la cosmovisión del portador. Los rombos representaban la tierra, las espirales el agua, y los colores indicaban el rango social. Cada manta era un texto visual que los Guane sabían leer.",
    det: "<span>Motivos:</span> Rombos, espirales, grecas<br><span>Colores:</span> Rojo, negro, ocre<br><span>Significado:</span> Linaje y estatus"
  },
  {
    sala: 3, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
    tag: "Adornos", titulo: "Narigueras y orfebrería",
    foto: "img/X8deq1O.jpeg",
    desc: "Los Guane usaban narigueras de oro y tumbaga como símbolo de estatus y poder. Las élites portaban también pectorales, orejeras y collares elaborados. El oro era obtenido por intercambio con los Muiscas y los pueblos del norte.",
    det: "<span>Material:</span> Oro, tumbaga<br><span>Piezas:</span> Narigueras, orejeras, pectorales<br><span>Origen:</span> Intercambio regional"
  },
  {
    sala: 3, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
    tag: "Adornos", titulo: "Collares y cuentas",
    foto: "img/NZA6b8y.jpeg",
    desc: "Los collares Guane eran elaborados con cuentas de piedras semipreciosas, caracoles, huesos y cerámica. Tenían tanto función decorativa como ritual. Algunos collares eran amuletos de protección portados desde la infancia.",
    det: "<span>Materiales:</span> Piedra, caracol, hueso<br><span>Función:</span> Decorativa y ritual<br><span>Portadores:</span> Hombres, mujeres y niños"
  },
  // ── SALA 5: Cerámica y rituales fúnebres ──────────────────────────────────────────────────────
  {
    sala: 4, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
    tag: "Ritual", titulo: "Las momias Guane",
    foto: "img/F9tvEGS.jpeg",
    desc: "Los Guane momificaban a sus muertos en posición fetal, envueltos en tejidos de algodón y cuerdas de fique. Es una de las pocas culturas colombianas con esta práctica. Las momias eran depositadas en cuevas o nichos en la roca del Chicamocha.",
    det: "<span>Técnica:</span> Desecación natural + resinas<br><span>Posición:</span> Fetal<br><span>Conservación:</span> Museo de Santander"
  },
  {
    sala: 4, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
    tag: "Ritual", titulo: "Deformacion Cranial",
    foto: "img/VSjgnYO.jpeg",
    desc: "Los guanes deformaban intencionalmente sus cabezas como parte de una práctica cultural y simbólica, vinculada a la identidad, la estética y posiblemente al estatus social dentro de su comunidad.",
    det: "<span>Objetos:</span> Vasijas, tejidos, adornos<br><span>Alimentos:</span> Chicha, maíz<br><span>Creencia:</span> Viaje al más allá"
  },
  {
    sala: 4, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
    tag: "Cerámica ritual", titulo: "Cerámica funeraria",
    foto: "img/1cj9mzr.jpeg",
    desc: "La cerámica depositada en las tumbas Guane era especial: más elaborada, con mayor detalle decorativo y a veces de mayor tamaño que la doméstica. Algunas vasijas tenían formas antropomorfas o zoomorfas con significado ritual.",
    det: "<span>Formas:</span> Antropomorfas, zoomorfas<br><span>Decoración:</span> Más elaborada<br><span>Contexto:</span> Cuevas y tumbas"
  },
  {
    sala: 4, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
    tag: "Ritual", titulo: "Sitios funerarios",
    foto: "img/qc0ZWRO.jpeg",
    desc: "Los Guane enterraban a sus muertos en cuevas naturales, nichos en la roca y en urnas cerámicas. Los sitios más conocidos están en Barichara, Cepitá y el Cañón del Chicamocha. Muchos sitios aún no han sido completamente estudiados.",
    det: "<span>Sitios:</span> Barichara, Cepitá<br><span>Tipos:</span> Cuevas, nichos, urnas<br><span>Estado:</span> Parcialmente estudiados"
  },
  // ── SALA 6: Preguntas sobre las salas ─────────────────────────────────────────────────────────
  {
    sala: 5, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
    tag: "Pregunta", titulo: "¿Qué cultivaban los Guane?",
    foto: "img/hO3kfsn.jpeg",
    desc: "Los Guane cultivaban principalmente maíz, yuca, fríjol y algodón. ¿Cuál de estos cultivos era el más importante para su economía? Recuerda lo que viste en la Sala 3.",
    det: "<span>Pista:</span> Era su principal producto de intercambio<br><span>Sala:</span> 3 — Economía Guane"
  },
  {
    sala: 5, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
    tag: "Pregunta", titulo: "¿Cómo conservaban a sus muertos?",
    foto: "img/0spcVVu.jpeg",
    desc: "Los Guane tenían una práctica funeraria muy especial y única en Colombia. ¿Recuerdas cómo preparaban a sus difuntos? Vuelve a la Sala 5 si necesitas repasar.",
    det: "<span>Pista:</span> Posición fetal, envueltos en tela<br><span>Sala:</span> 5 — Cerámica y rituales fúnebres"
  },
  {
    sala: 5, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
    tag: "Pregunta", titulo: "¿Qué significaban los tejidos?",
    foto: "img/Q0nPfwB.jpeg",
    desc: "Los tejidos Guane no eran solo ropa: eran un lenguaje visual. ¿Qué comunicaban los patrones geométricos de las mantas? Revisa la Sala 4 para encontrar la respuesta.",
    det: "<span>Pista:</span> Clan, estatus y cosmovisión<br><span>Sala:</span> 4 — Tejidos y vanidad"
  },
  {
    sala: 5, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
    tag: "Pregunta", titulo: "¿Para qué servía la múcura?",
    foto: "img/RG6Hl3P.jpeg",
    desc: "La múcura era la vasija más importante del hogar Guane. ¿Recuerdas para qué se usaba y por qué su forma era tan especial? La respuesta está en la Sala 2.",
    det: "<span>Pista:</span> Su porosidad mantenía el agua fresca<br><span>Sala:</span> 2 — Cerámica doméstica"
  },
];
