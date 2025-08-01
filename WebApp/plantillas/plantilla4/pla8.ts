export async function generarPDF4(datos: any) {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "mm", "a4");

    const imgBase64 = async (file) => {
      if (!file) return "";
      const reader = new FileReader();
      return await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    };

    const perfil = await imgBase64(datos.foto);
    const azulOscuro = "#2C3E50";
    const dorado = "#F39C12";
    const grisClaro = "#F8F9F9";
    const textoGris = "#34495E";

    doc.setFillColor(azulOscuro);
    doc.roundedRect(10, 10, 190, 40, 5, 5, "F");
    if (perfil) doc.addImage(perfil, "PNG", 15, 15, 30, 30);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(`${datos.nombre} ${datos.apellidos}`, 50, 25);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`${datos.puesto}`, 50, 33);

    doc.setFontSize(14);
    doc.setTextColor(textoGris);
    doc.setFont("helvetica", "bold");
    doc.text("Sobre mí", 15, 60);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(datos.perfil, 15, 65, { maxWidth: 180 });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(textoGris);
    doc.text("Habilidades", 15, 85);
    doc.setFont("helvetica", "normal");
    const habilidades = ["Adobe Photoshop", "UX/UI", "Branding"];
    habilidades.forEach((hab, i) => {
      doc.setFillColor(dorado);
      doc.circle(17, 90 + i * 6, 1, "F");
      doc.text(hab, 22, 92 + i * 6);
    });

    doc.setFont("helvetica", "bold");
    doc.setTextColor(textoGris);
    doc.text("Idiomas", 15, 130);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(`${datos.idioma} (${datos.nivelIdioma})`, 15, 136);
    doc.setFillColor(dorado);
    doc.roundedRect(15, 140, 60, 4, 1, 1, "F");
    doc.setFillColor("#ddd");
    doc.roundedRect(75, 140, 10, 4, 1, 1, "F");

    doc.setFont("helvetica", "bold");
    doc.setTextColor(textoGris);
    doc.text("Contacto", 15, 155);

    const contactos = [datos.telefono, datos.correo, "", ""];
    let y = 160;
    for (const c of contactos) {
      doc.text(c, 22, y + 4);
      y += 8;
    }

    doc.setFillColor(grisClaro);
    doc.roundedRect(100, 60, 100, 60, 3, 3, "F");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(textoGris);
    doc.text("Experiencia", 105, 68);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(`${datos.inicioExp} - ${datos.finExp}`, 105, 75);
    doc.text(datos.empresa, 105, 81);
    doc.circle(105, 86, 0.7, "F");
    doc.text(datos.descExp, 108, 87);

    doc.setFillColor(grisClaro);
    doc.roundedRect(100, 130, 100, 45, 3, 3, "F");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(textoGris);
    doc.text("Educación", 105, 138);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(`${datos.inicioEdu} - ${datos.finEdu}`, 105, 145);
    doc.text(datos.nivelEstudios, 105, 150);
    doc.text(datos.institucion, 105, 155);

    doc.save("plantilla9.pdf");
  } catch (error) {
    alert("Ocurrió un error al generar el PDF.");
    console.error("Error al generar PDF:", error);
  }
}
