document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("btnGenerar");
  boton.addEventListener("click", generarPDF);
});

async function imgBase64(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

async function generarPDF() {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "mm", "a4");

    // Cargar imágenes
    const personaImg = await imgBase64("img/persona.jpg");
    const interImg = await imgBase64("img/internet.png");
    const correoImg = await imgBase64("img/correo.png");
    const teleImg = await imgBase64("img/telefono.png");
    const ubiImg = await imgBase64("img/ubicacion.png");

    // Dibujar secciones
    dibujarFondo(doc);
    dibujarFotoYEncabezado(doc, personaImg);
    dibujarContacto(doc, teleImg, correoImg, interImg, ubiImg, 15, 90);
    dibujarLogros(doc, 15, 155);
    dibujarHerramientas(doc, 15, 200);
    dibujarPerfil(doc, 80, 65);
    dibujarExperiencia(doc, 80, 100);
    dibujarFormacion(doc, 80, 160);
    dibujarIdiomas(doc, 80, 200);

    doc.save("plantilla3.pdf");

  } catch (error) {
    alert("Ocurrió un error al generar el PDF. Revisa la consola.");
    console.error("Error al generar PDF:", error);
  }
}

// === Funciones por sección ===

function dibujarFondo(doc) {
  doc.setFillColor(240, 240, 240); // Gris claro lado izquierdo
  doc.rect(0, 0, 78, 297, "F");

  doc.setFillColor(27, 38, 59); // Azul encabezado
  doc.rect(70, 0, 140, 45, "F");
}

function dibujarFotoYEncabezado(doc, img) {
  doc.addImage(img, "PNG", 10, 15, 55, 65);

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.text("Manuel Navarro", 75, 35, { maxWidth: 120 });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(20);
  doc.text("CONTADOR", 75, 42, { maxWidth: 120 });
}

function dibujarContacto(doc, tel, correo, web, ubi, x, y) {
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("CONTACTO", x, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);

  doc.addImage(tel, "PNG", x, y+3, 5, 5);
  doc.text("449-208-4865", x+8, y+8, {maxWidth: 50});

  doc.addImage(correo, "PNG", 15, y+11, 5, 5);
  doc.text("manuel@gmail.com", x+8, y+16, {maxWidth: 50});

  doc.addImage(web, "PNG", x, y+19, 5, 5);
  doc.text("www.unsitogenial.es", x+8, y+24, {maxWidth: 50});

  doc.addImage(ubi, "PNG", x, y+27, 5, 5);
  doc.text("Calle cualquiera 123, Cualquier lugar, CP:12345", x+8, y+32, {maxWidth: 40});
}

function dibujarLogros(doc, x, y) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("LOGROS", x, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.text("- Carnet de conducir", x, y+7);
  doc.text("- Coche propio", x, y+13);
  doc.text("- Disponibilidad para viajar", x, y+19);
}

function dibujarHerramientas(doc, x, y) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("HERRAMIENTAS", x, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.text("- CONTABILIDAD", x, y+7);
  doc.text("- ASESORÍA FINANCIERA", x, y+13);
  doc.text("- HOJAS DE CÁLCULO", x, y+19);
}

function dibujarPerfil(doc, x, y) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("MI PERFIL", x, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text("Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
           "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", x, y+7, {maxWidth: 120});
}

function dibujarExperiencia(doc, x, y) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("EXPERIENCIA", x, y);

  doc.setFontSize(14);
  doc.text("ASESOR FISCAL", x, y+6);
  doc.setFont("helvetica", "italic");
  doc.text("Soto y Ochoa (Enero 2012 – Julio 2021)", x, y+12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.text("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", x, y+18, {maxWidth: 120});

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("ASESOR FINANCIERO", x, y+26);
  doc.setFont("helvetica", "italic");
  doc.text("Borcelle (Enero 2012 – Julio 2021)", x, y+32);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.text("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", x, y+38, {maxWidth: 120});
}

function dibujarFormacion(doc, x, y) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("FORMACIÓN", x, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text("UNIVERSIDAD BORCELLE", x, y+6);
  doc.text("(2003 - 2008)", x, y+12);
  doc.text("Doble grado en Derecho y Economía.", x, y+18, {maxWidth: 120});
}

function dibujarIdiomas(doc, x, y) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("IDIOMAS", x, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text("ESPAÑOL     Nativo", x, y+6);
  doc.text("INGLÉS      Nivel Alto", x, y+12);
  doc.text("ITALIANO    Nivel Bajo", x, y+18);
}
