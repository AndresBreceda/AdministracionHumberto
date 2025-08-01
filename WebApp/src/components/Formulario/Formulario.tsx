import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../header/hearder";
import { generarPDF1 } from "../../../plantillas/plantilla1/pla5";
// import { generarPDF2 } from "../../../plantillas/plantilla2/pla6";
// import { generarPDF3} from "../../../plantillas/plantilla3/pla7";
// import { generarPDF4 } from "../../../plantillas/plantilla4/pla8";
// import { generarPDF5 } from "../../../plantillas/plantilla5/plantilla1";
// import { generarPDF6 } from "../../../plantillas/plantilla6/pla2";
// import { generarPDF7 } from "../../../plantillas/plantilla7/pla3";
// import { generarPDF8 } from "../../../plantillas/plantilla8/pla4";


export default function Formulario() {
  const navigate = useNavigate();
  const location = useLocation();
  const plantillaId = location.state?.plantillaId ?? 1;

  const DescargarCv = () => {
      const datos = obtenerDatosDelFormulario(); // <- Tú defines esta función como ya lo haces
  switch (plantillaId) {
    case 1: generarPDF1(datos); break;
    // case 2: generarPDF2(datos); break;
    // case 3: generarPDF3(datos); break;
    // case 4: generarPDF4(datos); break;
    // case 5: generarPDF5(datos); break;
    // case 6: generarPDF6(datos); break;
    // case 7: generarPDF7(datos); break;
    // case 8: generarPDF8(datos); break;
    default: generarPDF1(datos);
  }
    navigate("/DescargarCv");
  };

  return (
    <div>
      <Header />

      <div className="bg-[var(--azul2)] py-20 px-10 flex flex-col lg:flex-row justify-between items-start gap-10">
        <div className="text-white lg:w-1/3">
          <h1 className="text-3xl font-extrabold mb-6 pt-10">Completa tu información</h1>
          <p className="text-2xl font-bold leading-relaxed mb-10">
            Llena los campos y genera tu curriculum en segundos.
          </p>
          <img src="/crear-cv.png" alt="Ilustración" className="w-full max-w-xs mx-auto" />
        </div>

        <form id="formulario-cv" className="bg-white p-8 rounded-lg shadow-md w-full lg:w-2/3 space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-2">Información personal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" id="nombre" placeholder="Nombre(s)" className="input" />
              <input type="text" id="apellidos" placeholder="Apellidos" className="input" />
              <input type="text" id="telefono" placeholder="Teléfono" className="input" />
              <input type="email" id="correo" placeholder="Correo electrónico" className="input" />
              <label className="text-[var(--azul3)] font-semibold">Sube tu foto:</label>
              <input type="file" id="foto" className="input col-span-2" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Perfil profesional</h2>
            <textarea id="perfil" placeholder="Cuéntanos sobre ti" className="input w-full" rows={3}></textarea>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Experiencia laboral</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" id="puesto" placeholder="Puesto" className="input" />
              <input type="text" id="empresa" placeholder="Empresa" className="input" />
              <input type="text" id="inicio-exp" placeholder="Inicio" className="input" />
              <input type="text" id="fin-exp" placeholder="Fin" className="input" />
              <input type="text" id="desc-exp" placeholder="Descripción breve" className="input col-span-2" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Educación</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" id="nivel-estudios" placeholder="Nivel de estudios" className="input" />
              <input type="text" id="institucion" placeholder="Institución" className="input" />
              <input type="text" id="inicio-edu" placeholder="Inicio" className="input" />
              <input type="text" id="fin-edu" placeholder="Fin" className="input" />
              <input type="text" id="desc-edu" placeholder="Descripción breve (opcional)" className="input col-span-2" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Habilidades</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" id="idioma" placeholder="Idioma" className="input" />
              <input type="text" id="nivel-idioma" placeholder="Nivel" className="input" />
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={DescargarCv}
              id="btnGenerar"
              type="button"
              className="bg-[#F9A825] text-white font-semibold py-3 px-8 rounded-full hover:bg-yellow-600 transition"
            >
              Generar CV
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

function obtenerDatosDelFormulario() {
  const nombre = (document.getElementById("nombre") as HTMLInputElement)?.value || "";
  const apellidos = (document.getElementById("apellidos") as HTMLInputElement)?.value || "";
  const telefono = (document.getElementById("telefono") as HTMLInputElement)?.value || "";
  const correo = (document.getElementById("correo") as HTMLInputElement)?.value || "";
  const foto = (document.getElementById("foto") as HTMLInputElement)?.files?.[0] || null;

  const perfil = (document.getElementById("perfil") as HTMLTextAreaElement)?.value || "";

  const puesto = (document.getElementById("puesto") as HTMLInputElement)?.value || "";
  const empresa = (document.getElementById("empresa") as HTMLInputElement)?.value || "";
  const inicioExp = (document.getElementById("inicio-exp") as HTMLInputElement)?.value || "";
  const finExp = (document.getElementById("fin-exp") as HTMLInputElement)?.value || "";
  const descExp = (document.getElementById("desc-exp") as HTMLInputElement)?.value || "";

  const nivelEstudios = (document.getElementById("nivel-estudios") as HTMLInputElement)?.value || "";
  const institucion = (document.getElementById("institucion") as HTMLInputElement)?.value || "";
  const inicioEdu = (document.getElementById("inicio-edu") as HTMLInputElement)?.value || "";
  const finEdu = (document.getElementById("fin-edu") as HTMLInputElement)?.value || "";
  const descEdu = (document.getElementById("desc-edu") as HTMLInputElement)?.value || "";

  const idioma = (document.getElementById("idioma") as HTMLInputElement)?.value || "";
  const nivelIdioma = (document.getElementById("nivel-idioma") as HTMLInputElement)?.value || "";

  return {
    nombre,
    apellidos,
    telefono,
    correo,
    foto,
    perfil,
    puesto,
    empresa,
    inicioExp,
    finExp,
    descExp,
    nivelEstudios,
    institucion,
    inicioEdu,
    finEdu,
    descEdu,
    idioma,
    nivelIdioma,
  };
}
