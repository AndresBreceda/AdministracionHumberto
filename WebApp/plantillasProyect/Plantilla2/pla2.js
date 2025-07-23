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
 // Colores
    const azul = "#0D3B66";
    const azulClaro = "#336699";
    const gris = "#f2f2f2";

    // Fondo lateral izquierdo
    doc.setFillColor(13, 59, 102); // Azul
    doc.rect(0, 0, 73, 297, "F");
    doc.setFillColor(13, 59, 102); // azul oscuro
    doc.triangle(210, 0, 140, 0, 210, 60, "F");

    doc.setFillColor(13, 59, 102); // azul oscuro inferior
    doc.triangle(210, 270, 210, 297, 140, 297, "F");

    // Foto
    const foto = await imgBase64("img/crist.jpg");
    doc.addImage(foto, "PNG", 18, 20, 43, 43);

    // Nombre
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("ALAN", 80, 30);
    doc.text("LUNA", 80, 38);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("ABOGADO PROFESIONAL", 80, 46);

    // Sección SOBRE MÍ
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("• SOBRE MÍ", 10, 70);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Soy una persona proactiva, organizada y responsable, con buenas relaciones interpersonales. Me destaco por el buen trabajo en equipo, la rápida toma de decisiones y el buen manejo de la presión. Busco un puesto de trabajo desafiante para continuar aprendiendo.", 10, 78, { maxWidth: 60 });

    // Datos de contacto con íconos
    const tel = await imgBase64("img/telefono.png");
    const correo = await imgBase64("img/correo.png");
    const red = await imgBase64("img/redSocial.png");
    const casa = await imgBase64("img/casa.png");

    doc.addImage(tel, "PNG", 10, 110, 5, 5);
    doc.text("1234 - 5678", 17, 114);
    doc.addImage(correo, "PNG", 10, 120, 5, 5);
    doc.text("alanlu@gmail.com", 17, 124);
    doc.addImage(red, "PNG", 10, 130, 5, 5);
    doc.text("www.facebook.com", 17, 134);
    doc.addImage(casa, "PNG", 10, 140, 5, 5);
    doc.text("Calle Cualquiera 123, Cualquier Lugar", 17, 144, { maxWidth: 50 });

    // EDUCACIÓN
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("• EDUCACIÓN", 10, 160);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Universidad Borcelle", 10, 167);
    doc.text("Lic. en Administración, 2018", 10, 172);
    doc.text("• Graduado con honores académicos", 10, 177);
    doc.text("Colegio Secundario La Frida", 10, 185);
    doc.text("Bachiller en Bienes y Servicios, 2012", 10, 190);
    doc.text("• Graduado con honores académicos", 10, 195);

    // EXPERIENCIA
    doc.setTextColor(13, 59, 102);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("• EXPERIENCIA", 80, 60);

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("ASISTENTE DE GERENCIA", 80, 68);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text("Empresa Ensigna, Ago 2019 - Presente", 80, 73);
    doc.setFont("helvetica", "normal");
    doc.text("Asistencia administrativa integral a Gerencia.", 80, 78);
    doc.text("Seguimiento de Agenda. Revisión de Idoneidad.", 80, 83);
    doc.text("Control de archivo.", 80, 88);

    doc.setFont("helvetica", "bold");
    doc.text("ASISTENTE ADMINISTRATIVO", 80, 96);
    doc.setFont("helvetica", "italic");
    doc.text("Empresa Borcelle, Ene 2016 - Jul 2017", 80, 101);
    doc.setFont("helvetica", "normal");
    doc.text("Recepción de Clientes. Manejo de Conmutador.", 80, 106);
    doc.text("Organización de libros de entrada y salida.", 80, 111);

    doc.setFont("helvetica", "bold");
    doc.text("PASANTE ADMINISTRATIVO", 80, 119);
    doc.setFont("helvetica", "italic");
    doc.text("Industrias Ariova, Ene 2016 - Jul 2017", 80, 124);
    doc.setFont("helvetica", "normal");
    doc.text("Recepción de Clientes. Mantenimiento de archivo.", 80, 129);

    // HABILIDADES
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(13, 59, 102);
    doc.text("• HABILIDADES", 80, 145);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("• Manejo de paquete informático", 80, 152);
    doc.text("• Software de administración avanzado", 80, 157);
    doc.text("• Software de diseño avanzado", 80, 162);
    doc.text("• Manejo integral de Redes Sociales", 80, 167);
    doc.text("• Idioma Inglés Avanzado", 80, 172);
  doc.save("plantilla2.pdf");
  } catch (error) {
    // Mostrar notificación en pantalla
    alert("Ocurrió un error al generar el PDF. Revisa la consola.");
    console.error("Error al generar PDF:", error);
  }
}
