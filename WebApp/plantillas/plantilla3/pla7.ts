export async function generarPDF3(datos: any) {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "mm", "a4");

    const azul = "#1A237E";
    const gris = "#616161";
    const blanco = "#ffffff";

    const imgBase64 = async (file) => {
      if (!file) return "";
      const reader = new FileReader();
      return await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    };

    doc.setFillColor(azul);
    doc.rect(0, 0, 70, 297, "F");

    const foto = await imgBase64(datos.foto);
    if (foto) {
      doc.setFillColor(blanco);
      doc.circle(105, 25, 20, "F");
      doc.addImage(foto, "PNG", 85, 5, 40, 40);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(azul);
    doc.text(`${datos.nombre} ${datos.apellidos}`, 105, 55, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(gris);
    doc.text(`${datos.puesto} en ${datos.empresa}`, 105, 63, { align: "center" });

    let yLeft = 80;
    const xLeft = 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(blanco);
    doc.text("Contacto", xLeft, yLeft);
    yLeft += 7;

    const contacto = [datos.telefono, datos.correo, "", ""];

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    for (const texto of contacto) {
      doc.text(texto, xLeft, yLeft);
      yLeft += 6;
    }

    yLeft += 6;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(blanco);
    doc.text("Idiomas", xLeft, yLeft);
    yLeft += 6;

    doc.setFont("helvetica", "normal");
    doc.text(`• ${datos.idioma} (${datos.nivelIdioma})`, xLeft, yLeft);
    yLeft += 5;

    yLeft += 6;
    doc.setFont("helvetica", "bold");
    doc.text("Sobre mí", xLeft, yLeft);
    yLeft += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(datos.perfil, xLeft, yLeft, {
      maxWidth: 50,
      lineHeightFactor: 1.2,
    });

    let yRight = 80;
    const xRight = 80;

    const seccion = (titulo) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(azul);
      doc.text(titulo, xRight, yRight);
      yRight += 5;
      doc.setDrawColor("#CCCCCC");
      doc.setLineWidth(0.5);
      doc.line(xRight, yRight, 190, yRight);
      yRight += 4;
    };

    seccion("Formación académica");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor("#000000");
    doc.text(`${datos.inicioEdu} - ${datos.finEdu} - ${datos.nivelEstudios}`, xRight, yRight);
    yRight += 4;
    doc.setTextColor(gris);
    doc.text(datos.institucion, xRight, yRight);
    yRight += 6;

    seccion("Experiencia laboral");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor("#000000");
    doc.text(datos.empresa, xRight, yRight);
    yRight += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(gris);
    doc.text(`${datos.inicioExp} - ${datos.finExp}`, xRight, yRight);
    yRight += 5;

    doc.setTextColor("#333333");
    doc.text(datos.descExp, xRight, yRight, {
      maxWidth: 110,
      lineHeightFactor: 1.4,
    });

    yRight += 12;

    seccion("Logros");

    const logros = ["Ejemplo de logro 1", "Ejemplo de logro 2"];

    doc.setFontSize(10);
    for (const l of logros) {
      doc.text(l, xRight, yRight, { maxWidth: 105 });
      yRight += 6;
    }

    doc.save("plantilla7.pdf");
  } catch (error) {
    alert("❌ Error al generar el PDF. Revisa la consola.");
    console.error("Error al generar PDF:", error);
  }
}
