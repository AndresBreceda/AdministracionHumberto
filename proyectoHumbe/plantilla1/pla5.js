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

    const azul = "#003049";
    const gris = "#d9d9d9";
    const negro = "#000000";
    const blanco = "#ffffff";

    // Fondo izquierdo gris
    doc.setFillColor(gris);
    doc.rect(0, 0, 70, 297, "F");

    // Foto circular
    const palmer = await imgBase64("palmer.png");
    doc.setFillColor(blanco);
    doc.circle(35, 40, 25, "F");
    doc.addImage(palmer, "PNG", 10, 15, 50, 50);

    // Nombre y puesto
    doc.setFontSize(20);
    doc.setTextColor(azul);
    doc.setFont("helvetica", "bold");
    doc.text("Camila Torres", 80, 30);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(negro);
    doc.text("Especialista en Mercadotecnia Digital", 80, 38);

    // Perfil personal
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.text("Perfil", 10, 80);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(negro);
    doc.text(
      "Apasionada por las estrategias digitales, con experiencia en campañas de marketing, análisis de datos y posicionamiento de marca. Creativa, analítica y orientada a resultados.",
      10,
      85,
      { maxWidth: 50 }
    );

    // Contacto
    const iconTel = await imgBase64("img/telefono.png");
    const iconCorreo = await imgBase64("img/correo.png");
    const iconMapa = await imgBase64("img/mapa.png");

    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.text("Contacto", 10, 115);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(negro);

    doc.addImage(iconTel, "PNG", 10, 118, 5, 5);
    doc.text("555-987-6543", 18, 122);

    doc.addImage(iconCorreo, "PNG", 10, 124, 5, 5);
    doc.text("camila.torres@marketingpro.com", 18, 128);

    doc.addImage(iconMapa, "PNG", 10, 130, 5, 5);
    doc.text("Guadalajara, México", 18, 134);

    // Idiomas
    const iconCheck = await imgBase64("img/exito.png");

    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.text("Idiomas", 10, 155);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(negro);

    doc.addImage(iconCheck, "PNG", 10, 158, 5, 5);
    doc.text("Español (Nativo)", 18, 162);

    doc.addImage(iconCheck, "PNG", 10, 164, 5, 5);
    doc.text("Inglés (Intermedio)", 18, 168);

    // Experiencia laboral
    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.setFontSize(13);
    doc.text("Experiencia Laboral", 80, 60);

    doc.setFontSize(10);
    doc.setTextColor(negro);
    doc.setFont("helvetica", "normal");

    doc.text("2021 - Presente", 80, 68);
    doc.setFont("helvetica", "bold");
    doc.text("Agencia Creativa MX", 120, 68);
    doc.setFont("helvetica", "normal");
    doc.text("Gestión de campañas de marketing digital, SEO y análisis de métricas.", 80, 74, {
      maxWidth: 110,
    });

    doc.text("2019 - 2021", 80, 84);
    doc.setFont("helvetica", "bold");
    doc.text("MarketUp Solutions", 120, 84);
    doc.setFont("helvetica", "normal");
    doc.text("Estrategias de branding, publicidad en redes y marketing de contenidos.", 80, 90, {
      maxWidth: 110,
    });

    // Educación
    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.setFontSize(13);
    doc.text("Educación", 80, 110);

    doc.setFontSize(10);
    doc.setTextColor(negro);
    doc.setFont("helvetica", "normal");

    doc.text("2015 - 2019", 80, 118);
    doc.setFont("helvetica", "bold");
    doc.text("Universidad de Guadalajara", 110, 118);
    doc.setFont("helvetica", "normal");
    doc.text("Licenciatura en Mercadotecnia", 80, 124);

    // Habilidades
    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.setFontSize(13);
    doc.text("Habilidades", 80, 145);

    doc.setFontSize(10);
    doc.setTextColor(negro);
    doc.setFont("helvetica", "normal");

    const habilidades = [
      "Google Ads",
      "Meta Ads",
      "SEO/SEM",
      "Email Marketing",
      "Canva",
      "Google Analytics",
      "CRM (HubSpot)",
    ];
    let y = 153;
    for (let i = 0; i < habilidades.length; i += 2) {
      doc.text(`• ${habilidades[i]}`, 80, y);
      if (habilidades[i + 1]) doc.text(`• ${habilidades[i + 1]}`, 130, y);
      y += 6;
    }

    doc.save("cv_mercadotecnia.pdf");
  } catch (err) {
    alert("Error al generar PDF. Mira la consola");
    console.error(err);
  }
}
