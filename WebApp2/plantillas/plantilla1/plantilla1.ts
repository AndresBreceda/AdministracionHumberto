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

export async function generarPDF1(data: DatosPDF) {
  try {
    const doc = new jsPDF("p", "mm", "a4");

    const azul = "#003049";
    const gris = "#d9d9d9";
    const negro = "#000000";
    const blanco = "#ffffff";

    let fotoBase64 = "";
    if (data.foto) {
      const reader = new FileReader();
      fotoBase64 = await new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(data.foto!);
      });
    }

    // Franja lateral más ancha
    doc.setFillColor(gris);
    doc.rect(0, 0, 85, 297, "F");

    // Foto circular
    if (fotoBase64) {
      doc.setFillColor(blanco);
      doc.circle(42.5, 40, 25, "F");
      doc.addImage(fotoBase64, "PNG", 17.5, 15, 50, 50);
    }

    // Nombre y puesto (derecha)
    doc.setFontSize(24);
    doc.setTextColor(azul);
    doc.setFont("helvetica", "bold");
    doc.text(`${data.nombre} ${data.apellidos}`, 95, 35);

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(negro);
    doc.text(`${data.puesto} en ${data.empresa}`, 95, 44);

    // PERFIL
    let y = 85;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(azul);
    doc.text("Perfil", 10, y);
    y += 7;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(negro);
    doc.text(data.perfil, 10, y, { maxWidth: 65 });

    // CONTACTO
    y += 25;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(azul);
    doc.text("Contacto", 10, y);
    y += 7;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(negro);
    doc.text(data.telefono, 10, y);
    y += 7;
    doc.text(data.correo, 10, y);

    // IDIOMAS
    y += 15;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(azul);
    doc.text("Idiomas", 10, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(negro);
    doc.text(`${data.idioma} (${data.nivelIdioma})`, 10, y);

    // EXPERIENCIA LABORAL
    y = 75;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.setTextColor(azul);
    doc.text("Experiencia Laboral", 95, y);
    y += 10;

    doc.setFontSize(12);
    doc.setTextColor(negro);
    doc.setFont("helvetica", "normal");
    doc.text(`${data.inicioExp} - ${data.finExp}`, 95, y);
    doc.setFont("helvetica", "bold");
    doc.text(data.empresa, 135, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(data.descExp, 95, y, { maxWidth: 110 });
    y += 25;

    // EDUCACIÓN
    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.setFontSize(15);
    doc.text("Educación", 95, y);
    y += 10;

    doc.setFontSize(12);
    doc.setTextColor(negro);
    doc.setFont("helvetica", "normal");
    doc.text(`${data.inicioEdu} - ${data.finEdu}`, 95, y);
    doc.setFont("helvetica", "bold");
    doc.text(data.institucion, 135, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.text(data.nivelEstudios, 95, y);
    y += 7;
    if (data.descEdu) {
      doc.text(data.descEdu, 95, y, { maxWidth: 110 });
      y += 15;
    }

    // LOGROS
    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.setFontSize(15);
    doc.text("Logros", 95, y);
    y += 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(negro);
    doc.text(data.logroTitutlo, 95, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(data.logroDescrip, 95, y, { maxWidth: 110 });

    doc.save("curriculum.pdf");
  } catch (err) {
    console.error("Error al generar el PDF:", err);
    alert("Hubo un error al generar el PDF.");
  }
}
