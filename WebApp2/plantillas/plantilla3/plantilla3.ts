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

export async function generarPDF3(datos: DatosPDF) {
  try {
    const doc = new jsPDF("p", "mm", "a4");

    const azul = "#1A237E";
    const gris = "#616161";
    const blanco = "#ffffff";

    const imgBase64 = async (file: File | undefined): Promise<string> => {
      if (!file) return "";
      const reader = new FileReader();
      return await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    };

    doc.setFillColor(azul);
    doc.rect(0, 0, 70, 297, "F");

    const foto = await imgBase64(datos.foto);
    if (foto) {
      doc.setFillColor(blanco);
      doc.circle(105, 25, 20, "F");
      doc.addImage(foto, "PNG", 15, 25, 40, 40);
    }

    // NOMBRE Y PUESTO
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(azul);
    doc.text(`${datos.nombre} ${datos.apellidos}`, 125, 55, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(gris);
    doc.text(`${datos.puesto} en ${datos.empresa}`, 125, 63, { align: "center" });

    // COLUMNA IZQUIERDA
    let yLeft = 85;
    const xLeft = 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(blanco);
    doc.text("Contacto", xLeft, yLeft);
    yLeft += 9;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(datos.telefono, xLeft, yLeft);
    yLeft += 7;
    doc.text(datos.correo, xLeft, yLeft);

    yLeft += 12;
    doc.setFont("helvetica", "bold");
    doc.text("Idiomas", xLeft, yLeft);
    yLeft += 7;

    doc.setFont("helvetica", "normal");
    doc.text(`• ${datos.idioma} (${datos.nivelIdioma})`, xLeft, yLeft);

    yLeft += 12;
    doc.setFont("helvetica", "bold");
    doc.text("Sobre mí", xLeft, yLeft);
    yLeft += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(datos.perfil, xLeft, yLeft, {
      maxWidth: 50,
      lineHeightFactor: 1.4,
    });

    // COLUMNA DERECHA
    let yRight = 85;
    const xRight = 80;

    const seccion = (titulo: string) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(azul);
      doc.text(titulo, xRight, yRight);
      yRight += 6;
      doc.setDrawColor("#CCCCCC");
      doc.setLineWidth(0.7);
      doc.line(xRight, yRight, 190, yRight);
      yRight += 6;
    };

    // EDUCACIÓN
    seccion("Formación académica");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor("#000000");
    doc.text(`${datos.inicioEdu} - ${datos.finEdu} · ${datos.nivelEstudios}`, xRight, yRight);
    yRight += 6;
    doc.setTextColor(gris);
    doc.text(datos.institucion, xRight, yRight);
    yRight += 12;

    // EXPERIENCIA
    seccion("Experiencia laboral");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor("#000000");
    doc.text(datos.empresa, xRight, yRight);
    yRight += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(gris);
    doc.text(`${datos.inicioExp} - ${datos.finExp}`, xRight, yRight);
    yRight += 6;

    doc.setTextColor("#333333");
    doc.text(datos.descExp, xRight, yRight, {
      maxWidth: 105,
      lineHeightFactor: 1.5,
    });
    yRight += 16;

    // LOGROS
    seccion("Logros");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor("#000000");
    doc.text(datos.logroTitutlo, xRight, yRight);
    yRight += 6;

    doc.setFont("helvetica", "normal");
    doc.setTextColor("#333333");
    doc.setFontSize(10);
    doc.text(datos.logroDescrip, xRight, yRight, {
      maxWidth: 105,
      lineHeightFactor: 1.4,
    });

    doc.save("plantilla7.pdf");
  } catch (error) {
    alert("❌ Error al generar el PDF. Revisa la consola.");
    console.error("Error al generar PDF:", error);
  }
}
