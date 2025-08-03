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
  logroTitutlo: string;
  logroDescrip: string;
  idioma: string;
  nivelIdioma: string;
  foto: File | undefined;
}

export async function generarPDF7(datos: DatosPDF) {
  try {
    const doc = new jsPDF("p", "mm", "a4");

    const personaImg = await imgBase64(datos.foto);
    const interImg = await imgBase64("img/internet.png");
    const correoImg = await imgBase64("img/correo.png");
    const teleImg = await imgBase64("img/telefono.png");
    const ubiImg = await imgBase64("img/ubicacion.png");

    dibujarFondo(doc);
    dibujarFotoYEncabezado(doc, personaImg, datos);
    dibujarContacto(doc, teleImg, correoImg, interImg, ubiImg, 15, 90, datos);
    dibujarLogros(doc, 15, 155, datos);
    dibujarHerramientas(doc, 15, 200, datos);
    dibujarPerfil(doc, 80, 65, datos.perfil);
    dibujarExperiencia(doc, 80, 100, datos.empresa);
    dibujarFormacion(doc, 80, 160, datos.institucion);
    dibujarIdiomas(doc, 80, 200, datos.idioma);

    doc.save("plantilla3.pdf");
  } catch (error) {
    alert("Ocurrió un error al generar el PDF. Revisa la consola.");
    console.error("Error al generar PDF:", error);
  }
}

function dibujarFondo(doc) {
  doc.setFillColor(240, 240, 240);
  doc.rect(0, 0, 78, 297, "F");
  doc.setFillColor(27, 38, 59);
  doc.rect(70, 0, 140, 45, "F");
}

function dibujarFotoYEncabezado(doc, img, datos) {
  doc.addImage(img, "PNG", 10, 15, 55, 65);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.text(`${datos.nombre?.toUpperCase()} ${datos.apellidos?.toUpperCase()}`, 75, 35, { maxWidth: 120 });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(20);
  doc.text(datos.ocupacion || "", 75, 42, { maxWidth: 120 });
}

function dibujarContacto(doc, tel, correo, web, ubi, x, y, datos) {
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("CONTACTO", x, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.addImage(tel, "PNG", x, y+3, 5, 5);
  doc.text(datos.telefono || "", x+8, y+8, {maxWidth: 50});
  doc.addImage(correo, "PNG", x, y+11, 5, 5);
  doc.text(datos.correo || "", x+8, y+16, {maxWidth: 50});
  doc.addImage(web, "PNG", x, y+19, 5, 5);
  doc.text(datos.red || "", x+8, y+24, {maxWidth: 50});
  doc.addImage(ubi, "PNG", x, y+27, 5, 5);
  doc.text(datos.direccion || "", x+8, y+32, {maxWidth: 40});
}

function dibujarLogros(doc, x, y, datos) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("LOGROS", x, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  datos.logros?.forEach((logro, i) => {
    doc.text(`- ${logro}`, x, y + 7 + (i * 6));
  });
}

function dibujarHerramientas(doc, x, y, datos) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("HERRAMIENTAS", x, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  datos.herramientas?.forEach((herr, i) => {
    doc.text(`- ${herr}`, x, y + 7 + (i * 6));
  });
}

function dibujarPerfil(doc, x, y, texto) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("MI PERFIL", x, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text(texto || "", x, y+7, {maxWidth: 120});
}

function dibujarExperiencia(doc, x, y, experiencia) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("EXPERIENCIA", x, y);
  doc.setFontSize(14);
  experiencia?.forEach((exp, i) => {
    const posY = y + 6 + (i * 26);
    doc.setFont("helvetica", "bold");
    doc.text(exp.puesto || "", x, posY);
    doc.setFont("helvetica", "italic");
    doc.text(`${exp.empresa || ""} (${exp.periodo || ""})`, x, posY + 6);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(13);
    doc.text(exp.descripcion || "", x, posY + 12, {maxWidth: 120});
  });
}

function dibujarFormacion(doc, x, y, educacion) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("FORMACIÓN", x, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  educacion?.forEach((edu, i) => {
    const posY = y + 6 + (i * 18);
    doc.text(edu.institucion || "", x, posY);
    doc.text(`(${edu.fecha || ""})`, x, posY + 6);
    doc.text(edu.titulo || "", x, posY + 12, {maxWidth: 120});
  });
}

function dibujarIdiomas(doc, x, y, idiomas) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("IDIOMAS", x, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  idiomas?.forEach((idioma, i) => {
    doc.text(`${idioma.nombre?.toUpperCase()}    ${idioma.nivel}`, x, y + 6 + (i * 6));
  });
}

async function imgBase64(url){
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}
