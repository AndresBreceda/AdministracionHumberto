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

export async function generarPDF6(datos: DatosPDF) {
  try {
    const doc = new jsPDF("p", "mm", "a4");

    const verde = "#5d9795";
    const grisClaro = "#f0f0f0";
    const anchoPagina = 210;

    doc.setFillColor(grisClaro);
    doc.rect(0, 0, 70, 297, "F");

    doc.setFillColor(verde);
    doc.rect(70, 0, anchoPagina - 70, 50, "F");

    await agregarFoto(doc, 5, 1, 60, 60, datos.perfil);
    agregarEncabezado(doc, `${datos.nombre?.toUpperCase()} ${datos.apellidos?.toUpperCase()}`, datos.ocupacion, 80, 25);
    agregarPerfil(doc, 10, 75, datos.perfil);
    await agregarContacto(doc, 10, 150, datos.correo);
    agregarEducacion(doc, 80, 60, datos.institucion);
    agregarLenguajes(doc, 80, 106, datos.idioma);
    agregarHabilidades(doc, 80, 140, datos.logroDescrip);
    agregarExperiencia(doc, 80, 195, datos.descExp);

    doc.save("plantilla2.pdf");
  } catch (error) {
    alert("Ocurrió un error al generar el PDF. Revisa la consola.");
    console.error("Error al generar PDF:", error);
  }
}

async function agregarFoto(doc: { addImage: (arg0: string, arg1: string, arg2: any, arg3: any, arg4: any, arg5: any) => void; }, x: number, y: number, w: number, h: number, url: any) {
  const foto = await imgBase64(url || "img/crist.jpg");
  doc.addImage(foto, "PNG", x, y, w, h);
}

function agregarEncabezado(doc: { setFont: (arg0: string, arg1: string) => void; setFontSize: (arg0: number) => void; setTextColor: (arg0: number, arg1: number, arg2: number) => void; text: (arg0: any, arg1: any, arg2: any) => void; }, nombre: string, titulo: any, x: number, y: number) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  doc.setTextColor(255, 255, 255);
  doc.text(nombre, x, y);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(23);
  doc.text(titulo, x, y + 7);
}

function agregarPerfil(doc: { setFont: (arg0: string, arg1: string) => void; setFontSize: (arg0: number) => void; setTextColor: (arg0: number) => void; text: (arg0: string, arg1: any, arg2: any, arg3: { maxWidth: number; } | undefined) => void; }, x: number, y: number, texto: any) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(0);
  doc.text("PERFIL", x, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(texto, x, y + 6, { maxWidth: 50 });
}

async function agregarContacto(doc: { setFont: (arg0: string, arg1: string) => void; setFontSize: (arg0: number) => void; text: (arg0: string, arg1: any, arg2: any) => void; addImage: (arg0: string, arg1: string, arg2: any, arg3: any, arg4: number, arg5: number) => void; }, x: number, y: number, datos: { telefono: any; correo: string; red: any; direccion: any; }) {
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
  doc.text(datos.telefono || "", x + 8, y + 10);

  doc.addImage(correo, "PNG", x, y + 16, 5, 5);
  doc.text(datos.correo || "", x + 8, y + 20);

  doc.addImage(red, "PNG", x, y + 26, 5, 5);
  doc.text(datos.red || "", x + 8, y + 30);

  doc.addImage(casa, "PNG", x, y + 36, 5, 5);
  doc.text(datos.direccion || "", x + 8, y + 40);
}

function agregarSeccionTitulo(doc: { setFont: (arg0: string, arg1: string) => void; setFontSize: (arg0: number) => void; setTextColor: (arg0: string) => void; text: (arg0: string, arg1: any, arg2: any) => void; }, titulo: string, x: any, y: any, color = "#5d9795") {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(color);
  doc.text(`> ${titulo.toUpperCase()}`, x, y);
  doc.setFontSize(14);
  doc.setTextColor("#444");
}

function agregarEducacion(doc: { setFont: (arg0: string, arg1: string) => void; setFontSize: (arg0: number) => void; text: (arg0: string, arg1: any, arg2: any) => void; }, x: number, y: number, educacion: any[]) {
  agregarSeccionTitulo(doc, "Educación", x, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  educacion?.forEach((edu: { titulo: any; institucion: any; fecha: any; }) => {
    doc.setFont("helvetica", "bold");
    doc.text(edu.titulo || "", x, y);
    y += 5;
    doc.setFont("helvetica", "italic");
    doc.text(`${edu.institucion || ""}, ${edu.fecha || ""}`, x, y);
    y += 7;
  });
}

function agregarLenguajes(doc: { setFont: (arg0: string, arg1: string) => void; text: (arg0: any, arg1: any, arg2: any) => void; }, x: number, y: number, idiomas: any[]) {
  agregarSeccionTitulo(doc, "Lenguajes", x, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  idiomas?.forEach((i: any) => {
    doc.text(i, x, y);
    y += 5;
  });
}

function agregarHabilidades(doc: { setFont: (arg0: string, arg1: string) => void; circle: (arg0: number, arg1: number, arg2: number, arg3: string) => void; text: (arg0: any, arg1: any, arg2: any) => void; }, x: number, y: number, habilidades: any[]) {
  agregarSeccionTitulo(doc, "Habilidades", x, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  habilidades?.forEach((hab: any) => {
    doc.circle(x - 2, y - 1.5, 1.5, "F");
    doc.text(hab, x + 3, y);
    y += 6;
  });
}

function agregarExperiencia(doc: { setFont: (arg0: string, arg1: string) => void; text: (arg0: string, arg1: any, arg2: any) => void; }, x: number, y: number, experiencia: any[]) {
  agregarSeccionTitulo(doc, "Experiencia", x, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  experiencia?.forEach((exp: { puesto: any; empresa: any; periodo: any; descripcion: any; }) => {
    doc.setFont("helvetica", "bold");
    doc.text(exp.puesto || "", x, y);
    y += 5;
    doc.setFont("helvetica", "italic");
    doc.text(`${exp.empresa || ""}, ${exp.periodo || ""}`, x, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.text(exp.descripcion || "", x, y);
    y += 8;
  });
}

async function imgBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}
