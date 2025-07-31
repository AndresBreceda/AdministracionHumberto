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

    const verde = "#5d9795";
    const grisClaro = "#f0f0f0";
    const anchoPagina = 210;

    // Fondo columnas
    doc.setFillColor(grisClaro);
    doc.rect(0, 0, 70, 297, "F");

    doc.setFillColor(verde);
    doc.rect(70, 0, anchoPagina - 70, 50, "F");

    // Contenido
    await agregarFoto(doc, 5, 1, 60, 60);
    agregarEncabezado(doc, "ALAN LUNA", "Abogado Profesional", 80, 25);
    agregarPerfil(doc, 10, 75);
    await agregarContacto(doc, 10, 150);
    agregarEducacion(doc, 80, 60);
    agregarLenguajes(doc, 80, 106);
    agregarHabilidades(doc, 80, 140);
    agregarExperiencia(doc, 80, 195);

    doc.save("plantilla2.pdf");
  } catch (error) {
    alert("Ocurrió un error al generar el PDF. Revisa la consola.");
    console.error("Error al generar PDF:", error);
  }
}

// ================= FUNCIONES =================

async function agregarFoto(doc, x, y, w, h) {
  const foto = await imgBase64("img/crist.jpg");
  doc.addImage(foto, "PNG", x, y, w, h);
}

function agregarEncabezado(doc, nombre, titulo, x, y) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  doc.setTextColor(255, 255, 255);
  doc.text(nombre, x, y);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(23);
  doc.text(titulo, x, y + 7);
}

function agregarPerfil(doc, x, y) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(0);
  doc.text("PERFIL", x, y);

  const texto = "Soy una persona proactiva, organizada y responsable. Me destaco por el buen trabajo en equipo, toma de decisiones rápidas y manejo bajo presión.";
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(texto, x, y + 6, { maxWidth: 50 });
}

async function agregarContacto(doc, x, y) {
  const tel = await imgBase64("img/telefono.png");
  const correo = await imgBase64("img/correo.png");
  const red = await imgBase64("img/redSocial.png");
  const casa = await imgBase64("img/casa.png");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("CONTACTO", x, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  doc.addImage(tel, "PNG", x, y + 6, 5, 5);
  doc.text("1234 - 5678", x + 8, y + 10);

  doc.addImage(correo, "PNG", x, y + 16, 5, 5);
  doc.text("alanlu@gmail.com", x + 8, y + 20);

  doc.addImage(red, "PNG", x, y + 26, 5, 5);
  doc.text("facebook.com/alanlu", x + 8, y + 30);

  doc.addImage(casa, "PNG", x, y + 36, 5, 5);
  doc.text("Calle Cualquiera 123,\nCualquier Lugar", x + 8, y + 40);
}

function agregarSeccionTitulo(doc, titulo, x, y, color = "#5d9795") {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(color);
  doc.text(`> ${titulo.toUpperCase()}`, x, y);
  doc.setFontSize(14);
  doc.setTextColor("#444");
}

function agregarEducacion(doc, x, y) {
  agregarSeccionTitulo(doc, "Educación", x, y);
  y += 6;
  doc.setFont("helvetica", "bold");
  doc.text("Universidad Borcelle", x, y);
  doc.setFont("helvetica", "italic");
  doc.text("Lic. en Administración, 2018", x, y + 5);
  y += 12;
  doc.setFont("helvetica", "bold");
  doc.text("Colegio La Frida", x, y);
  doc.setFont("helvetica", "italic");
  doc.text("Bachiller Bienes y Servicios, 2012", x, y + 5);
}

function agregarLenguajes(doc, x, y) {
  agregarSeccionTitulo(doc, "Lenguajes", x, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text("Español Nativo", x, y);
  doc.text("Inglés Avanzado", x, y + 5);
}

function agregarHabilidades(doc, x, y) {
  agregarSeccionTitulo(doc, "Habilidades", x, y);
  const habilidades = [
    "Manejo de paquete informático",
    "Software de administración",
    "Software de diseño",
    "Redes sociales",
  ];
  y += 6;
  habilidades.forEach((hab) => {
    doc.circle(x - 2, y - 1.5, 1.5, "F");
    doc.text(hab, x + 3, y);
    y += 6;
  });
}

function agregarExperiencia(doc, x, y) {
  agregarSeccionTitulo(doc, "Experiencia", x, y);
  y += 6;
  doc.setFont("helvetica", "bold");
  doc.text("Asistente de Gerencia", x, y);
  doc.setFont("helvetica", "italic");
  doc.text("Ensigna, 2019 - 2022", x, y + 5);
  doc.setFont("helvetica", "normal");
  doc.text("Gestión administrativa, agenda, archivo.", x, y + 10);
  doc.setFont("helvetica", "bold");
  doc.text("Asistente administrativo", x, y + 15);
  doc.setFont("helvetica", "italic");
  doc.text("Oficinas del PAN, 2022 - Presente", x, y + 20);
  doc.setFont("helvetica", "normal");
  doc.text("Redacción de documentos, organización de agenda", x, y + 25);
}
