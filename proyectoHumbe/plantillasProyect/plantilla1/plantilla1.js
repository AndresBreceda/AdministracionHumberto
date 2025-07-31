// Espera al DOM
document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("btnGenerar");
  boton.addEventListener("click", generarPDF);
});

// Convertir imagen a base64
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
  try{
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("p", "mm", "a4");

  // Carga imágenes necesarias
  const messi = await imgBase64("person.jpg");
  const telImg = await imgBase64("img/telefono.png");
  const correoImg = await imgBase64("img/correo.png");
  const mapaImg = await imgBase64("img/mapa.png");
  const socialImg = await imgBase64("img/social.png");
  const traImg = await imgBase64("img/trabajar.png");
  const virreImg = await imgBase64("img/virrete.png");
  const exitImg = await imgBase64("img/exito.png");
  const idiomaImg = await imgBase64("img/idiomas.png");

  // Estilos
  const azul = "#0a2c56";
  const negro = "#000000";
  const gris = "#666666";

  agregarFoto(doc, messi);
  agregarEncabezado(doc, azul, negro);
  agregarContacto(doc, telImg, correoImg, mapaImg, socialImg);
  agregarSobreMi(doc, azul, gris);
  agregarExperiencia(doc, azul, negro, traImg);
  agregarEducacion(doc, azul, negro, virreImg);
  agregarHabilidades(doc, azul, negro, exitImg);
  agregarIdiomas(doc, azul, negro, idiomaImg);

  doc.save("plantilla1.pdf");
} catch (error) {
    // Mostrar notificación en pantalla
    alert("Ocurrió un error al generar el PDF. Revisa la consola.");
    console.error("Error al generar PDF:", error);
  }
}

function agregarFoto(doc, imagen) {
  doc.roundedRect(130, 10, 60, 70, 5, 5, "F");
  doc.addImage(imagen, "PNG", 130, 10, 60, 70);
}

function agregarEncabezado(doc, azul, negro) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(negro);
  doc.text("ANDRADE", 20, 25);
  doc.text("FRANCISCO", 20, 35);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(12);
  doc.setTextColor(azul);
  doc.text("ESPECIALISTA EN MARKETING", 20, 45);
}

function agregarContacto(doc, telImg, correoImg, mapaImg, socialImg) {
  let y = 48;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor("#000000");

  doc.addImage(telImg, "PNG", 20, y, 4, 4);
  doc.text("(55) 1234-5678", 26, y + 3);
  y += 8;

  doc.addImage(correoImg, "PNG", 20, y, 4, 4);
  doc.text("hola@sitioincreible.com", 26, y + 3);
  y += 8;

  doc.addImage(mapaImg, "PNG", 20, y, 4, 4);
  doc.text("Calle Cualquiera 123, Cualquier Lugar.", 26, y + 3);
  y += 8;

  doc.addImage(socialImg, "PNG", 20, y, 4, 4);
  doc.text("Instagram.com", 26, y + 3);
}

function agregarSobreMi(doc, azul, gris) {
  let y = 85;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(azul);
  doc.text("SOBRE MÍ", 20, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(gris);
  const texto = "Analista de marketing apasionado y orientado a resultados con experiencia probada en el desarrollo e implementación de estrategias efectivas. Especializado en convertir datos complejos en soluciones creativas que impulsan el crecimiento empresarial. Listo para aportar mi experiencia analítica y enfoque centrado en el cliente para alcanzar el éxito en tu equipo de marketing.";
  doc.text(texto, 20, y + 6, { maxWidth: 170 });
}

function agregarExperiencia(doc, azul, negro, traImg) {
  let y = 115;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(azul);

  // Imagen a la izquierda del texto
  doc.addImage(traImg, "PNG", 20, y - 3, 8, 8); // pequeña y más alineada
  doc.text("EXPERIENCIA", 30, y + 3); // más a la derecha para evitar empalme
  y += 5;

  const experiencias = [
    {
      periodo: "2020 - 2022 | ESTUDIO SOTO Y OCHOA",
      puesto: "Especialista en Marketing Senior",
      tareas: [
        "Trabajar con ejecutivos para determinar presupuestos y objetivos.",
        "Gestionar la rentabilidad y los resultados."
      ]
    },
    {
      periodo: "2018 - 2019 | EMPRESA ALTA PINTA",
      puesto: "Especialista en Marketing Junior",
      tareas: [
        "Identificar las tendencias y los desafíos actuales.",
        "Comunicarse con diferentes clientes."
      ]
    },
    {
      periodo: "2016 - 2018 | ESTUDIO SHONOS",
      puesto: "Analista en Marketing",
      tareas: [
        "Analizar las tendencias y los desafíos actuales.",
        "Comunicarse con diferentes clientes."
      ]
    }
  ];

  doc.setFontSize(10);
  doc.setTextColor(negro);
  experiencias.forEach(exp => {
    y += 8;
    doc.setFont("helvetica", "bold");
    doc.text(exp.periodo, 20, y);
    y += 5;
    doc.setFont("helvetica", "italic");
    doc.text(exp.puesto, 20, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    exp.tareas.forEach(t => {
      doc.text("• " + t, 20, y);
      y += 5;
    });
  });
}

function agregarEducacion(doc, azul, negro, virreImg) {
  let y = 210;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(azul);
  doc.addImage(virreImg, "PNG", 20, y - 4, 8, 8); // pequeña y más alineada
  doc.text("EDUCACIÓN", 30, y + 3);

  const educacion = [
    {
      periodo: "2012 - 2016 | LICENCIATURA EN MARKETING",
      institucion: "Egresado - Universidad Borcelle"
    },
    {
      periodo: "2010 - 2014 | LICENCIATURA EN ADMINISTRACIÓN",
      institucion: "Egresado - Universidad Borcelle"
    },
    {
      periodo: "2004 - 2009 | TÉCNICO EN COMUNICACIÓN",
      institucion: "Egresado - Secundaria Borcelle"
    }
  ];

  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(negro);
  educacion.forEach(edu => {
    doc.text(edu.periodo, 20, y);
    y += 5;
    doc.text(edu.institucion, 20, y);
    y += 7;
  });
}

function agregarHabilidades(doc, azul, negro, exitImg) {
  let y = 253;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(azul);
  doc.addImage(exitImg, "PNG", 20, y - 3, 8, 8); // pequeña y más alineada
  doc.text("HABILIDADES", 30, y + 3);
  y += 9.5;
  
  const habilidades = ["Resolución", "Comunicación", "Liderazgo", "Fotografía", "Inglés"];
  
  doc.setFont("helvetica", "normal");
  doc.setTextColor(negro);
  doc.setFontSize(10);
  
  habilidades.forEach(hab => {
    doc.text("• " + hab, 20, y);
    y += 5;
  });
}

function agregarIdiomas(doc, azul, negro, idiomaImg) {
  let x = 100;
  let y = 260;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(azul);
  doc.addImage(idiomaImg, "PNG", x - 5, y - 5, 8, 8);
  doc.text("IDIOMAS", x + 5, y);

  const idiomas = ["Español", "Inglés", "Frances"];
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(negro);
  doc.setFontSize(10);
  idiomas.forEach(hab => {
    doc.text("• " + hab, x, y);
    y += 5;
  });
}
