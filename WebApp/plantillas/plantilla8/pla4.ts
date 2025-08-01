import { jsPDF } from "jspdf";

interface DatosPDF {
  nombre: string;
  apellidos: string;
  telefono: string;
  correo: string;
  perfil: string;
  puesto: string;
  empresa: string;
  inicioExp: string;
  finExp: string;
  descExp: string;
  nivelEstudios: string;
  institucion: string;
  inicioEdu: string;
  finEdu: string;
  descEdu: string;
  idioma: string;
  nivelIdioma: string;
  foto: File | null;
}

export async function generarPDF8(datos: DatosPDF) {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "mm", "a4");

    const verde = "#4F8A72";
    const grisClaro = "#F3F5F4";

    const perfil = await imgBase64(datos.foto || "img/latino.jpg");
    const telefono = await imgBase64("img/telefono.png");
    const correo = await imgBase64("img/correo.png");
    const ubicacion = await imgBase64("img/ubicacion.png");
    const internet = await imgBase64("img/internet.png");

    dibujarFondo(doc, grisClaro);
    dibujarPerfil(doc, perfil, 15, 15);
    dibujarNombre(doc, 90, 30, verde, datos);
    dibujarSobreMi(doc, 10, 75, datos.perfil_profesional);
    dibujarHabilidades(doc, 10, 102, datos.habilidades);
    dibujarIdiomas(doc, 10, 150, verde, datos.idiomas);
    dibujarContacto(doc, 10, 175, { telefono, correo, ubicacion, internet }, datos);
    dibujarExperiencia(doc, 80, 70, verde, datos.experiencia);
    dibujarEducacion(doc, 80, 160, verde, datos.educacion);

    doc.save("plantilla4.pdf");

  } catch (error) {
    alert("Ocurrió un error al generar el PDF. Revisa la consola.");
    console.error("Error al generar PDF:", error);
  }
}

function dibujarFondo(doc, color) {
  doc.setFillColor(color);
  doc.rect(0, 0, 80, 297, "F");
}

function dibujarPerfil(doc, img, x, y) {
  doc.addImage(img, "PNG", x, y, 50, 50);
}

function dibujarNombre(doc, x, y, color, datos) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text(datos.nombre || "", x, y);
  doc.text(datos.apellidos || "", x, y + 10);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(color);
  doc.textWithLink(datos.ocupacion || "", x, y + 20, { url: "#" });

  doc.setTextColor(0, 0, 0);
  doc.text(`${datos.edad || ''} años de edad`, x, y + 28);
}

function dibujarSobreMi(doc, x, y, texto) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("SOBRE MÍ", x, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(texto || "", x, y + 5, { maxWidth: 60 });
}

function dibujarHabilidades(doc, x, y, habilidades) {
  doc.setFont("helvetica", "bold");
  doc.text("HABILIDADES", x, y);
  doc.setFont("helvetica", "normal");
  habilidades?.forEach((hab, i) => {
    doc.circle(x, y + 6 + i * 6, 0.7, "F");
    doc.text(hab, x + 3, y + 7 + i * 6);
  });
}

function dibujarIdiomas(doc, x, y, color, idiomas) {
  doc.setFont("helvetica", "bold");
  doc.text("IDIOMAS", x, y);
  idiomas?.forEach((idioma, i) => {
    doc.text(`${idioma.nombre} ${idioma.nivel}`, x, y + 7 + (i * 10));
    doc.setFillColor(color);
    doc.rect(x, y + 10 + (i * 10), 40, 4, "F");
    doc.setFillColor("#ddd");
    doc.rect(x + 40, y + 10 + (i * 10), 20, 4, "F");
  });
}

function dibujarContacto(doc, x, y, icons, datos) {
  doc.setFont("helvetica", "bold");
  doc.text("CONTACTO", x, y);

  const contactos = [
    { icon: icons.telefono, text: datos.telefono },
    { icon: icons.correo, text: datos.correo },
    { icon: icons.internet, text: datos.red },
    { icon: icons.ubicacion, text: datos.direccion }
  ];

  let offsetY = y + 7;
  for (const c of contactos) {
    doc.addImage(c.icon, "PNG", x, offsetY, 5, 5);
    doc.text(c.text || "", x + 7, offsetY + 4);
    offsetY += (c.text?.includes("\n") ? 12 : 8);
  }
}

function dibujarExperiencia(doc, x, y, color, experiencia) {
  doc.setFillColor(color);
  doc.rect(x, y, 130, 10, "F");
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("EXPERIENCIA LABORAL", x + 10, y + 7);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  let currentY = y + 20;

  experiencia?.forEach((exp) => {
    doc.setFont("helvetica", "bold");
    doc.text(exp.periodo || "", x + 2, currentY);
    doc.text(exp.puesto || "", x + 40, currentY);
    doc.setFont("helvetica", "normal");
    doc.text(exp.empresa || "", x + 29, currentY + 6);
    exp.descripcion?.forEach((linea, i) => {
      doc.circle(x + 29, currentY + 10 + (i * 5), 0.7, "F");
      doc.text(linea, x + 32, currentY + 11 + (i * 5));
    });
    currentY += 25;
  });
}

function dibujarEducacion(doc, x, y, color, educacion) {
  doc.setFillColor(color);
  doc.rect(x, y, 130, 10, "F");
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("EDUCACIÓN", x + 10, y + 7);
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);

  let currentY = y + 20;
  educacion?.forEach((edu) => {
    doc.setFont("helvetica", "bold");
    doc.text(edu.fecha || "", x + 2, currentY);
    doc.text(edu.titulo || "", x + 25, currentY);
    doc.setFont("helvetica", "normal");
    doc.text(edu.institucion || "", x + 25, currentY + 6);
    currentY += 15;
  });
}

async function imgBase64(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
