document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("btnGenerar");
  if (boton) {
    boton.addEventListener("click", generarPDF);
  } else {
    console.error("❌ No se encontró el botón con id 'btnGenerar'");
  }
});

async function imgBase64(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`No se pudo cargar la imagen: ${url}`);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Error leyendo imagen como base64"));
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.error(`❌ Error al convertir imagen: ${url}`, e);
    return "";
  }
}

async function generarPDF() {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "mm", "a4");

    const azul = "#1A237E";
    const gris = "#616161";
    const blanco = "#ffffff";

    // Fondo columna izquierda
    doc.setFillColor(azul);
    doc.rect(0, 0, 70, 297, "F");

    // FOTO
    const foto = await imgBase64("img/per.png");
    if (foto) {
      doc.setFillColor(blanco);
      doc.circle(105, 25, 20, "F");
      doc.addImage(foto, "PNG", 85, 5, 40, 40);
    }

    // Nombre y título
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(azul);
    doc.text("Luis Martínez", 105, 55, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(gris);
    doc.text("Ingeniero en Ciberseguridad", 105, 63, { align: "center" });

    // Información lateral izquierda
    let yLeft = 80;
    const xLeft = 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(blanco);
    doc.text("Contacto", xLeft, yLeft);
    yLeft += 7;

    const iconos = {
      tel: await imgBase64("img/tel.png"),
      mail: await imgBase64("img/co.png"),
      red: await imgBase64("img/int.png"),
      map: await imgBase64("img/ubi.png"),
    };

    const contacto = [
      { texto: "(+52) 998 765 4321", img: iconos.tel },
      { texto: "luis.mtz@seguridadpro.com", img: iconos.mail },
      { texto: "linkedin.com/in/luismtz", img: iconos.red },
      { texto: "Guadalajara, México", img: iconos.map },
    ];

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    for (const item of contacto) {
      if (item.img) {
        doc.addImage(item.img, "PNG", xLeft, yLeft - 4, 5, 5);
      }
      doc.text(item.texto, xLeft + 8, yLeft);
      yLeft += 6;
    }

    yLeft += 6;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(blanco);
    doc.text("Idiomas", xLeft, yLeft);
    yLeft += 6;

    doc.setFont("helvetica", "normal");
    ["Español nativo", "Inglés avanzado", "Francés básico"].forEach(idioma => {
      doc.text("• " + idioma, xLeft, yLeft);
      yLeft += 5;
    });

    yLeft += 6;
    doc.setFont("helvetica", "bold");
    doc.text("Sobre mí", xLeft, yLeft);
    yLeft += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const sobreMi = "Profesional en ciberseguridad con más de 5 años de experiencia protegiendo infraestructuras críticas. Apasionado por la criptografía, la defensa ofensiva y la automatización de análisis forense.";
    doc.text(sobreMi, xLeft, yLeft, {
      maxWidth: 50,
      lineHeightFactor: 1.2,
    });

    // Contenido derecho
    let yRight = 80;
    const xRight = 80;

    const seccion = (titulo) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(azul);
      doc.text(titulo, xRight, yRight);
      yRight += 5;
      doc.setDrawColor("#CCCCCC");
      doc.setLineWidth(0.5);
      doc.line(xRight, yRight, 190, yRight);
      yRight += 4;
    };

    seccion("Formación académica");

    const formacion = [
      { periodo: "2016 - 2020", titulo: "Ing. en Ciberseguridad", lugar: "Instituto Tecnológico de México" },
      { periodo: "2021", titulo: "Diplomado en Análisis Forense", lugar: "CyberSec Academy" },
    ];

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor("#000000");
    for (const edu of formacion) {
      doc.text(`${edu.periodo} - ${edu.titulo}`, xRight, yRight);
      yRight += 4;
      doc.setTextColor(gris);
      doc.text(edu.lugar, xRight, yRight);
      yRight += 6;
      doc.setTextColor("#000000");
    }

    seccion("Experiencia laboral");

    const trabajos = [
      {
        periodo: "2021 - PRESENTE",
        empresa: "DEFENSE SEC",
        desc: "Implementación de políticas de seguridad, pruebas de penetración y respuesta a incidentes.",
      },
      {
        periodo: "2019 - 2021",
        empresa: "CYBERWALL",
        desc: "Monitoreo de redes, auditorías de seguridad y capacitación interna para empleados.",
      },
    ];

    for (const job of trabajos) {
      // Empresa
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor("#000000");
      doc.text(job.empresa, xRight, yRight);
      yRight += 5;

      // Periodo
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(gris);
      doc.text(job.periodo, xRight, yRight);
      yRight += 5;

      // Descripción
      doc.setTextColor("#333333");
      doc.text(job.desc, xRight, yRight, {
        maxWidth: 110,
        lineHeightFactor: 1.4,
      });

      yRight += 12; // más espacio entre trabajos
    }

    seccion("Logros");

    const logroIcon = await imgBase64("img/trof.png");
    const logros = [
      "Certificado CEH (Certified Ethical Hacker)",
      "Ponente en el Congreso Nacional de Seguridad 2023",
      "Automatización de reportes de amenazas con Python",
    ];

    doc.setFontSize(10);
    for (const l of logros) {
      if (logroIcon) doc.addImage(logroIcon, "PNG", xRight, yRight - 3, 5, 5);
      doc.text(l, xRight + 7, yRight, { maxWidth: 105 });
      yRight += 6;
    }

    doc.save("plantilla 7.pdf");
  } catch (error) {
    alert("❌ Error al generar el PDF. Revisa la consola.");
    console.error("Error al generar PDF:", error);
  }
}
