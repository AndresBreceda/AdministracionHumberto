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
  foto: File | undefined;
}

export async function generarPDF4(datos: DatosPDF) {
  try {
    const doc = new jsPDF("p", "mm", "a4");

    const imgBase64 = async (file: File | undefined): Promise<string> => {
      if (!file) return "";
      const reader = new FileReader();
      return await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    };

    const perfil = await imgBase64(datos.foto);
    const azulOscuro = "#2C3E50";
    const dorado = "#F39C12";
    const grisClaro = "#F8F9F9";
    const textoGris = "#34495E";

    // Encabezado
    doc.setFillColor(azulOscuro);
    doc.roundedRect(10, 10, 190, 45, 5, 5, "F");

    if (perfil) {
      doc.addImage(perfil, "PNG", 15, 15, 30, 30);
    }

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(`${datos.nombre} ${datos.apellidos}`, 50, 28);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(13);
    doc.text(`${datos.puesto}`, 50, 36);

    // Sobre mí
    doc.setFontSize(14);
    doc.setTextColor(textoGris);
    doc.setFont("helvetica", "bold");
    doc.text("Sobre mí", 15, 65);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(datos.perfil, 15, 72, { maxWidth: 180, lineHeightFactor: 1.4 });

    // Habilidades
    let yHab = 100;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(textoGris);
    doc.text("Habilidades", 15, yHab);
    yHab += 8;

    const habilidades = ["Adobe Photoshop", "UX/UI", "Branding"];
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    habilidades.forEach((hab, i) => {
      doc.setFillColor(dorado);
      doc.circle(17, yHab + i * 8, 1.5, "F");
      doc.text(hab, 22, yHab + 1 + i * 8);
    });

    // Idiomas
    let yIdiomas = yHab + habilidades.length * 8 + 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(textoGris);
    doc.text("Idiomas", 15, yIdiomas);
    yIdiomas += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(`${datos.idioma} (${datos.nivelIdioma})`, 15, yIdiomas);

    // Contacto
    let yContacto = yIdiomas + 12;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(textoGris);
    doc.text("Contacto", 15, yContacto);

    const contactos = [datos.telefono, datos.correo];
    yContacto += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    contactos.forEach((c, i) => {
      doc.text(c, 22, yContacto + i * 7);
    });

    // Experiencia
    doc.setFillColor(grisClaro);
    doc.roundedRect(100, 60, 100, 60, 3, 3, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(textoGris);
    doc.text("Experiencia", 105, 70);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(`${datos.inicioExp} - ${datos.finExp}`, 105, 78);
    doc.text(datos.empresa, 105, 85);
    doc.circle(105, 90, 1, "F");
    doc.text(datos.descExp, 108, 91, { maxWidth: 90, lineHeightFactor: 1.4 });

    // Educación
    doc.setFillColor(grisClaro);
    doc.roundedRect(100, 130, 100, 50, 3, 3, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(textoGris);
    doc.text("Educación", 105, 142);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(`${datos.inicioEdu} - ${datos.finEdu}`, 105, 150);
    doc.text(datos.nivelEstudios, 105, 157);
    doc.text(datos.institucion, 105, 164);

    doc.save("plantilla4.pdf");
  } catch (error) {
    alert("Ocurrió un error al generar el PDF.");
    console.error("Error al generar PDF:", error);
  }
}
