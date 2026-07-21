// ============================================================
//  calima.js — Contenido de la sala Calima
//  Mismo esquema que js/data/guane.js. Campos `foto` marcados
//  PENDIENTE: falta conseguir/subir imagen a img/calima/.
// ============================================================

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
      foto: "PENDIENTE",
      desc: "Calima es el nombre que reciben las culturas prehispánicas que habitaron la cuenca del río Calima, en el suroccidente colombiano, hoy departamento del Valle del Cauca, desde hace más de 5.000 años hasta la llegada de los españoles.",
      det: "<span>Territorio:</span> cuenca del río Calima<br><span>Departamento actual:</span> Valle del Cauca<br><span>Antigüedad:</span> más de 5.000 años"
    },
    {
      sala: 0, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Historia", titulo: "Una región, varias culturas",
      foto: "PENDIENTE",
      desc: "'Calima' no designa un solo pueblo sino una secuencia de culturas que se sucedieron en la misma región a lo largo de milenios, cada una con estilos propios de cerámica y orfebrería, estudiados por la arqueología.",
      det: "<span>Nombre:</span> designación regional, no étnica<br><span>Uso:</span> secuencia de culturas arqueológicas"
    },
    {
      sala: 0, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Sociedad", titulo: "Cacicazgos del suroccidente",
      foto: "PENDIENTE",
      desc: "Las comunidades Calima se organizaban en cacicazgos con líderes que concentraban poder político y religioso, reflejado en el acceso privilegiado a los objetos de oro más elaborados hallados en sus tumbas.",
      det: "<span>Organización:</span> cacicazgos<br><span>Evidencia:</span> orfebrería en tumbas de élite"
    },
    {
      sala: 0, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Historia", titulo: "El Museo del Oro Calima",
      foto: "PENDIENTE",
      desc: "En Cali, el Museo del Oro Calima del Banco de la República reúne piezas de orfebrería y cerámica de las distintas culturas de la región, permitiendo comprender su larga secuencia histórica.",
      det: "<span>Sede:</span> Cali, Valle del Cauca<br><span>Colección:</span> orfebrería y cerámica regional"
    },

    // ── SALA 2: Períodos Calima ──────────────────────────────────────────
    {
      sala: 1, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Arqueología", titulo: "Ilama, el período más antiguo",
      foto: "PENDIENTE",
      desc: "El período Ilama, entre aproximadamente 1600 a.C. y 100 d.C., corresponde a las primeras comunidades agrícolas y alfareras de la región, con una cerámica sencilla pero ya con presencia de figuras humanas.",
      det: "<span>Período:</span> Ilama (~1600 a.C.–100 d.C.)<br><span>Rasgo:</span> primeras comunidades agrícolas"
    },
    {
      sala: 1, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Arqueología", titulo: "Yotoco, la orfebrería clásica",
      foto: "PENDIENTE",
      desc: "El período Yotoco (100 a.C.–1200 d.C.) es el más conocido por su orfebrería: piezas grandes, brillantes y de formas geométricas audaces, entre las más admiradas del arte precolombino colombiano.",
      det: "<span>Período:</span> Yotoco (100 a.C.–1200 d.C.)<br><span>Rasgo:</span> orfebrería monumental y geométrica"
    },
    {
      sala: 1, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Arqueología", titulo: "Sonso, el período tardío",
      foto: "PENDIENTE",
      desc: "El período Sonso (1200–1600 d.C.) corresponde a los grupos indígenas que los españoles encontraron a su llegada. Su orfebrería es más sencilla que la Yotoco, pero conservan una rica tradición cerámica y textil.",
      det: "<span>Período:</span> Sonso (1200–1600 d.C.)<br><span>Contacto:</span> presente a la llegada española"
    },
    {
      sala: 1, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Arqueología", titulo: "Una secuencia de casi 3.000 años",
      foto: "PENDIENTE",
      desc: "Entre Ilama, Yotoco y Sonso, la región Calima ofrece una de las secuencias culturales mejor documentadas de Colombia, mostrando cómo evolucionaron las técnicas de cerámica y orfebrería a lo largo de casi 3.000 años.",
      det: "<span>Secuencia:</span> Ilama → Yotoco → Sonso<br><span>Duración total:</span> cerca de 3.000 años"
    },

    // ── SALA 3: Orfebrería monumental ────────────────────────────────────
    {
      sala: 2, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Orfebrería", titulo: "Pectorales de gran formato",
      foto: "PENDIENTE",
      desc: "Los orfebres del período Yotoco crearon algunos de los pectorales de oro más grandes de la América precolombina, láminas martilladas con diseños geométricos que cubrían buena parte del pecho de sus portadores.",
      det: "<span>Objeto:</span> pectorales de gran formato<br><span>Técnica:</span> laminado y martillado"
    },
    {
      sala: 2, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Orfebrería", titulo: "Máscaras funerarias de oro",
      foto: "PENDIENTE",
      desc: "Entre las piezas más impactantes de la orfebrería calima están las máscaras funerarias de oro laminado, colocadas sobre el rostro de los difuntos de mayor rango como parte del ritual de entierro.",
      det: "<span>Objeto:</span> máscara funeraria<br><span>Material:</span> oro laminado<br><span>Uso:</span> ritual funerario"
    },
    {
      sala: 2, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Orfebrería", titulo: "Narigueras de formas geométricas",
      foto: "PENDIENTE",
      desc: "Las narigueras calima Yotoco destacan por sus formas geométricas audaces, en ocasiones de gran tamaño, que combinaban valor estético con la exhibición de estatus social de quien las portaba.",
      det: "<span>Objeto:</span> narigueras<br><span>Estilo:</span> formas geométricas de gran tamaño"
    },
    {
      sala: 2, lado: "R2", forma: "esfera", escala: [0.65],
      tag: "Orfebrería", titulo: "Técnica del laminado y repujado",
      foto: "PENDIENTE",
      desc: "A diferencia de otras culturas que preferían la cera perdida, los orfebres calima se especializaron en laminar el oro en hojas muy delgadas y trabajarlas con la técnica del repujado, golpeando desde el reverso para crear relieve.",
      det: "<span>Técnica principal:</span> laminado y repujado<br><span>Resultado:</span> piezas ligeras de gran superficie"
    },

    // ── SALA 4: Cerámica Calima ──────────────────────────────────────────
    {
      sala: 3, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Cerámica", titulo: "Figuras antropomorfas Ilama",
      foto: "PENDIENTE",
      desc: "La cerámica del período Ilama incluye figuras humanas de cuerpo sencillo y cabeza destacada, muchas veces asociadas a contextos funerarios y usadas como ofrendas para acompañar a los muertos.",
      det: "<span>Período:</span> Ilama<br><span>Tipo:</span> figuras antropomorfas funerarias"
    },
    {
      sala: 3, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Cerámica", titulo: "Vasijas decoradas Sonso",
      foto: "PENDIENTE",
      desc: "En el período Sonso, la cerámica se enriqueció con decoraciones pintadas en rojo y negro sobre fondo crema, con motivos geométricos que reflejan una tradición artesanal consolidada.",
      det: "<span>Período:</span> Sonso<br><span>Decoración:</span> pintura roja y negra sobre crema"
    },
    {
      sala: 3, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Cerámica", titulo: "Recipientes para chicha",
      foto: "PENDIENTE",
      desc: "Grandes vasijas de cerámica servían para preparar y almacenar chicha de maíz, bebida central en las celebraciones y rituales de las comunidades Calima a lo largo de sus distintos períodos.",
      det: "<span>Uso:</span> preparación y almacenamiento de chicha<br><span>Materia prima:</span> maíz fermentado"
    },
    {
      sala: 3, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Cerámica", titulo: "Ofrendas funerarias",
      foto: "PENDIENTE",
      desc: "Las tumbas Calima solían incluir conjuntos de vasijas de cerámica junto a piezas de orfebrería, evidencia de la importancia que estas comunidades daban al acompañamiento material de sus difuntos en el más allá.",
      det: "<span>Contexto:</span> tumbas<br><span>Ofrendas:</span> cerámica y orfebrería combinadas"
    },

    // ── SALA 5: Territorio y vida cotidiana ──────────────────────────────
    {
      sala: 4, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Territorio", titulo: "El valle del río Calima",
      foto: "PENDIENTE",
      desc: "El río Calima, afluente del río San Juan en el Pacífico colombiano, da nombre a la región y proporcionó a sus habitantes tierras fértiles, agua abundante y acceso a distintos pisos térmicos.",
      det: "<span>Río:</span> Calima (cuenca del San Juan)<br><span>Recursos:</span> tierras fértiles, agua, variedad climática"
    },
    {
      sala: 4, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Vida cotidiana", titulo: "Agricultura de maíz y frijol",
      foto: "PENDIENTE",
      desc: "La base alimentaria de las comunidades Calima era el cultivo de maíz, frijol y yuca, complementado con la caza y la pesca en los ríos y quebradas de la región.",
      det: "<span>Cultivos principales:</span> maíz, frijol, yuca<br><span>Complemento:</span> caza y pesca"
    },
    {
      sala: 4, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Vida cotidiana", titulo: "Comercio con el Pacífico y los Andes",
      foto: "PENDIENTE",
      desc: "Gracias a su posición entre la costa Pacífica y la cordillera Occidental, las comunidades Calima participaron en redes de intercambio que conectaban productos marinos, orfebrería y bienes agrícolas de distintas regiones.",
      det: "<span>Posición:</span> entre Pacífico y cordillera Occidental<br><span>Rol:</span> nodo de intercambio regional"
    },
    {
      sala: 4, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Legado", titulo: "Calima en el Valle del Cauca de hoy",
      foto: "PENDIENTE",
      desc: "El nombre Calima permanece en la geografía y la identidad del Valle del Cauca —en el río, el municipio de Calima-Darién y el embalse homónimo— como recordatorio de una de las tradiciones orfebres más importantes de Colombia.",
      det: "<span>Huella actual:</span> río, municipio y embalse Calima<br><span>Legado:</span> tradición orfebre reconocida"
    },
];
