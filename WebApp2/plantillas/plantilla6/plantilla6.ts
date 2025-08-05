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
  const imgBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  };

  try {
    const doc = new jsPDF("p", "mm", "a4");
    const verde = "#5d9795";
    const grisClaro = "#f0f0f0";
    const negro = "#000000";
    const anchoPagina = 210;

    // Fondos
    doc.setFillColor(grisClaro);
    doc.rect(0, 0, 70, 297, "F");

    doc.setFillColor(verde);
    doc.rect(70, 0, anchoPagina - 70, 50, "F");

    const agregarTexto = (text: string, x: number, y: number, size = 12, font = "helvetica", color = negro) => {
      doc.setFont("helvetica", font);
      doc.setFontSize(size);
      doc.setTextColor(color);
      doc.text(text, x, y);
    };
    let fotoBase64 = "";

    if (datos.foto) {
      fotoBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(datos.foto!);
      });
    }

    // Íconos
    const [telImg, correoImg] = await Promise.all([
      imgBase64("/img6/telefono.png"),
      imgBase64("/img6/correo.png"),
    ]);

    if (fotoBase64) {
      doc.addImage(fotoBase64, "PNG", 5, 10, 60, 70);
    }

    // Encabezado
    doc.setFont("helvetica", "bold");
    doc.setFontSize(32);
    doc.setTextColor(255, 255, 255);
    doc.text(`${datos.nombre} ${datos.apellidos}`, 80, 25 );

doc.setFont("helvetica", "italic");
    doc.setFontSize(23);
    doc.text(`${datos.puesto}`, 80, 37);

// Perfil
    let x = 10;
    let y = 100;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text("PERFIL", x, y);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(datos.perfil || "Sin descripción", x, y + 6, { maxWidth: 50 });

    // CONTACTO
    y = 175
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("CONTACTO", x, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.addImage(telImg, "PNG", x, y + 6, 5, 5);
    doc.text(`${datos.telefono}`, x + 8, y + 10);
    doc.addImage(correoImg, "PNG", x, y + 16, 5, 5);
    doc.text(`${datos.correo}`, x + 8, y + 20);

       // EDUCACIÓN
    x = 80;
    y = 60;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(verde);
    doc.text("> EDUCACIÓN", x, y);
    doc.setFontSize(14);
    doc.setTextColor("#444");
    y += 6;

    doc.setFont("helvetica", "bold");
    doc.text(`${datos.nivelEstudios}`, x, y);
    doc.setFont("helvetica", "italic");
    doc.text(`${datos.institucion}  ${datos.inicioEdu} - ${datos.finEdu}`, x, y + 5);
    doc.setFont("helvetica", "normal");
    doc.text(`${datos.descEdu}`, x, y + 10, { maxWidth: 170 });

        // Lenguajes
    y = 106;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(verde);
    doc.text("> LENGUAJES", x, y);
    doc.setFontSize(14);
    doc.setTextColor("#444");
    y += 6;

    doc.setFont("helvetica", "normal");
    doc.text(`${datos.idioma} - ${datos.nivelIdioma}`, x, y);

        // Habilidades
    y = 140;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(verde);
    doc.text("> HABILIDADES", x, y);
    doc.setFontSize(14);
    doc.setTextColor("#444");
    y += 6
    doc.circle(x, y - 1.5, 1.5, "F");
    doc.text(`${datos.logroTitutlo}`, x + 5, y);
    agregarTexto((datos.logroDescrip || "Trabajo en equipo"), x + 5, y + 6);


    // Experiencia
    y = 195;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(verde);
    doc.text("> EXPERIENCIA", x, y);
    doc.setFontSize(14);
    doc.setTextColor("#444");
    y += 6;

    doc.setFont("helvetica", "bold");
    doc.text(`${datos.puesto}`, x, y);
    doc.setFont("helvetica", "italic");
    doc.text(`${datos.empresa}, ${datos.inicioExp} - ${datos.finExp}`, x, y + 5);
    doc.setFont("helvetica", "normal");
    doc.text(`${datos.descExp}`, x, y + 10, { maxWidth: 170 });


    // GUARDAR
    doc.save(`Curriculum ${datos.nombre || "sin_nombre"}.pdf`);
  } catch (error) {
    alert("Error al generar PDF: " + (error instanceof Error ? error.message : String(error)));
    console.error("Error al generar PDF:", error);
  }
}
