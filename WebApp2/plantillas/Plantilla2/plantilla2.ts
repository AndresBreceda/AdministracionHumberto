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
    const azul = "#0a2c56", blanco = "#ffffff", gris = "#F2F2F2", negro = "#000000";

    // Fondos
    doc.setFillColor(azul);
    doc.rect(0, 0, 210, 60, "F");

    doc.setFillColor(gris);
    doc.rect(20, 0, 80, 297, "F");

    doc.setFillColor(azul);
    doc.rect(0, 285, 210, 12, "F");

    // Cargar íconos
    const [telImg, userImg, traImg, virreImg, exitImg, idiomaImg] = await Promise.all([
      imgBase64("/img2/telefono.png"),
      imgBase64("/img2/usuario.png"),
      imgBase64("/img2/jale.png"),
      imgBase64("/img2/birrete.png"),
      imgBase64("/img2/logro.png"),
      imgBase64("/img2/idiomas.png"),
    ]);

    const agregarTexto = (
      text: string,
      x: number,
      y: number,
      size = 12,
      font = "normal",
      color = negro
    ) => {
      doc.setFont("helvetica", font);
      doc.setFontSize(size);
      doc.setTextColor(color);
      doc.text(text, x, y);
    };

    // FOTO centrada dentro del rectángulo gris
    let fotoBase64 = "";
    if (datos.foto) {
      fotoBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(datos.foto!);
      });
    }

    if (fotoBase64) {
      const fotoX = 20 + (80 - 60) / 2; // centrada dentro de 80 mm de ancho
      doc.addImage(fotoBase64, "PNG", fotoX, 10, 60, 60);
    }

    // COLUMNA DERECHA (x >= 105)
    agregarTexto(datos.nombre.toUpperCase(), 105, 35, 30, "bold", blanco);
    agregarTexto(datos.apellidos.toUpperCase(), 105, 45, 30, "bold", blanco);
    agregarTexto(datos.puesto, 105, 55, 24, "normal", blanco);

    // COLUMNA IZQUIERDA (x = 25 a 90 aprox.)
    let y = 90;
    doc.addImage(userImg, "PNG", 25, y - 5, 5, 5);
    agregarTexto("ACERCA DE MÍ", 32, y, 18, "bold", negro);
    y += 8;
    doc.setTextColor(negro);
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(datos.perfil || "Sin descripción", 25, y, { maxWidth: 70 });

    // CONTACTO
    y += 65;
    doc.addImage(telImg, "PNG", 25, y - 4, 6, 6);
    agregarTexto("CONTACTO", 33, y, 18, "bold", negro);
    y += 10;
    agregarTexto("• " + datos.telefono, 25, y, 14, "normal", negro);
    y += 6;
    agregarTexto("• " + datos.correo, 25, y, 14, "normal", negro);

    // IDIOMA
    y += 35;
    doc.addImage(idiomaImg, "PNG", 25, y - 3, 6, 6);
    agregarTexto("IDIOMA", 33, y, 18, "bold", negro);
    y += 10;
    agregarTexto("• " + datos.idioma + " - " + datos.nivelIdioma, 25, y, 14, "normal", negro);

    // COLUMNA DERECHA – EXPERIENCIA
    y = 80;
    doc.addImage(traImg, "PNG", 105, y - 4, 6, 6);
    agregarTexto("EXPERIENCIA LABORAL", 113, y, 18, "bold", negro);
    y += 10;
    agregarTexto(datos.puesto, 105, y, 15, "bold");
    y += 6;
    agregarTexto(`${datos.empresa} | ${datos.inicioExp} - ${datos.finExp}`, 105, y, 14, "italic", negro);
    y += 6;
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(negro);
    doc.text("• " + datos.descExp, 105, y + 3, { maxWidth: 90 });
    y += 35;

    // EDUCACIÓN
    doc.addImage(virreImg, "PNG", 105, y - 4, 6, 6);
    agregarTexto("EDUCACIÓN", 113, y, 18, "bold", negro);
    y += 9;
    agregarTexto(`${datos.nivelEstudios}`, 105, y, 15, "italic");
    y += 6;
    agregarTexto(`${datos.institucion}`, 105, y, 14);
    y += 5;
    agregarTexto(`${datos.inicioEdu} - ${datos.finEdu}`, 105, y, 14, "normal", negro);
    y += 6;
    doc.text("• " + datos.descEdu, 105, y + 3, { maxWidth: 90 });
    y += 40;

    // LOGROS
    doc.addImage(exitImg, "PNG", 105, y - 4, 6, 6);
    agregarTexto("LOGROS", 113, y, 18, "bold", negro);
    y += 9;
    agregarTexto("• " + datos.logroTitutlo, 105, y, 15);
    y += 6;
    agregarTexto(datos.logroDescrip, 105, y-1, 14);

    doc.save(`Curriculum ${datos.nombre || "sin_nombre"}.pdf`);
  } catch (error) {
    alert("Error al generar PDF: " + (error instanceof Error ? error.message : String(error)));
    console.error("Error al generar PDF:", error);
  }
}
