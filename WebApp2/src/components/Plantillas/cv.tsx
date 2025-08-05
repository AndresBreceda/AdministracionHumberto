import { useNavigate } from "react-router-dom";


interface CVCartProps {
  texto: string;
  titulo: string;
  img: string;
  tags?: string[];
  id: number
}

export default function CV_cart({ texto, titulo, img, tags = [], id }: CVCartProps) {
    const navigate = useNavigate();

    const IrAFormulario = () => {
      console.log(id);
    navigate('/Formulario', { state: { plantillaId: id } });
    };

  return (
    <div className="relative group overflow-hidden rounded-xl shadow-md transition-transform hover:scale-105 hover:shadow-xl cursor-pointer bg-white">

      {/* Imagen */}
      <img src={img} alt={titulo} className="w-auto h-1/2 object-cover" />

      {/* Contenido */}
      <div className="p-4">
        <h1 className="text-lg font-bold">{titulo}</h1>
        <p className="text-gray-600">{texto}</p>

        {/* Etiquetas */}
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Overlay gris semitransparente */}
      <div className="absolute inset-0 bg-[var(--gris2)] bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Botón Comenzar */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button onClick={IrAFormulario} className="bg-white text-black font-semibold px-4 py-2 rounded shadow hover:bg-[var(--amarillo1)]">
          LLenar con tu información
        </button>
      </div>
    </div>
  );
}
