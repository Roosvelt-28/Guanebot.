// ============================================================
//  muisca.js — Contenido de la sala Muisca
//  Mismo esquema que js/data/guane.js. Campos `foto` marcados
//  PENDIENTE: falta conseguir/subir imagen a img/muisca/.
// ============================================================

export const salasMuisca = [
    { nombre: "¿Quiénes eran los Muiscas?", color: 0x2E5C4A },
    { nombre: "Economía y comercio",         color: 0x24493A },
    { nombre: "Orfebrería y El Dorado",      color: 0x8A6A1E },
    { nombre: "Textiles y cerámica",         color: 0x24493A },
    { nombre: "Religión y mitología",        color: 0x24493A },
];

export const piezasMuisca = [
    // ── SALA 1: ¿Quiénes eran los Muiscas? ────────────────────────────────
    {
      sala: 0, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Historia", titulo: "¿Quiénes eran los Muiscas?",
      foto: "https://i.imgur.com/qsFXow7.jpeg",
      desc: "Los Muiscas fueron un pueblo de habla chibcha que habitó el altiplano cundiboyacense y el sur de Santander. Hacia 1500 su economía se basaba en la agricultura, la explotación de sal y esmeraldas, y la producción de cerámica y orfebrería.",
      det: "<span>Período:</span> Siglo VI–XVI d.C.<br><span>Territorio:</span> Cundinamarca, Boyacá, sur de Santander<br><span>Lengua:</span> Muysccubun (familia chibcha)"
    },
    {
      sala: 0, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Historia", titulo: "Los Guane, primos de los Muiscas",
      foto: "https://i.imgur.com/JRtxVAl.jpeg",
      desc: "Los cronistas describen a los Guane como una confederación de la gran familia muisca, asentada en las hoyas de los ríos Suárez y Chicamocha y la mesa de Lérida, en Santander. Compartían raíz chibcha con Bacatá, Hunza, Tundama e Iraca.",
      det: "<span>Confederaciones hermanas:</span> Bacatá, Hunza, Tundama, Iraca, Guane<br><span>Familia lingüística:</span> Chibcha"
    },
    {
      sala: 0, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Sociedad", titulo: "Organización política",
      foto: "https://i.imgur.com/1CpSJJd.jpeg",
      desc: "Los Muiscas se organizaban en cacicazgos gobernados por un Zipa (con sede en Bacatá, hoy Bogotá) o un Zaque (con sede en Hunza, hoy Tunja). Ambos eran considerados descendientes del dios Sol, Sué, y compartían relaciones políticas y comerciales, aunque con rivalidades por el territorio.",
      det: "<span>Zipazgo:</span> Bacatá (Bogotá)<br><span>Zacazgo:</span> Hunza (Tunja)<br><span>Sucesión:</span> Matrilineal"
    },
    {
      sala: 0, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Sociedad", titulo: "Jerarquía social",
      foto: "https://i.imgur.com/AHsi722.jpeg",
      desc: "Debajo del Zipa o Zaque estaban los uzaques (nobles con poder militar), los sacerdotes o chyquy, los güechas (guerreros) y los artesanos, agricultores y comerciantes. La lengua muisca dejó de hablarse tras prohibirse en 1770; hoy solo sobrevive una variante emparentada entre los U'wa.",
      det: "<span>Jerarquía:</span> Zipa/Zaque → Uzaque → Chyquy → Güecha → Pueblo<br><span>Lengua viva relacionada:</span> U'wa (Tunebo)"
    },

    // ── SALA 2: Economía y comercio ───────────────────────────────────────
    {
      sala: 1, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Economía", titulo: "Agricultura en pisos térmicos",
      foto: "https://i.imgur.com/0xce2s0.jpeg",
      desc: "Cultivaban maíz, papa y quinua en parcelas repartidas por distintos climas del altiplano. Mantenían alojamiento temporal en cada zona para aprovechar, en momentos regulados del año, los productos propios de tierras frías y templadas.",
      det: "<span>Cultivos:</span> Maíz, papa, quinua<br><span>Técnica:</span> Uso escalonado de pisos térmicos"
    },
    {
      sala: 1, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Economía", titulo: "La sal, riqueza del altiplano",
      foto: "https://i.imgur.com/gbxFmxL.jpeg",
      desc: "La explotación de sal en minas como las de Zipaquirá y Nemocón fue una de las bases económicas muiscas. La sal se convirtió en un producto de intercambio tan valioso que llegaba, por trueque, hasta territorios lejanos.",
      det: "<span>Sitios:</span> Zipaquirá, Nemocón<br><span>Uso:</span> Consumo y moneda de intercambio"
    },
    {
      sala: 1, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Economía", titulo: "Esmeraldas",
      foto: "https://i.imgur.com/vx5EltT.jpeg",
      desc: "El territorio muisca incluía yacimientos de esmeraldas, una de las piedras más codiciadas de la región. Se usaban como ofrenda ritual y como bien de intercambio con pueblos vecinos.",
      det: "<span>Recurso:</span> Esmeraldas<br><span>Uso:</span> Ofrenda ritual y comercio"
    },
    {
      sala: 1, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Economía", titulo: "Trueque: sal y esmeraldas por oro",
      foto: "https://i.imgur.com/2Qqd3aV.jpeg",
      desc: "En el territorio muisca no había yacimientos de oro, así que lo obtenían por trueque con pueblos vecinos, cambiando esmeraldas, mantas de algodón y sal. Esa red de intercambio los convirtió en hábiles metalúrgicos aunque el metal no fuera propio.",
      det: "<span>Exportaban:</span> Sal, esmeraldas, mantas de algodón<br><span>Importaban:</span> Oro<br><span>Sistema:</span> Trueque"
    },

    // ── SALA 3: Orfebrería y El Dorado ────────────────────────────────────
    {
      sala: 2, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Orfebrería", titulo: "Los tunjos",
      foto: "https://i.imgur.com/cllehG6.jpeg",
      desc: "Los tunjos eran pequeñas figuras votivas de oro, plata o cobre, fundidas en una sola pieza con la técnica de la cera perdida. Representaban personas, animales o escenas, y se enterraban o depositaban en lagunas como ofrenda a los dioses.",
      det: "<span>Técnica:</span> Cera perdida<br><span>Materiales:</span> Oro, plata, cobre (tumbaga)<br><span>Función:</span> Ofrenda votiva"
    },
    {
      sala: 2, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Ritual", titulo: "La ceremonia de Guatavita",
      foto: "https://i.imgur.com/K3hKIiQ.jpeg",
      desc: "En la laguna de Guatavita se celebraba la investidura del nuevo cacique: cubría su cuerpo con polvo de oro y, junto a su pueblo, arrojaba oro y esmeraldas a las aguas como ofrenda. Este ritual dio origen a la leyenda española de El Dorado.",
      det: "<span>Lugar:</span> Laguna de Guatavita<br><span>Ritual:</span> Investidura del cacique<br><span>Vigente hasta:</span> 1536"
    },
    {
      sala: 2, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Orfebrería", titulo: "Fundición y tumbaga",
      foto: "https://i.imgur.com/48v9SIm.jpeg",
      desc: "Los orfebres muiscas aleaban oro con cobre para obtener tumbaga, un metal de tono bronceado más fácil de fundir. Con matrices de piedra podían producir piezas idénticas en serie, una técnica avanzada para la época.",
      det: "<span>Aleación:</span> Oro + cobre (tumbaga)<br><span>Herramienta:</span> Matrices de piedra"
    },
    {
      sala: 2, lado: "R2", forma: "esfera", escala: [0.65],
      tag: "Orfebrería", titulo: "La Balsa Muisca",
      foto: "https://i.imgur.com/7Bq043F.jpeg",
      desc: "Hallada en 1969 y hoy exhibida en el Museo del Oro de Bogotá, la Balsa Muisca representa la ceremonia de El Dorado: el cacique en el centro, rodeado de remeros y acompañantes, toda la escena fundida en una sola pieza de oro sin soldaduras.",
      det: "<span>Hallazgo:</span> 1969, laguna de Siecha/Guatavita (región)<br><span>Museo:</span> Museo del Oro, Bogotá<br><span>Técnica:</span> Cera perdida, pieza única"
    },

    // ── SALA 4: Textiles y cerámica ───────────────────────────────────────
    {
      sala: 3, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Textiles", titulo: "Mantas de algodón",
      foto: "https://i.imgur.com/fiTlgm0.jpeg",
      desc: "Las mantas muiscas eran finas y de colores variados, tejidas con motivos geométricos de posible carácter simbólico. Se regalaban en cada acontecimiento importante de la vida, y las mantas rojas se usaban como señal de luto.",
      det: "<span>Material:</span> Algodón (intercambiado por trueque)<br><span>Uso especial:</span> Manta roja = luto"
    },
    {
      sala: 3, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Mitología", titulo: "Bochica, el maestro tejedor",
      foto: "https://i.imgur.com/FplqOkv.jpeg",
      desc: "Según el mito, antes de Bochica los Muiscas se cubrían con planchas burdas de algodón en rama atadas con fique. Bochica les enseñó a hilar el algodón y tejer mantas, además de darles consejos morales, mientras recorría los pueblos de la Sabana.",
      det: "<span>Enseñanza:</span> Hilar y tejer algodón<br><span>Otros nombres:</span> Nemqueteba, Xué, Sadigua, Sugumonxe"
    },
    {
      sala: 3, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Cerámica", titulo: "Vasijas y cerámica doméstica",
      foto: "https://i.imgur.com/6DbSNIM.jpeg",
      desc: "La cerámica muisca cumplía funciones domésticas y rituales: ollas, cuencos y copas, muchas con decoración geométrica. Las piezas rituales, más finas, aparecían junto a momias y ofrendas en tumbas y santuarios.",
      det: "<span>Usos:</span> Doméstico y ritual<br><span>Decoración:</span> Motivos geométricos"
    },
    {
      sala: 3, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Ritual", titulo: "El poporo y la hoja de coca",
      foto: "https://i.imgur.com/ubBq4nH.jpeg",
      desc: "El poporo, un calabazo que guardaba cal, se usaba junto con hojas de coca en un ritual de mambeo asociado al estatus y a la vida ceremonial. Se han hallado poporos acompañando momias muiscas junto con tunjos y mochilas tejidas.",
      det: "<span>Objeto:</span> Poporo (calabazo con cal)<br><span>Uso:</span> Mambeo ritual de hoja de coca"
    },

    // ── SALA 5: Religión y mitología ──────────────────────────────────────
    {
      sala: 4, lado: "L", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Mitología", titulo: "Chiminigagua, el creador",
      foto: "https://i.imgur.com/MirLNAl.jpeg",
      desc: "Chiminigagua era el ser supremo de la religión muisca: un dios sin cuerpo, nunca invocado directamente, que gobernaba a través de dioses menores como Sué (el Sol), Chía (la Luna) y Chaquén (la fertilidad).",
      det: "<span>Rol:</span> Dios creador supremo<br><span>Hijos/dioses menores:</span> Sué, Chía, Chaquén"
    },
    {
      sala: 4, lado: "L2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Mitología", titulo: "El Salto del Tequendama",
      foto: "https://i.imgur.com/uUC3HaD.jpeg",
      desc: "La tradición cuenta que Chibchacum castigó a los Muiscas inundando la sabana, y que Bochica abrió una salida para las aguas golpeando una roca con su bastón de oro, creando el Salto del Tequendama.",
      det: "<span>Dios castigador:</span> Chibchacum (lluvia y trueno)<br><span>Dios salvador:</span> Bochica"
    },
    {
      sala: 4, lado: "R", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Religión", titulo: "Casas ceremoniales",
      foto: "https://i.imgur.com/scODLlU.jpeg",
      desc: "Los Muiscas distinguían varios tipos de casas ceremoniales: el cusmuy, ligado a la Luna; el chunsua, ligado al Sol; y la cuca, donde se formaban los futuros sacerdotes chyquy y a veces también las autoridades civiles.",
      det: "<span>Cusmuy:</span> Casa de la Luna<br><span>Chunsua:</span> Casa del Sol<br><span>Cuca:</span> Escuela de sacerdotes"
    },
    {
      sala: 4, lado: "R2", forma: "cuadro", escala: [4.29, 2.73],
      tag: "Religión", titulo: "Los chyquy, sacerdotes",
      foto: "https://i.imgur.com/cewbvyr.jpeg",
      desc: "Los chyquy eran los sacerdotes muiscas, guardianes de los santuarios donde se guardaban estatuas de dioses y antepasados vestidas con mantas de algodón pintadas. Portaban coronas de oro en forma de mitra en las ceremonias.",
      det: "<span>Rol:</span> Sacerdotes y guardianes de santuarios<br><span>Insignia:</span> Coronas de oro en forma de mitra"
    },
];
