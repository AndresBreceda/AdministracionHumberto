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

    doc.setFillColor(gris);
    doc.rect(0, 0, 70, 297, "F");

    if (fotoBase64) {
      doc.setFillColor(blanco);
      doc.circle(35, 40, 25, "F");
      doc.addImage(fotoBase64, "PNG", 10, 15, 50, 50);
    }

    doc.setFontSize(20);
    doc.setTextColor(azul);
    doc.setFont("helvetica", "bold");
    doc.text(`${data.nombre} ${data.apellidos}`, 80, 30);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(negro);
    doc.text(`${data.puesto} en ${data.empresa}`, 80, 38);

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.text("Perfil", 10, 80);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(negro);
    doc.text(data.perfil, 10, 85, { maxWidth: 50 });

    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.text("Contacto", 10, 115);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(negro);
    doc.text(data.telefono, 10, 122);
    doc.text(data.correo, 10, 128);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.text("Idiomas", 10, 140);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(negro);
    doc.text(`${data.idioma} (${data.nivelIdioma})`, 10, 147);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.setFontSize(13);
    doc.text("Experiencia Laboral", 80, 60);
    doc.setFontSize(10);
    doc.setTextColor(negro);
    doc.setFont("helvetica", "normal");
    doc.text(`${data.inicioExp} - ${data.finExp}`, 80, 68);
    doc.setFont("helvetica", "bold");
    doc.text(data.empresa, 120, 68);
    doc.setFont("helvetica", "normal");
    doc.text(data.descExp, 80, 74, { maxWidth: 110 });

    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.setFontSize(13);
    doc.text("Educación", 80, 100);
    doc.setFontSize(10);
    doc.setTextColor(negro);
    doc.setFont("helvetica", "normal");
    doc.text(`${data.inicioEdu} - ${data.finEdu}`, 80, 108);
    doc.setFont("helvetica", "bold");
    doc.text(data.institucion, 110, 108);
    doc.setFont("helvetica", "normal");
    doc.text(data.nivelEstudios, 80, 114);
    if (data.descEdu) doc.text(data.descEdu, 80, 120, { maxWidth: 110 });

    doc.save("curriculum.pdf");
  } catch (err) {
    console.error("Error al generar el PDF:", err);
    alert("Hubo un error al generar el PDF.");
  }
}
