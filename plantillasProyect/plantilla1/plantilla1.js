document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("btnGenerar");
  boton.addEventListener("click", generarPDF);
});
async function imgBase64(url) {
  const response = await fetch(url);
  const blob = await response.blob();

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob); // Esto convierte a base64
  });
}

async function generarPDF() {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "mm", "a4");

    // Colores y estilos
    const azul = "#0a2c56";
    const negro = "#000000";
    const gris = "#666666";

    // Título
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(negro);
    doc.text("TU NOMBRE", 20, 25);

    doc.setFontSize(12);
    doc.setTextColor(azul);
    doc.text("PROGRAMADOR", 20, 32);

    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(20, 36, 190, 36);

    // Columna izquierda
    // Cargar imagen justo después del título
const imgElement = document.getElementById("foto");

await new Promise(resolve => {
  if (imgElement.complete) return resolve();
  imgElement.onload = resolve;
});

const correoImg = await imgBase64("img/correo.png");
const mapaImg = await imgBase64("img/mapa.png");
const messi = await imgBase64("messi.png");
const socialImg = await imgBase64("img/social.png");
const telImg = await imgBase64("img/telefono.png");
const traImg = await imgBase64("img/trabajar.png");
const virreImg = await imgBase64("img/virrete.png");
const exitImg = await imgBase64("img/exito.png");

doc.setDrawColor(0);
doc.setFillColor(1, 231, 249); //RGB Azul claro
doc.ellipse(48, 70, 34, 32, "F");
// doc.ellipse(x, y, radioX, radioY, style);

// Imagen debajo del título, alineada a la izquierda
doc.addImage(messi, "PNG", 20, 36, 55, 55);
// doc.addImage(imageData, format, x, y, width, height);


// Ajustamos punto de inicio de la columna izquierda
let y = 110;



    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.setFontSize(14);
    doc.text("Sobre ti", 20, y);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(gris);
    doc.setFontSize(10);
    doc.text("Lionel Messi es un futbolista argentino nacido en Rosario en 1987, considerado uno de los mejores jugadores de todos los tiempos", 20, y + 7, { maxWidth: 70 });

    y += 30;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.setFontSize(14);
    doc.text("Contacto", 20, y);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(negro);
    doc.setFontSize(10);
    y += 7;

// Teléfono
doc.addImage(telImg, "PNG", 20, y - 3, 4, 4); // x=20, y=ajustado
doc.text("(Telefono)", 26, y); // x=26: espacio después de la imagen
y += 6;

// Correo
doc.addImage(correoImg, "PNG", 20, y - 3, 4, 4);
doc.text("(Correo)", 26, y);
y += 6;

// Red Social
doc.addImage(socialImg, "PNG", 20, y - 3, 4, 4);
doc.text("(Red Social)", 26, y);
y += 6;

// Dirección
doc.addImage(mapaImg, "PNG", 20, y - 3, 4, 4);
doc.text("(Dirección)", 26, y);
y += 6;


    y += 5;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.setFontSize(14);
    doc.text("Idiomas", 20, y);

    const idioma = [
      "Español",
      "Ingles",
      "Ejemplo",
    ];
    doc.setFont("helvetica", "normal");
    doc.setTextColor(negro);
    doc.setFontSize(10);
    y += 7;
    idioma.forEach(idioma => {
      doc.text("• " + idioma, 20, y);
      y += 5;
    });

    doc.setDrawColor("#cccccc");
    doc.setLineWidth(0.5);
    doc.line(100, 40, 100, 280);

    // Columna derecha
    let yRight = 50;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.setFontSize(14);
    doc.text("Experiencia escolar", 110, yRight);
    doc.addImage(virreImg, "PNG", 175, yRight - 6, 10, 10); // x=175, y ajustado, tamaño 10x10 mm


    doc.setFont("helvetica", "normal");
    doc.setTextColor(negro);
    doc.setFontSize(10);
    yRight += 7;
    doc.text("2017 - 2018", 110, yRight);
    doc.setFont("helvetica", "bold");
    doc.text("CERTIFICATE", 140, yRight);
    doc.setFont("helvetica", "normal");
    yRight += 5;
    doc.text("UNIVERSITY NAME", 140, yRight);

    yRight += 7;
    doc.text("2014 - 2017", 110, yRight);
    doc.setFont("helvetica", "bold");
    doc.text("BACHELORS DEGREE", 140, yRight);
    doc.setFont("helvetica", "normal");
    yRight += 5;
    doc.text("UNIVERSITY NAME", 140, yRight);

    yRight += 15;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.setFontSize(14);
    doc.text("Experiencia laboral", 110, yRight);
    doc.addImage(traImg, "PNG", 175, yRight - 6, 10, 10); // x=175, y ajustado, tamaño 10x10 mm


    yRight += 7;
    const experiencias = [
      {
        periodo: "2020 - PRESENT",
        empresa: "COMPANY NAME",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy."
      },
      {
        periodo: "2019 - 2020",
        empresa: "COMPANY NAME",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy."
      },
      {
        periodo: "2018 - 2019",
        empresa: "COMPANY NAME",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy."
      }
    ];

    doc.setFont("helvetica", "normal");
    doc.setTextColor(negro);
    doc.setFontSize(10);
    experiencias.forEach(exp => {
      yRight += 7;
      doc.text(exp.periodo, 110, yRight);
      doc.setFont("helvetica", "bold");
      doc.text(exp.empresa, 140, yRight);
      doc.setFont("helvetica", "normal");
      yRight += 5;
      doc.text(exp.desc, 140, yRight, { maxWidth: 60 });
      yRight += 10;
    });

    yRight += 15;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.setFontSize(14);
    doc.text("Logros extracurriculares", 110, yRight);
    doc.addImage(exitImg, "PNG", 175, yRight - 6, 10, 10); // x=175, y ajustado, tamaño 10x10 mm


    const logro = [
      "Logro",
      "Logro",
      "Logro",
    ];

    doc.setFont("helvetica", "normal");
    doc.setTextColor(negro);
    doc.setFontSize(10);
    yRight += 7;

    logro.forEach(l => {
      doc.text("• " + l, 110, yRight, { maxWidth: 80 });
      yRight += 6; // Más espacio entre líneas
    });


    doc.save("plantilla1.pdf");
  } catch (error) {
    // Mostrar notificación en pantalla
    alert("Ocurrió un error al generar el PDF. Revisa la consola.");
    console.error("Error al generar PDF:", error);
  }
}
