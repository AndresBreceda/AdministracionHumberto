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
    reader.readAsDataURL(blob);
  });
}

async function generarPDF() {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "mm", "a4");

    const perfil = await imgBase64("img/oshi.png");
    const telefono = await imgBase64("img/telefono.png");
    const correo = await imgBase64("img/correo.png");
    const ubicacion = await imgBase64("img/ubicacion.png");
    const internet = await imgBase64("img/internet.png");

    const azulOscuro = "#2C3E50";
    const dorado = "#F39C12";
    const grisClaro = "#F8F9F9";
    const textoGris = "#34495E";

    // Encabezado principal
    doc.setFillColor(azulOscuro);
    doc.roundedRect(10, 10, 190, 40, 5, 5, "F");
    doc.addImage(perfil, "PNG", 15, 15, 30, 30);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Camila Herrera", 50, 25);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Diseñadora Gráfica | 29 años", 50, 33);

    // Sobre mí
    doc.setFontSize(14);
    doc.setTextColor(textoGris);
    doc.setFont("helvetica", "bold");
    doc.text("Sobre mí", 15, 60);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text("Creativa, detallista y apasionada por el diseño visual. He trabajado en agencias y como freelance, creando identidades visuales, material editorial y diseño UX/UI.", 15, 65, { maxWidth: 180 });

    // Habilidades
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(textoGris);
    doc.text("Habilidades", 15, 85);
    doc.setFont("helvetica", "normal");
    const habilidades = [
      "Adobe Photoshop e Illustrator", "Diseño UX/UI", "Branding",
      "Tipografía", "Diseño editorial", "Pensamiento creativo"
    ];
    habilidades.forEach((hab, i) => {
      doc.setFillColor(dorado);
      doc.circle(17, 90 + i * 6, 1, "F");
      doc.text(hab, 22, 92 + i * 6);
    });

    // Idiomas
    doc.setFont("helvetica", "bold");
    doc.setTextColor(textoGris);
    doc.text("Idiomas", 15, 130);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text("Inglés Avanzado", 15, 136);
    doc.setFillColor(dorado);
    doc.roundedRect(15, 140, 60, 4, 1, 1, "F");
    doc.setFillColor("#ddd");
    doc.roundedRect(75, 140, 10, 4, 1, 1, "F");

    // Contacto
    doc.setFont("helvetica", "bold");
    doc.setTextColor(textoGris);
    doc.text("Contacto", 15, 155);

    const contactos = [
      { icon: telefono, text: "+52 555 123 4567" },
      { icon: correo, text: "camila@creativos.com" },
      { icon: internet, text: "www.camiladesign.com" },
      { icon: ubicacion, text: "CDMX, México" }
    ];
    let y = 160;
    for (const c of contactos) {
      doc.addImage(c.icon, "PNG", 15, y, 5, 5);
      doc.text(c.text, 22, y + 4);
      y += c.text.includes("\n") ? 12 : 8;
    }

    // Experiencia Laboral
    doc.setFillColor(grisClaro);
    doc.roundedRect(100, 60, 100, 60, 3, 3, "F");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(textoGris);
    doc.text("Experiencia", 105, 68);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text("2021 - Actualidad", 105, 75);
    doc.text("Diseñadora Freelance", 105, 81);
    doc.circle(105, 86, 0.7, "F");
    doc.text("Diseño de identidad visual", 108, 87);
    doc.circle(105, 91, 0.7, "F");
    doc.text("Diseño UX para apps", 108, 92);

    doc.text("2018 - 2020", 105, 102);
    doc.text("Diseñadora en Agencia Blip", 105, 108);
    doc.circle(105, 113, 0.7, "F");
    doc.text("Publicidad impresa y digital", 108, 114);
    doc.circle(105, 118, 0.7, "F");
    doc.text("Edición de contenido gráfico", 108, 119);

    // Educación
    doc.setFillColor(grisClaro);
    doc.roundedRect(100, 130, 100, 45, 3, 3, "F");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(textoGris);
    doc.text("Educación", 105, 138);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text("2013 - 2017", 105, 145);
    doc.text("Lic. en Diseño Gráfico", 105, 150);
    doc.text("Universidad del Arte CDMX", 105, 155);

    doc.save("plantilla 9.pdf");

  } catch (error) {
    alert("Ocurrió un error al generar el PDF.");
    console.error("Error al generar PDF:", error);
  }
}
