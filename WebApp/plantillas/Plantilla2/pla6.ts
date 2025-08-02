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

export async function generarPDF2(datos: DatosPDF) {
  try {
    const doc = new jsPDF("p", "mm", "a4");

    const azul = "#003366";
    const gris = "#4d4d4d";
    const negro = "#000000";

    let fotoBase64 = "";
    if (datos.foto) {
      const reader = new FileReader();
      fotoBase64 = await new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(datos.foto!);
      });
    }

    doc.setFillColor(gris);
    doc.rect(0, 0, 70, 297, "F");

    if (fotoBase64) {
      doc.setFillColor(negro);
      doc.circle(35, 40, 25, "F");
      doc.addImage(fotoBase64, "PNG", 10, 15, 50, 50);
    }


    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(negro);
    doc.text(`${datos.nombre} ${datos.apellidos}`, 20, 25);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(azul);
    doc.text(`${datos.puesto} en ${datos.empresa}`, 20, 33);

    doc.setDrawColor(azul);
    doc.setLineWidth(1);
    doc.line(20, 45, 190, 45);

    let yLeft = 55;
    const xLeft = 20;
    const anchoColIzq = 70;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(azul);
    doc.text("Contacto", xLeft, yLeft);
    yLeft += 8;

    const contacto = [datos.telefono, datos.correo, "", ""];
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(gris);
    for (const c of contacto) {
      doc.text(c, xLeft, yLeft);
      yLeft += 7;
    }

    yLeft += 5;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.text("Idiomas", xLeft, yLeft);
    yLeft += 7;

    doc.setFont("helvetica", "normal");
    doc.text(`• ${datos.idioma} (${datos.nivelIdioma})`, xLeft, yLeft);
    yLeft += 6;

    yLeft += 7;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.text("Sobre mí", xLeft, yLeft);
    yLeft += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(gris);
    doc.text(datos.perfil, xLeft, yLeft, {
      maxWidth: anchoColIzq,
      lineHeightFactor: 1.3,
    });

    let yRight = 55;
    const xRight = 105;
    const anchoColDer = 85;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(azul);
    doc.text("Formación académica", xRight, yRight);
    yRight += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(negro);
    doc.text(`${datos.inicioEdu} - ${datos.finEdu} - ${datos.nivelEstudios}`, xRight, yRight);
    yRight += 5;
    doc.setTextColor(gris);
    doc.text(datos.institucion, xRight, yRight);
    yRight += 8;
    doc.setTextColor(negro);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.text("Experiencia laboral", xRight, yRight);
    yRight += 8;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(negro);
    doc.text(datos.empresa, xRight, yRight);
    yRight += 5;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(azul);
    doc.text(`${datos.inicioExp} - ${datos.finExp}`, xRight, yRight);
    yRight += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(gris);
    doc.text(datos.descExp, xRight, yRight, {
      maxWidth: anchoColDer,
      lineHeightFactor: 1.4,
    });
    yRight += 12;

    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.text("Logros", xRight, yRight);
    yRight += 7;

    // const logroImg = await imgBase64("img/exito.png");
    const logros = datos.logroDescrip; 

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(negro);
    for (const l of logros) {

      doc.addImage("✔", "PNG", xRight, yRight - 3, 5, 5);
      
      doc.text(l, xRight + 7, yRight, {
        maxWidth: anchoColDer - 10,
        lineHeightFactor: 1.3,
      });
      yRight += 8;
    }

    doc.save("plantilla6.pdf");
  } catch (error) {
    alert("❌ Error al generar el PDF. Revisa la consola.");
    console.error("Error al generar PDF:", error);
  }
}
