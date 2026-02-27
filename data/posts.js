/**
 * ============================================================
 *  REDIM — BASE DE ARTÍCULOS
 *
 *  ✏️  ESTE ES EL ÚNICO ARCHIVO QUE NECESITÁS EDITAR
 *      para agregar, modificar o quitar publicaciones.
 *      Los cambios se reflejan automáticamente en:
 *        → index.html      (home: destacado + 3 recientes)
 *        → articulos.html  (grilla completa con filtros)
 *
 * ─────────────────────────────────────────────────────────────
 *  CÓMO AGREGAR UN ARTÍCULO NUEVO:
 *  1. Copiá el bloque de ejemplo de abajo.
 *  2. Pegalo al PRINCIPIO del array (antes del id:1).
 *  3. Completá los campos y guardá.
 *  ¡Listo! Aparece en todo el sitio automáticamente.
 *
 * ─────────────────────────────────────────────────────────────
 *  CAMPOS OBLIGATORIOS:
 *
 *  id        → Número único. Usar el siguiente al último (11, 12…)
 *
 *  titulo    → Título completo del artículo.
 *
 *  fecha     → Formato AAAA-MM-DD. Usado para ordenar por fecha.
 *              Ejemplo: "2026-03-15"
 *
 *  fechaTexto→ Fecha en texto legible para mostrar en pantalla.
 *              Ejemplo: "15 de marzo de 2026"
 *
 *  categoria → Una de las siguientes (en minúsculas, sin tilde):
 *              derechos | mujeres | educacion | infancias |
 *              comunidad | salud | recursos
 *
 *  imagen    → Ruta a la imagen del artículo.
 *              Si la imagen está en la carpeta img/:
 *                "img/nombre-imagen.jpg"
 *              Si usás una URL externa:
 *                "https://..."
 *
 *  extracto  → Descripción corta (2-3 oraciones).
 *              Se muestra en la tarjeta y en el buscador.
 *
 *  tiempo    → Tiempo estimado de lectura. Ejemplo: "5 min"
 *
 *  destacado → true  = aparece como tarjeta grande en la home.
 *              false = aparece como tarjeta normal.
 *              ⚠️  Solo un artículo debería tener true a la vez.
 *              Para cambiar el destacado: poné false en el actual
 *              y true en el nuevo.
 *
 *  url       → Enlace al artículo completo.
 *              Mientras no tengas página individual: "#"
 *              Cuando tengas el archivo: "articulo-nombre.html"
 *
 * ─────────────────────────────────────────────────────────────
 *  EJEMPLO PARA COPIAR Y PEGAR:
 *
 *  {
 *    id: 11,
 *    titulo: "Título del nuevo artículo",
 *    fecha: "2026-03-15",
 *    fechaTexto: "15 de marzo de 2026",
 *    categoria: "educacion",
 *    imagen: "img/nombre-imagen.jpg",
 *    extracto: "Descripción breve del artículo en 2 o 3 oraciones.",
 *    tiempo: "5 min",
 *    destacado: false,
 *    url: "#"
 *  },
 *
 * ============================================================
 */

