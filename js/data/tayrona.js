// ============================================================
//  tayrona.js — Contenido de la sala Tayrona
//  Mismo esquema que js/data/guane.js. Campos `foto` marcados
//  PENDIENTE: falta conseguir/subir imagen a img/tayrona/.
// ============================================================

export const salasTayrona = [
    { nombre: "¿Quiénes eran los Tayrona?",     color: 0x1E5C5C },
    { nombre: "Ciudades de piedra",              color: 0x184A4A },
    { nombre: "Orfebrería sagrada",               color: 0x184A4A },
    { nombre: "Cerámica y vida cotidiana",        color: 0x184A4A },
    { nombre: "Cosmovisión y legado Kogui-Wiwa",  color: 0x184A4A },
];

export const piezasTayrona = [
    // ── SALA 1: ¿Quiénes eran los Tayrona? ───────────────────────────────
    {
      sala: 0, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Historia", titulo: "¿Quiénes eran los Tayrona?",
      foto: "https://i.imgur.com/cLdY6cx.jpeg",
      desc: "Los Tayrona fueron un pueblo indígena que habitó las vertientes norte y occidental de la Sierra Nevada de Santa Marta, en el Caribe colombiano, entre los años 900 y 1600 d.C. Desarrollaron una de las sociedades más complejas de la Colombia prehispánica.",
      det: "<span>Período:</span> 900–1600 d.C.<br><span>Territorio:</span> Sierra Nevada de Santa Marta<br><span>Departamento:</span> Magdalena"
    },
    {
      sala: 0, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Historia", titulo: "El período Nahuange, sus antecesores",
      foto: "https://i.imgur.com/wFsFhGJ.jpeg",
      desc: "Antes de los Tayrona, entre el 200 y el 900 d.C., las costas de la Sierra Nevada estuvieron habitadas por comunidades del período Nahuange: orfebres, agricultores y pescadores que sentaron las bases culturales de la región.",
      det: "<span>Período Nahuange:</span> 200–900 d.C.<br><span>Actividades:</span> orfebrería, agricultura, pesca"
    },
    {
      sala: 0, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Sociedad", titulo: "Una sociedad jerarquizada",
      foto: "https://i.imgur.com/N049GXE.jpeg",
      desc: "La sociedad tayrona estaba dividida entre caciques, sacerdotes (mamas), orfebres, agricultores y comerciantes. Los caciques y sacerdotes concentraban el poder político y espiritual, y se distinguían por sus ornamentos de oro.",
      det: "<span>Jerarquía:</span> caciques y mamas (sacerdotes) → orfebres y comerciantes → agricultores<br><span>Poder:</span> político y espiritual combinado"
    },
    {
      sala: 0, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Historia", titulo: "El fin del período Tayrona",
      foto: "https://i.imgur.com/QinwVSt.jpeg",
      desc: "Tras la llegada de los españoles a comienzos del siglo XVI, los Tayrona resistieron por décadas la conquista, hasta que sus ciudades fueron finalmente abandonadas o destruidas a comienzos del siglo XVII.",
      det: "<span>Llegada española:</span> inicios del siglo XVI<br><span>Fin del período:</span> inicios del siglo XVII"
    },

    // ── SALA 2: Ciudades de piedra ───────────────────────────────────────
    {
      sala: 1, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Arquitectura", titulo: "Terrazas y caminos empedrados",
      foto: "https://i.imgur.com/JAPqLFG.jpeg",
      desc: "En los valles boscosos de la Sierra Nevada, los Tayrona construyeron ciudades sobre cimientos de piedra, con caminos enlozados y sistemas de drenaje. En terrazas escalonadas de cultivo sembraban maíz, yuca y aguacate.",
      det: "<span>Infraestructura:</span> terrazas, caminos de piedra, drenajes<br><span>Cultivos:</span> maíz, yuca, aguacate"
    },
    {
      sala: 1, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Arquitectura", titulo: "La Ciudad Perdida",
      foto: "https://i.imgur.com/77uO0dP.jpeg",
      desc: "Teyuna, conocida hoy como la Ciudad Perdida, fue uno de los principales centros urbanos tayrona, con más de 200 terrazas de piedra conectadas por escalinatas. Se calcula que fue habitada entre los siglos VIII y XVI.",
      det: "<span>Nombre original:</span> Teyuna<br><span>Terrazas:</span> más de 200<br><span>Habitada:</span> siglo VIII al XVI"
    },
    {
      sala: 1, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Arquitectura", titulo: "Ingeniería hidráulica",
      foto: "https://i.imgur.com/pny2tjO.jpeg",
      desc: "Los Tayrona diseñaron sofisticados sistemas de canales y drenajes para controlar el agua de las quebradas de la sierra, evitando la erosión y garantizando el suministro para sus cultivos y viviendas.",
      det: "<span>Innovación:</span> canales y drenajes<br><span>Función:</span> control del agua y prevención de erosión"
    },
    {
      sala: 1, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Arquitectura", titulo: "Red de ciudades conectadas",
      foto: "https://i.imgur.com/qpTJ02Y.jpeg",
      desc: "Las ciudades tayrona no estaban aisladas: una extensa red de caminos de piedra conectaba los asentamientos de tierra caliente en la costa con los poblados de tierra fría en las partes altas de la sierra.",
      det: "<span>Red vial:</span> caminos de piedra intersierra<br><span>Conexión:</span> costa – tierras altas"
    },

    // ── SALA 3: Orfebrería sagrada ───────────────────────────────────────
    {
      sala: 2, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Orfebrería", titulo: "El hombre murciélago",
      foto: "https://i.imgur.com/sNtjvmT.jpeg",
      desc: "Una de las piezas más emblemáticas de la orfebrería tayrona representa a un cacique o sacerdote con rasgos de murciélago. Este animal era símbolo de poder, y solo las élites podían portar adornos con su figura.",
      det: "<span>Figura:</span> hombre murciélago<br><span>Simbolismo:</span> poder y estatus élite"
    },
    {
      sala: 2, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Orfebrería", titulo: "Placas aladas",
      foto: "https://i.imgur.com/7bxnV1B.jpeg",
      desc: "Las placas aladas, con forma de aves de alas desplegadas, son otro símbolo característico de la orfebrería tayrona y nahuange, asociadas al vuelo nocturno y al viaje espiritual entre mundos.",
      det: "<span>Objeto:</span> placas aladas<br><span>Simbolismo:</span> vuelo nocturno, viaje espiritual"
    },
    {
      sala: 2, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Orfebrería", titulo: "Pectorales y narigueras en tumbaga",
      foto: "https://i.imgur.com/Blb1aQ4.jpeg",
      desc: "Los orfebres nahuange y tayrona martillaban pectorales y narigueras en tumbaga, una aleación de oro y cobre de superficie pulida y tonos rojizos, decorados con puntos, círculos y serpientes de dos cabezas.",
      det: "<span>Aleación:</span> tumbaga (oro + cobre)<br><span>Motivos:</span> puntos, círculos, serpientes bicéfalas"
    },
    {
      sala: 2, lado: "R2", forma: "esfera", escala: [0.65],
      tag: "Orfebrería", titulo: "El poporo tayrona",
      foto: "https://i.imgur.com/nS2eiUG.jpeg",
      desc: "Como en otras culturas del norte de Colombia, el poporo era un objeto ritual de gran valor entre los Tayrona: guardaba cal usada en el mambeo de hoja de coca y era símbolo de la vida adulta y el estatus social del hombre.",
      det: "<span>Objeto:</span> poporo<br><span>Uso:</span> ritual de mambeo, símbolo de estatus"
    },

    // ── SALA 4: Cerámica y vida cotidiana ────────────────────────────────
    {
      sala: 3, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Cerámica", titulo: "Vasijas antropomorfas",
      foto: "https://i.imgur.com/qtbmpiW.jpeg",
      desc: "La cerámica tayrona incluía vasijas con forma humana o animal, usadas tanto en la vida diaria como en contextos funerarios y ceremoniales, reflejando su cosmovisión en objetos de uso cotidiano.",
      det: "<span>Tipo:</span> vasijas antropomorfas y zoomorfas<br><span>Uso:</span> doméstico, funerario, ceremonial"
    },
    {
      sala: 3, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Vida cotidiana", titulo: "Pesca y agricultura",
      foto: "https://i.imgur.com/2xswa0P.jpeg",
      desc: "La economía tayrona combinaba la pesca en el mar Caribe con una agricultura intensiva de terrazas en la sierra, lo que les permitió sostener poblaciones numerosas en un territorio de fuertes desniveles.",
      det: "<span>Actividades:</span> pesca marina, agricultura de terrazas<br><span>Resultado:</span> alta densidad poblacional"
    },
    {
      sala: 3, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Textiles", titulo: "Mochilas y tejidos de fique",
      foto: "https://i.imgur.com/vgKleS7.jpeg",
      desc: "Los Tayrona elaboraban mochilas y tejidos con fibra de fique, una tradición textil que continúa hoy entre sus descendientes culturales, los pueblos Kogui, Wiwa, Arhuaco y Kankuamo de la Sierra Nevada.",
      det: "<span>Material:</span> fibra de fique<br><span>Continuidad:</span> Kogui, Wiwa, Arhuaco, Kankuamo"
    },
    {
      sala: 3, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Vida cotidiana", titulo: "El intercambio con el Caribe",
      foto: "https://i.imgur.com/M3ZuS4I.jpeg",
      desc: "Por su ubicación costera, los Tayrona intercambiaban productos con otros pueblos del Caribe, incluyendo caracoles marinos, sal y objetos de concha, ampliando su red comercial más allá de la sierra.",
      det: "<span>Bienes de intercambio:</span> caracoles marinos, sal, concha<br><span>Alcance:</span> costa Caribe colombiana"
    },

    // ── SALA 5: Cosmovisión y legado Kogui-Wiwa ──────────────────────────
    {
      sala: 4, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Cosmovisión", titulo: "La Sierra Nevada, corazón del mundo",
      foto: "https://i.imgur.com/aSURbKQ.jpeg",
      desc: "Para los Tayrona y sus descendientes, la Sierra Nevada de Santa Marta es el 'corazón del mundo', un territorio sagrado organizado en 'Línea Negra' que conecta lugares espirituales entre la costa y las cumbres nevadas.",
      det: "<span>Concepto:</span> corazón del mundo<br><span>Territorio sagrado:</span> Línea Negra"
    },
    {
      sala: 4, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Cosmovisión", titulo: "Los mamas, guardianes espirituales",
      foto: "https://i.imgur.com/xdLftoQ.jpeg",
      desc: "Los mamas eran los sacerdotes y sabios tayrona, formados desde la infancia para interpretar el mundo espiritual y guiar a la comunidad. Su rol continúa hoy entre los pueblos Kogui y Arhuaco.",
      det: "<span>Rol:</span> sacerdote y sabio<br><span>Formación:</span> desde la infancia<br><span>Continuidad:</span> pueblos Kogui y Arhuaco"
    },
    {
      sala: 4, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Legado", titulo: "Herederos vivos de los Tayrona",
      foto: "blob:https://imgur.com/f101d922-d20b-400c-8de5-2ad8c95fc5b7",
      desc: "Los pueblos Kogui, Wiwa, Arhuaco y Kankuamo, que hoy habitan la Sierra Nevada de Santa Marta, son considerados herederos directos de la cultura tayrona y mantienen vivas muchas de sus tradiciones.",
      det: "<span>Pueblos herederos:</span> Kogui, Wiwa, Arhuaco, Kankuamo<br><span>Territorio actual:</span> Sierra Nevada de Santa Marta"
    },
    {
      sala: 4, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Legado", titulo: "El Museo del Oro Tayrona",
      foto: "https://i.imgur.com/aqoiiwL.jpeg",
      desc: "En Santa Marta, el Museo del Oro Tayrona conserva más de 470 piezas prehispánicas —orfebrería, cerámica, hueso, concha y piedra— que permiten conocer de cerca la riqueza material de esta cultura.",
      det: "<span>Sede:</span> Casa de la Aduana, Santa Marta<br><span>Colección:</span> más de 470 piezas prehispánicas"
    },
];
