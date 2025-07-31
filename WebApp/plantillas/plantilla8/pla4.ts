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

// Función principal
async function generarPDF() {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "mm", "a4");

    // Colores
    const verde = "#4F8A72";
    const grisClaro = "#F3F5F4";

    // Cargar imágenes
    const perfil = await imgBase64("img/latino.jpg");
    const telefono = await imgBase64("img/telefono.png");
    const correo = await imgBase64("img/correo.png");
    const ubicacion = await imgBase64("img/ubicacion.png");
    const internet = await imgBase64("img/internet.png");

    dibujarFondo(doc, grisClaro);
    dibujarPerfil(doc, perfil, 15, 15);
    dibujarNombre(doc, 90, 30, verde);
    dibujarSobreMi(doc, 10, 75);
    dibujarHabilidades(doc, 10, 102);
    dibujarIdiomas(doc, 10, 150, verde);
    dibujarContacto(doc, 10, 175, { telefono, correo, ubicacion, internet });

    dibujarExperiencia(doc, 80, 70, verde);
    dibujarEducacion(doc, 80, 160, verde);

    doc.save("plantilla4.pdf");

  } catch (error) {
    alert("Ocurrió un error al generar el PDF. Revisa la consola.");
    console.error("Error al generar PDF:", error);
  }
}

// Funciones divididas por sección
function dibujarFondo(doc, color) {
  doc.setFillColor(color);
  doc.rect(0, 0, 80, 297, "F");
}

function dibujarPerfil(doc, img, x, y) {
  doc.addImage(img, "PNG", x, y, 50, 50);
}

function dibujarNombre(doc, x, y, color) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text("ENRIQUE", x, y);
  doc.text("GUTIERREZ", x, y + 10);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(color);
  doc.textWithLink("Nutricionista", x, y + 20, { url: "#" });

  doc.setTextColor(0, 0, 0);
  doc.text("32 años de edad", x, y + 28);
}

function dibujarSobreMi(doc, x, y) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("SOBRE MÍ", x, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Soy un nutricionista dedicado y apasionado. Tengo 6 años de experiencia en asesoramiento nutricional personalizado y educación alimentaria.", x, y + 5, { maxWidth: 60 });
}

function dibujarHabilidades(doc, x, y) {
  doc.setFont("helvetica", "bold");
  doc.text("HABILIDADES", x, y);

  const habilidades = [
    "Habilidades de escucha activa",
    "Trabajo en equipo",
    "Orientación al cliente",
    "Solución de problemas",
    "Toma de decisiones informadas",
    "Adaptabilidad"
  ];

  doc.setFont("helvetica", "normal");
  habilidades.forEach((hab, i) => {
    doc.circle(x, y + 6 + i * 6, 0.7, "F");
    doc.text(hab, x + 3, y + 7 + i * 6);
  });
}

function dibujarIdiomas(doc, x, y, color) {
  doc.setFont("helvetica", "bold");
  doc.text("IDIOMAS", x, y);
  doc.setFont("helvetica", "normal");
  doc.text("Inglés intermedio", x, y + 7);
  doc.setFillColor(color);
  doc.rect(x, y + 10, 40, 4, "F");
  doc.setFillColor("#ddd");
  doc.rect(x + 40, y + 10, 20, 4, "F");
}

function dibujarContacto(doc, x, y, icons) {
  doc.setFont("helvetica", "bold");
  doc.text("CONTACTO", x, y);

  const contactos = [
    { icon: icons.telefono, text: "1234-5678" },
    { icon: icons.correo, text: "hola@sitioincreible.com" },
    { icon: icons.internet, text: "www.sitioincreible.com" },
    { icon: icons.ubicacion, text: "Calle Cualquiera 123,\nCualquier Lugar" }
  ];

  let offsetY = y + 7;
  for (const c of contactos) {
    doc.addImage(c.icon, "PNG", x, offsetY, 5, 5);
    doc.text(c.text, x + 7, offsetY + 4);
    offsetY += c.text.includes("\n") ? 12 : 8;
  }
}

function dibujarExperiencia(doc, x, y, color) {
  doc.setFillColor(color);
  doc.rect(x, y, 130, 10, "F");
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("EXPERIENCIA LABORAL", x + 10, y + 7);
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);

  let currentY = y + 20;

  doc.setFont("helvetica", "bold");
  doc.text("2019 - Presente", x + 2, currentY);
  doc.text("NUTRICIONISTA", x + 40, currentY);
  doc.setFont("helvetica", "normal");
  doc.text("Centro de Salud Borcelle", x + 29, currentY + 6);
  doc.circle(x + 29, currentY + 10, 0.7, "F");
  doc.text("Planes de alimentación personalizados.", x + 32, currentY + 11);
  doc.circle(x + 29, currentY + 15, 0.7, "F");
  doc.text("Asesoramiento nutricional.", x + 32, currentY + 16);
  doc.circle(x + 29, currentY + 20, 0.7, "F");
  doc.text("Planes de tratamiento integrados.", x + 32, currentY + 21);

  currentY += 35;

  doc.setFont("helvetica", "bold");
  doc.text("2016 - 2017", x + 2, currentY);
  doc.text("NUTRICIONISTA", x + 40, currentY);
  doc.setFont("helvetica", "normal");
  doc.text("Ensigna", x + 29, currentY + 6);
  doc.circle(x + 29, currentY + 10, 0.7, "F");
  doc.text("Evaluación dietética.", x + 32, currentY + 11);
  doc.circle(x + 29, currentY + 15, 0.7, "F");
  doc.text("Diseño de planes de alimentación personalizados.", x + 32, currentY + 16);
  doc.circle(x + 29, currentY + 20, 0.7, "F");
  doc.text("Asesoramiento nutricional.", x + 32, currentY + 21);
}

function dibujarEducacion(doc, x, y, color) {
  doc.setFillColor(color);
  doc.rect(x, y, 130, 10, "F");
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("EDUCACIÓN", x + 10, y + 7);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);

  let currentY = y + 20;

  doc.setFont("helvetica", "bold");
  doc.text("2010 - 2015", x + 2, currentY);
  doc.text("LICENCIATURA EN NUTRICIÓN", x + 25, currentY);
  doc.setFont("helvetica", "normal");
  doc.text("Universidad La Sierra", x + 25, currentY + 6);

  currentY += 15;

  doc.setFont("helvetica", "bold");
  doc.text("2004 - 2009", x + 2, currentY);
  doc.text("NIVEL SECUNDARIO", x + 25, currentY);
  doc.setFont("helvetica", "normal");
  doc.text("Colegio Verde Bendito", x + 25, currentY + 6);
}