const ARTICULOS = [

  {
    id: 1,
    titulo: "El valor del acompañamiento: caminando juntas hacia la justicia",
    fecha: "2026-02-24",
    fechaTexto: "24 de febrero de 2026",
    categoria: "derechos",
    imagen: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80",
    extracto: "Nuestra labor va más allá de la asesoría técnica; se trata de crear un puente de confianza donde cada persona se sienta verdaderamente escuchada y sostenida. El proceso de denuncia o recuperación es un camino complejo, por lo que nos enfocamos en brindar una red de apoyo emocional.",
    tiempo: "5 min",
    destacado: true,
    url: "#"
  },

  {
    id: 2,
    titulo: "Herramientas legales que toda mujer debería conocer",
    fecha: "2026-02-18",
    fechaTexto: "18 de febrero de 2026",
    categoria: "mujeres",
    imagen: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80",
    extracto: "Un recorrido claro y accesible por los recursos disponibles para proteger tus derechos y los de tu familia.",
    tiempo: "4 min",
    destacado: false,
    url: "#"
  },

  {
    id: 3,
    titulo: "Educación como acto de resistencia y esperanza",
    fecha: "2026-02-10",
    fechaTexto: "10 de febrero de 2026",
    categoria: "educacion",
    imagen: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=500&q=80",
    extracto: "Cuando educamos, transformamos. Descubrí cómo comunidades enteras están cambiando su realidad a través del conocimiento.",
    tiempo: "6 min",
    destacado: false,
    url: "#"
  },

  {
    id: 4,
    titulo: "Redes de apoyo: la fuerza de lo colectivo",
    fecha: "2026-02-03",
    fechaTexto: "3 de febrero de 2026",
    categoria: "comunidad",
    imagen: "https://images.unsplash.com/photo-1556484687-30636164638b?w=500&q=80",
    extracto: "Las comunidades organizadas son el motor de los cambios más profundos. Conocé historias inspiradoras de mujeres que encontraron su fuerza juntas.",
    tiempo: "5 min",
    destacado: false,
    url: "#"
  },

  {
    id: 5,
    titulo: "Cómo hablar con niños sobre sus derechos",
    fecha: "2026-01-28",
    fechaTexto: "28 de enero de 2026",
    categoria: "infancias",
    imagen: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&q=80",
    extracto: "Un lenguaje claro, cercano y empoderador puede marcar la diferencia. Aquí compartimos recursos y consejos prácticos para familias.",
    tiempo: "4 min",
    destacado: false,
    url: "#"
  },

  {
    id: 6,
    titulo: "Salud mental y violencia: rompiendo el silencio",
    fecha: "2026-01-20",
    fechaTexto: "20 de enero de 2026",
    categoria: "salud",
    imagen: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&q=80",
    extracto: "El impacto psicológico de la violencia es profundo y duradero. Hablamos con especialistas sobre cómo acompañar procesos de sanación.",
    tiempo: "7 min",
    destacado: false,
    url: "#"
  },

  {
    id: 7,
    titulo: "Guía práctica: primera denuncia paso a paso",
    fecha: "2026-01-14",
    fechaTexto: "14 de enero de 2026",
    categoria: "recursos",
    imagen: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&q=80",
    extracto: "Sabemos que el primer paso puede ser el más difícil. Esta guía te acompaña en cada etapa del proceso con lenguaje claro y sin tecnicismos.",
    tiempo: "8 min",
    destacado: false,
    url: "#"
  },

  {
    id: 8,
    titulo: "La Convención sobre los Derechos del Niño: qué dice y cómo aplicarla",
    fecha: "2026-01-07",
    fechaTexto: "7 de enero de 2026",
    categoria: "derechos",
    imagen: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&q=80",
    extracto: "Un análisis accesible del instrumento internacional más importante para la protección de la infancia y su aplicación en nuestra realidad.",
    tiempo: "6 min",
    destacado: false,
    url: "#"
  },

  {
    id: 9,
    titulo: "Talleres comunitarios: aprender juntas para crecer juntas",
    fecha: "2025-12-20",
    fechaTexto: "20 de diciembre de 2025",
    categoria: "educacion",
    imagen: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80",
    extracto: "Crónica de nuestros talleres itinerantes a lo largo del año: los aprendizajes, los desafíos y las historias que nos llenan de esperanza.",
    tiempo: "5 min",
    destacado: false,
    url: "#"
  },

  {
    id: 10,
    titulo: "Voces que inspiran: mujeres que cambiaron su historia",
    fecha: "2025-12-10",
    fechaTexto: "10 de diciembre de 2025",
    categoria: "mujeres",
    imagen: "https://images.unsplash.com/photo-1484863137850-59afcfe05386?w=500&q=80",
    extracto: "Testimonios de mujeres que encontraron en REDIM un punto de apoyo y hoy son ellas quienes sostienen a otras.",
    tiempo: "6 min",
    destacado: false,
    url: "#"
  }

];
