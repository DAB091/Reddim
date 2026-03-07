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
    id: 11,
    titulo: "El origen de REDIM: cuando la educación se convierte en acto de defensa",
    fecha: "2026-03-08",
    fechaTexto: "8 de marzo de 2026",
    categoria: "educacion",
    imagen: "img/origen-redim.jpg",
    extracto: "La historia de cómo una profesora de Añatuya decidió que acompañar a sus alumnas no podía terminar en la puerta del aula. El proceso fundacional de la Red Educativa en Defensa de la Infancia y la Mujer.",
    tiempo: "7 min",
    destacado: true,
    url: "origen-redim.html"
  },

];
