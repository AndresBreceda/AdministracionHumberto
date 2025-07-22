import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../header/hearder";

export default function Formulario() {
    const navigate = useNavigate();

  const DescargarCv = () => {
    navigate('/DescargarCv'); // Cambia '/ruta-destino' por la ruta a la que quieras ir
  };

  return (
    <div>
      <Header />

      <div className="bg-[var(--azul2)] py-20 px-10 flex flex-col lg:flex-row justify-between items-start gap-10">
        {/* Columna izquierda con texto e ilustración */}
        <div className="text-white lg:w-1/3">
          <h1 className="text-3xl font-extrabold mb-6 pt-10">Completa tu información</h1>
          <p className="text-2xl font-bold leading-relaxed mb-10">
            Llena los campos y genera tu curriculum en segundos.
          </p>
          <img src="/crear-cv.png" alt="Ilustración" className="w-full max-w-xs mx-auto" />
        </div>

        {/* Columna derecha con formulario */}
        <form className="bg-white p-8 rounded-lg shadow-md w-full lg:w-2/3 space-y-8">
          {/* Información personal */}
          <div>
            <h2 className="text-xl font-bold mb-2">Información personal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Nombre(s)" className="input" />
              <input type="text" placeholder="Apellidos" className="input" />
              <input type="text" placeholder="Teléfono" className="input" />
              <input type="email" placeholder="Correo electrónico" className="input" />
              <label className="text-[var(--azul3)] font-semibold">Sube tu foto:</label>
              <input type="file" className="input col-span-2" />
            </div>
          </div>

          {/* Perfil profesional */}
          <div>
            <h2 className="text-xl font-bold mb-2">Perfil profesional</h2>
            <textarea placeholder="Cuéntanos sobre ti" className="input w-full" rows="3" />
          </div>

          {/* Experiencia laboral */}
          <div>
            <h2 className="text-xl font-bold mb-2">Experiencia laboral</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Puesto" className="input" />
              <input type="text" placeholder="Empresa" className="input" />
              <input type="text" placeholder="Inicio" className="input" />
              <input type="text" placeholder="Fin" className="input" />
              <input type="text" placeholder="Descripción breve" className="input col-span-2" />
            </div>
          </div>

          {/* Educación */}
          <div>
            <h2 className="text-xl font-bold mb-2">Educación</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Nivel de estudios" className="input" />
              <input type="text" placeholder="Institución" className="input" />
              <input type="text" placeholder="Inicio" className="input" />
              <input type="text" placeholder="Fin" className="input" />
              <input type="text" placeholder="Descripción breve (opcional)" className="input col-span-2" />
            </div>
          </div>

          {/* Habilidades */}
          <div>
            <h2 className="text-xl font-bold mb-2">Habilidades</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Idioma" className="input" />
              <input type="text" placeholder="Nivel" className="input" />
            </div>
          </div>

          {/* Botón */}
          <div className="text-center">
            <button onClick={DescargarCv} className="bg-[#F9A825] text-white font-semibold py-3 px-8 rounded-full hover:bg-yellow-600 transition">
              Generar CV
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
