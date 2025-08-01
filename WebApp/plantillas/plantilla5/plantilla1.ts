// Espera al DOM
// Eliminado el listener del DOM, ya no necesario en integración con React

// Convertir imagen a base64
async function imgBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

export async function generarPDF5(datos: any) {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "mm", "a4");

    // Carga imágenes necesarias
    const messi = await imgBase64("person.jpg");
    const telImg = await imgBase64("img/telefono.png");
    const correoImg = await imgBase64("img/correo.png");
    const mapaImg = await imgBase64("img/mapa.png");
    const socialImg = await imgBase64("img/social.png");
    const traImg = await imgBase64("img/trabajar.png");
    const virreImg = await imgBase64("img/virrete.png");
    const exitImg = await imgBase64("img/exito.png");
    const idiomaImg = await imgBase64("img/idiomas.png");

    // Estilos
    const azul = "#0a2c56";
    const negro = "#000000";
    const gris = "#666666";

    agregarFoto(doc, messi);
    agregarEncabezado(doc, azul, negro, datos);
    agregarContacto(doc, telImg, correoImg, mapaImg, socialImg, datos);
    agregarSobreMi(doc, azul, gris, datos);
    agregarExperiencia(doc, azul, negro, traImg, datos);
    agregarEducacion(doc, azul, negro, virreImg, datos);
    agregarHabilidades(doc, azul, negro, exitImg, datos);
    agregarIdiomas(doc, azul, negro, idiomaImg, datos);

    doc.save("plantilla1.pdf");
  } catch (error) {
    alert("Ocurrió un error al generar el PDF. Revisa la consola.");
    console.error("Error al generar PDF:", error);
  }
}

function agregarFoto(doc, imagen) {
  doc.roundedRect(130, 10, 60, 70, 5, 5, "F");
  doc.addImage(imagen, "PNG", 130, 10, 60, 70);
}

function agregarEncabezado(doc, azul, negro, datos) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(negro);
  doc.text(datos.apellidos.toUpperCase(), 20, 25);
  doc.text(datos.nombre.toUpperCase(), 20, 35);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(12);
  doc.setTextColor(azul);
  doc.text(datos.puesto || "ESPECIALISTA", 20, 45);
}

function agregarContacto(doc, telImg, correoImg, mapaImg, socialImg, datos) {
  let y = 48;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor("#000000");

  doc.addImage(telImg, "PNG", 20, y, 4, 4);
  doc.text(datos.telefono || "Sin teléfono", 26, y + 3);
  y += 8;

  doc.addImage(correoImg, "PNG", 20, y, 4, 4);
  doc.text(datos.correo || "Sin correo", 26, y + 3);
  y += 8;

  doc.addImage(mapaImg, "PNG", 20, y, 4, 4);
  doc.text(datos.ciudad || "Ciudad desconocida", 26, y + 3);
  y += 8;

  doc.addImage(socialImg, "PNG", 20, y, 4, 4);
  doc.text(datos.social || "", 26, y + 3);
}

function agregarSobreMi(doc, azul, gris, datos) {
  let y = 85;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(azul);
  doc.text("SOBRE MÍ", 20, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(gris);
  doc.text(datos.perfil || "Sin descripción", 20, y + 6, { maxWidth: 170 });
}

function agregarExperiencia(doc, azul, negro, traImg, datos) {
  let y = 115;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(azul);

  doc.addImage(traImg, "PNG", 20, y - 3, 8, 8);
  doc.text("EXPERIENCIA", 30, y + 3);
  y += 5;

  const experiencias = [
    {
      periodo: `${datos.inicioExp} - ${datos.finExp}`,
      puesto: datos.puesto,
      tareas: [datos.descExp]
    }
  ];

  doc.setFontSize(10);
  doc.setTextColor(negro);
  experiencias.forEach(exp => {
    y += 8;
    doc.setFont("helvetica", "bold");
    doc.text(exp.periodo, 20, y);
    y += 5;
    doc.setFont("helvetica", "italic");
    doc.text(exp.puesto, 20, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    exp.tareas.forEach(t => {
      doc.text("• " + t, 20, y);
      y += 5;
    });
  });
}

function agregarEducacion(doc, azul, negro, virreImg, datos) {
  let y = 210;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(azul);
  doc.addImage(virreImg, "PNG", 20, y - 4, 8, 8);
  doc.text("EDUCACIÓN", 30, y + 3);

  const educacion = [
    {
      periodo: `${datos.inicioEdu} - ${datos.finEdu}`,
      institucion: `${datos.nivelEstudios} - ${datos.institucion}`
    }
  ];

  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(negro);
  educacion.forEach(edu => {
    doc.text(edu.periodo, 20, y);
    y += 5;
    doc.text(edu.institucion, 20, y);
    y += 7;
  });
}

function agregarHabilidades(doc, azul, negro, exitImg, datos) {
  let y = 253;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(azul);
  doc.addImage(exitImg, "PNG", 20, y - 3, 8, 8);
  doc.text("HABILIDADES", 30, y + 3);
  y += 9.5;

  const habilidades = [datos.habilidad || "Comunicación"];
  doc.setFont("helvetica", "normal");
  doc.setTextColor(negro);
  doc.setFontSize(10);

  habilidades.forEach(hab => {
    doc.text("• " + hab, 20, y);
    y += 5;
  });
}

function agregarIdiomas(doc, azul, negro, idiomaImg, datos) {
  let x = 100;
  let y = 260;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(azul);
  doc.addImage(idiomaImg, "PNG", x - 5, y - 5, 8, 8);
  doc.text("IDIOMAS", x + 5, y);

  const idiomas = [`${datos.idioma} (${datos.nivelIdioma})`];
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(negro);
  doc.setFontSize(10);
  idiomas.forEach(hab => {
    doc.text("• " + hab, x, y);
    y += 5;
  });
}
