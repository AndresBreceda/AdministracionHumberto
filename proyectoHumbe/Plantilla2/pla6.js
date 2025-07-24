document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("btnGenerar");
  if (boton) {
    boton.addEventListener("click", generarPDF);
  } else {
    console.error("❌ No se encontró el botón con id 'btnGenerar'");
  }
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

    const azul = "#003366";
    const gris = "#4d4d4d";
    const negro = "#000000";

    // Logo
    const trent = await imgBase64("trent.png");
    doc.addImage(trent, "PNG", 160, 10, 40, 30);

    // Nombre y título
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(negro);
    doc.text("Dr. Fernando Ruiz", 20, 25);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(azul);
    doc.text("Médico Cirujano Especialista", 20, 33);

    // Línea divisoria
    doc.setDrawColor(azul);
    doc.setLineWidth(1);
    doc.line(20, 45, 190, 45);

    // Columna izquierda
    let yLeft = 55;
    const xLeft = 20;
    const anchoColIzq = 70;

    const iconos = {
      telefono: await imgBase64("img/telefono.png"),
      correo: await imgBase64("img/correo.png"),
      social: await imgBase64("img/redsocial.png"),
      mapa: await imgBase64("img/casa.png"),
    };

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(azul);
    doc.text("Contacto", xLeft, yLeft);
    yLeft += 8;

    const datosContacto = [
      { texto: "(+52) 555 123 4567", img: iconos.telefono },
      { texto: "fernando.ruiz@medsalud.com", img: iconos.correo },
      { texto: "@drfernandoruiz", img: iconos.social },
      { texto: "Monterrey, México", img: iconos.mapa },
    ];

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(gris);
    for (const dato of datosContacto) {
      doc.addImage(dato.img, "PNG", xLeft, yLeft - 3, 5, 5);
      doc.text(dato.texto, xLeft + 8, yLeft);
      yLeft += 7;
    }

    yLeft += 5;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.text("Idiomas", xLeft, yLeft);
    yLeft += 7;

    doc.setFont("helvetica", "normal");
    ["Español (nativo)", "Inglés (avanzado)"].forEach(i => {
      doc.text("• " + i, xLeft, yLeft);
      yLeft += 6;
    });

    yLeft += 7;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.text("Sobre mí", xLeft, yLeft);
    yLeft += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(gris);
    const sobreMi = "Médico comprometido con el bienestar de sus pacientes, con más de 10 años de experiencia en cirugía general y atención hospitalaria. Enfocado en la actualización continua y el trato humano.";
    doc.text(sobreMi, xLeft, yLeft, {
      maxWidth: anchoColIzq,
      lineHeightFactor: 1.3,
    });

    // Columna derecha
    let yRight = 55;
    const xRight = 105;
    const anchoColDer = 85;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(azul);
    doc.text("Formación académica", xRight, yRight);
    yRight += 8;

    const formacion = [
      {
        periodo: "2010 - 2016",
        titulo: "LIC. EN MEDICINA GENERAL",
        lugar: "UNAM, Ciudad de México",
      },
      {
        periodo: "2017 - 2019",
        titulo: "ESPECIALIDAD EN CIRUGÍA GENERAL",
        lugar: "Hospital Ángeles, Monterrey",
      },
    ];

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(negro);
    for (const edu of formacion) {
      doc.text(`${edu.periodo} - ${edu.titulo}`, xRight, yRight);
      yRight += 5;
      doc.setTextColor(gris);
      doc.text(edu.lugar, xRight, yRight);
      yRight += 8;
      doc.setTextColor(negro);
    }

    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.text("Experiencia laboral", xRight, yRight);
    yRight += 8;

    const trabajos = [
      {
        periodo: "2019 - PRESENTE",
        empresa: "HOSPITAL GENERAL DE MONTERREY",
        desc: "Cirujano en turno, encargado de cirugías programadas y atención de urgencias quirúrgicas.",
      },
      {
        periodo: "2016 - 2019",
        empresa: "CLÍNICA VIDA",
        desc: "Atención médica general, seguimiento a pacientes crónicos y apoyo en cirugías menores.",
      },
    ];

    for (const job of trabajos) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(negro);
      doc.text(job.empresa, xRight, yRight);
      yRight += 5;

      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.setTextColor(azul);
      doc.text(job.periodo, xRight, yRight);
      yRight += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(gris);
      doc.text(job.desc, xRight, yRight, {
        maxWidth: anchoColDer,
        lineHeightFactor: 1.4,
      });

      yRight += 12;
      doc.setTextColor(negro);
    }

    doc.setFont("helvetica", "bold");
    doc.setTextColor(azul);
    doc.text("Logros", xRight, yRight);
    yRight += 7;

    const logroImg = await imgBase64("img/exito.png");
    const logros = [
      "Reconocimiento por Excelencia Médica 2023",
      "Publicación en Revista Mexicana de Cirugía",
      "Ponente en el Congreso Nacional de Salud 2022",
    ];

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(negro);
    for (const l of logros) {
      if (logroImg) {
        doc.addImage(logroImg, "PNG", xRight, yRight - 3, 5, 5);
      }
      doc.text(l, xRight + 7, yRight, {
        maxWidth: anchoColDer - 10,
        lineHeightFactor: 1.3,
      });
      yRight += 8;
    }

    doc.save("pantilla 6.pdf");
  } catch (error) {
    alert("❌ Error al generar el PDF. Revisa la consola.");
    console.error("Error al generar PDF:", error);
  }
}
