import { MoveLeft } from "lucide-react";

export default function DescargarCv() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex rounded-lg overflow-hidden shadow-lg bg-white w-full max-w-3xl">

        {/* Sección Azul */}
        <div className="bg-[#002366] text-white p-8 w-1/2 flex flex-col justify-center items-start space-y-6">
          <a href="/" className="text-white hover:text-gray-200 flex gap-2 font-bold leading-relaxed">
            <MoveLeft className="w-6 h-6" />  volver
          </a>
          <h2 className="text-2xl font-bold">¡Tu CV ha sido generado!</h2>
        </div>

        {/* Sección Blanca */}
        <div className="bg-white p-8 w-1/2 flex flex-col justify-center items-center text-center">
          <div className="mb-4">
            <img
              src="./cv-generado.jpeg"
              alt="CV"
              className="w-48 h-48 mx-auto object-contain"
            />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Listo para descargar
          </h3>
          <p className="text-gray-600 mb-4">
            Haz clic en el botón a continuación para descargar tu curriculum en formato PDF.
          </p>
          <button className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-6 rounded-full transition">
            Descargar PDF
          </button>
        </div>
      </div>
    </div>
  );
}
