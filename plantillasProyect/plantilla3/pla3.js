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

    // === COLORES DE FONDO ===

        // Lado izquierdo (gris claro)
        doc.setFillColor(240, 240, 240); // Gris claro
        doc.rect(0, 0, 70, 297, "F"); // x, y, ancho, alto, "F" de Fill

        // Encabezado superior azul
        doc.setFillColor(27, 38, 59); // Azul oscuro
        doc.rect(70, 0, 140, 25, "F");

        // === FOTO ===
        const personaImg = await imgBase64("img/persona.jpg");
        const interImg = await imgBase64("img/internet.png");
        const correoImg = await imgBase64("img/correo.png");
        const teleImg = await imgBase64("img/telefono.png");
        const ubiImg = await imgBase64("img/ubicacion.png");
        doc.addImage(personaImg, "PNG", 15, 15, 40, 50);

        // Cuadro izquierdo gris claro
        doc.setFillColor(240, 240, 240);
        doc.rect(0, 0, 74, 297, "F");

        // Encabezado azul oscuro
        doc.setFillColor(27, 38, 59);
        doc.rect(70, 0, 140, 25, "F");

        // Foto
        doc.addImage(personaImg, "PNG", 15, 15, 40, 50);

        // Nombre y título
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.text("Manuel Navarro", 75, 15);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
        doc.text("CONTADOR", 75, 22);

        // CONTACTO con íconos
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("CONTACTO", 15, 75);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);

        doc.addImage(teleImg, "PNG", 15, 78, 5, 5);
        doc.text("449-208-4865", 23, 83);

        doc.addImage(correoImg, "PNG", 15, 86, 5, 5);
        doc.text("manuel@gmail.com", 23, 91);

        doc.addImage(interImg, "PNG", 15, 94, 5, 5);
        doc.text("www.unsitogenial.es", 23, 99);

        doc.addImage(ubiImg, "PNG", 15, 102, 5, 5);
        doc.text("Calle cualquiera 123", 23, 107);
        doc.text("Cualquier lugar, CP:12345", 23, 112);

        // LOGROS
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("LOGROS", 15, 125);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text("- Carnet de conducir", 15, 132);
        doc.text("- Coche propio", 15, 138);
        doc.text("- Disponibilidad para viajar", 15, 144);

        // HERRAMIENTAS
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("HERRAMIENTAS", 15, 160);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text("- CONTABILIDAD", 15, 167);
        doc.text("- ASESORÍA FINANCIERA", 15, 173);
        doc.text("- HOJAS DE CÁLCULO", 15, 179);

        // PERFIL
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("MI PERFIL", 80, 35);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text("Lorem ipsum dolor sit amet, consectetur adipiscing elit,\n" +
                 "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 80, 42);

        // EXPERIENCIA
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("EXPERIENCIA", 80, 65);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.text("ASESOR FISCAL", 80, 72);
        doc.setFont("helvetica", "italic");
        doc.text("Soto y Ochoa (Enero 2012 – Julio 2021)", 80, 78);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 80, 84);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.text("ASESOR FINANCIERO", 80, 94);
        doc.setFont("helvetica", "italic");
        doc.text("Borcelle (Enero 2012 – Julio 2021)", 80, 100);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 80, 106);

        // FORMACIÓN
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("FORMACIÓN", 80, 125);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text("UNIVERSIDAD BORCELLE", 80, 131);
        doc.text("(2003 - 2008)", 80, 137);
        doc.text("Doble grado en Derecho y Economía.", 80, 143);

        // IDIOMAS
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("IDIOMAS", 80, 160);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text("ESPAÑOL     Nativo", 80, 166);
        doc.text("INGLÉS      Nivel Alto", 80, 172);
        doc.text("ITALIANO    Nivel Bajo", 80, 178);

        doc.save("plantilla3.pdf");

    } catch (error) {
    // Mostrar notificación en pantalla
    alert("Ocurrió un error al generar el PDF. Revisa la consola.");
    console.error("Error al generar PDF:", error);
  }
}