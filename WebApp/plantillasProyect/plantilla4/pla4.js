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
    
    // Cargar imágenes
    const perfil = await imgBase64("img/pratt.png");
    const telefono = await imgBase64("img/telefono.png");
    const correo = await imgBase64("img/correo.png");
    const ubicacion = await imgBase64("img/ubicacion.png");
    const internet = await imgBase64("img/internet.png");

    // Colores
    const verde = "#4F8A72";
    const grisClaro = "#F3F5F4";

    // Fondo izquierdo
    doc.setFillColor(grisClaro);
    doc.rect(0, 0, 80, 297, "F");

    // Foto de perfil
    doc.setFillColor(verde);
    doc.circle(40, 40, 30, "F");
    doc.addImage(perfil, "PNG", 20, 20, 40, 40);

    // Nombre y título
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text("ENRIQUE", 90, 30);
    doc.text("GUTIERREZ", 90, 40);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(verde);
    doc.textWithLink("Nutricionista", 90, 50, { url: "#" });

    doc.setTextColor(0, 0, 0);
    doc.text("32 años de edad", 90, 58);

    // Sección "Sobre mí"
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("SOBRE MÍ", 10, 75);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Soy un nutricionista dedicado y apasionado. Tengo 6 años de experiencia en asesoramiento nutricional personalizado y educación alimentaria.", 10, 80, { maxWidth: 60 });

    // Habilidades
    doc.setFont("helvetica", "bold");
    doc.text("HABILIDADES", 10, 102);
    doc.setFont("helvetica", "normal");
    const habilidades = [
      "Habilidades de escucha activa",
      "Trabajo en equipo",
      "Orientación al cliente",
      "Solución de problemas",
      "Toma de decisiones informadas",
      "Adaptabilidad"
    ];
    habilidades.forEach((hab, i) => {
      doc.circle(10, 108 + i * 6, 0.7, "F");
      doc.text(hab, 13, 109 + i * 6);
    });

    // Idiomas
    doc.setFont("helvetica", "bold");
    doc.text("IDIOMAS", 10, 150);
    doc.setFont("helvetica", "normal");
    doc.text("Inglés intermedio", 10, 157);
    doc.setFillColor(verde);
    doc.rect(10, 160, 40, 4, "F");
    doc.setFillColor("#ddd");
    doc.rect(50, 160, 20, 4, "F");

    // Contacto
    doc.setFont("helvetica", "bold");
    doc.text("CONTACTO", 10, 175);

    const contactos = [
      { icon: telefono, text: "1234-5678" },
      { icon: correo, text: "hola@sitioincreible.com" },
      { icon: internet, text: "www.sitioincreible.com" },
      { icon: ubicacion, text: "Calle Cualquiera 123,\nCualquier Lugar" }
    ];

    let y = 182;
    for (const c of contactos) {
      doc.addImage(c.icon, "PNG", 10, y, 5, 5);
      doc.text(c.text, 17, y + 4);
      y += c.text.includes("\n") ? 12 : 8;
    }

    // Experiencia laboral
    doc.setFillColor(verde);
    doc.rect(80, 70, 130, 10, "F");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("EXPERIENCIA LABORAL", 90, 77);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    
    // Experiencia 1
    doc.setFont("helvetica", "bold");
    doc.text("2019 - Presente", 82, 90);
    doc.text("NUTRICIONISTA", 112, 90);
    doc.setFont("helvetica", "normal");
    doc.text("Centro de Salud Borcelle", 111, 96);
    doc.circle(111, 100, 0.7, "F");
    doc.text("Planes de alimentación personalizados.", 114, 101);
    doc.circle(111, 105, 0.7, "F");
    doc.text("Asesoramiento nutricional.", 114, 106);
    doc.circle(111, 110, 0.7, "F");
    doc.text("Planes de tratamiento integrados.", 114, 111);

    // Experiencia 2
    doc.setFont("helvetica", "bold");
    doc.text("2016 - 2017", 82, 125);
    doc.text("NUTRICIONISTA", 112, 125);
    doc.setFont("helvetica", "normal");
    doc.text("Ensigna", 111, 131);
    doc.circle(111, 135, 0.7, "F");
    doc.text("Evaluación dietética.", 114, 136);
    doc.circle(111, 140, 0.7, "F");
    doc.text("Diseño de planes de alimentación personalizados.", 114, 141);
    doc.circle(111, 145, 0.7, "F");
    doc.text("Asesoramiento nutricional.", 114, 146);

    // Educación
    doc.setFillColor(verde);
    doc.rect(80, 160, 130, 10, "F");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("EDUCACIÓN", 90, 167);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    
    // Educación 1
    doc.setFont("helvetica", "bold");
    doc.text("2010 - 2015", 82, 180);
    doc.text("LICENCIATURA EN NUTRICIÓN", 105, 180);
    doc.setFont("helvetica", "normal");
    doc.text("Universidad La Sierra", 105, 186);

    // Educación 2
    doc.setFont("helvetica", "bold");
    doc.text("2004 - 2009", 82, 195);
    doc.text("NIVEL SECUNDARIO", 105, 195);
    doc.setFont("helvetica", "normal");
    doc.text("Colegio Verde Bendito", 105, 201);

    doc.save("plantilla4.pdf");

  } catch (error) {
    alert("Ocurrió un error al generar el PDF. Revisa la consola.");
    console.error("Error al generar PDF:", error);
  }
}