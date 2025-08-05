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

export async function generarPDF5(datos: DatosPDF) {
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
    const azul = "#0a2c56", negro = "#000000", gris = "#666666";
    let fotoBase64 = "";

    if (datos.foto) {
      fotoBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(datos.foto!);
      });
    }

    // Íconos
    const [telImg, correoImg, traImg, virreImg, exitImg, idiomaImg] = await Promise.all([
      imgBase64("/img5/telefono.png"),
      imgBase64("/img5/correo.png"),
      imgBase64("/img5/trabajar.png"),
      imgBase64("/img5/virrete.png"),
      imgBase64("/img5/exito.png"),
      imgBase64("/img5/idiomas.png"),
    ]);

    const agregarTexto = (text: string, x: number, y: number, size = 10, font = "normal", color = negro) => {
      doc.setFont("helvetica", font);
      doc.setFontSize(size);
      doc.setTextColor(color);
      doc.text(text, x, y);
    };

    // FOTO
    doc.roundedRect(130, 10, 60, 70, 5, 5, "F");
    if (fotoBase64) {
      doc.addImage(fotoBase64, "PNG", 130, 10, 60, 70);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(negro);
    doc.text(`${datos.nombre}`, 20, 25);
    doc.text(`${datos.apellidos}`, 20, 35);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(12);
    doc.setTextColor(azul);
    doc.text(`${datos.puesto}`, 20, 45);



    // CONTACTO
    let y = 55;
    const contacto = [
      { icono: telImg, texto: datos.telefono || "Sin teléfono" },
      { icono: correoImg, texto: datos.correo || "Sin correo" }
    ];
    contacto.forEach(c => {
      doc.addImage(c.icono, "PNG", 20, y - 3, 4, 4);
      agregarTexto(c.texto, 26, y);
      y += 8;
    });

    // SOBRE MÍ
    y = 85;
    agregarTexto("SOBRE MÍ", 20, y, 12, "bold", azul);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(gris);
    doc.text(datos.perfil || "Sin descripción", 20, y + 6, { maxWidth: 170 });

    // EXPERIENCIA
    y = 115;
    doc.addImage(traImg, "PNG", 20, y - 3, 8, 8);
    agregarTexto("EXPERIENCIA", 30, y + 3, 12, "bold", azul);
    y += 10;
    agregarTexto(`${datos.inicioExp || ""} - ${datos.finExp || ""} | ${datos.empresa || ""}`, 20, y, 10, "bold");
    y += 5;
    agregarTexto(datos.puesto || "", 20, y, 10, "italic");
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(negro);
    doc.text("• " + (datos.descExp || "Sin descripción"), 20, y + 4, { maxWidth: 170 });
    y += 12;

    // EDUCACIÓN
    y = 160;
    doc.addImage(virreImg, "PNG", 20, y - 4, 8, 8);
    agregarTexto("EDUCACIÓN", 30, y + 3, 12, "bold", azul);
    y += 9;
    agregarTexto(`${datos.inicioEdu || ""} - ${datos.finEdu || ""}`, 20, y, 10, "bold");
    y += 5;
    agregarTexto(`${datos.nivelEstudios || ""}`, 20, y, 10, "italic");
    y += 5;
    agregarTexto(`${datos.institucion || ""}`, 20, y);
    y += 6;
    if (datos.descEdu) {
      doc.setFont("helvetica", "normal");
      doc.setTextColor(negro);
      doc.text(datos.descEdu, 20, y, { maxWidth: 170 });
    }

    // HABILIDADES
    y = 200;
    doc.addImage(exitImg, "PNG", 20, y - 3, 8, 8);
    agregarTexto("HABILIDADES", 30, y + 3, 12, "bold", azul);
    y += 9.5;
    agregarTexto("• " + (datos.logroTitutlo || "Comunicación"), 20, y);
    agregarTexto("• " + (datos.logroDescrip || "Trabajo en equipo"), 20, y + 6);

    // IDIOMAS
    let x = 100;
    y = 200;
    doc.addImage(idiomaImg, "PNG", x - 5, y - 5, 8, 8);
    agregarTexto("IDIOMAS", x + 5, y, 12, "bold", azul);
    y += 7;
    agregarTexto("• " + (datos.idioma || "Español") + " (" + (datos.nivelIdioma || "Avanzado") + ")", x, y);

    // GUARDAR
    doc.save(`Curriculum ${datos.nombre || "sin_nombre"}.pdf`);
  } catch (error) {
    alert("Error al generar PDF: " + (error instanceof Error ? error.message : String(error)));
    console.error("Error al generar PDF:", error);
  }
}
