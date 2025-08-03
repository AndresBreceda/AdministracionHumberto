import { X } from "lucide-react";
import { HashLink } from "react-router-hash-link";

type SidePanelProps = {
  abierto: boolean;
  cerrarPanel: () => void;
};

type LinkItem = {
  name: string;
  path: string;
};

export default function SidePanel({ abierto, cerrarPanel }: SidePanelProps) {
  const links: LinkItem[] = [
    { name: "Inicio", path: "/#inicio" },
    { name: "Plantillas", path: "/#seccion-plantillas" },
    { name: "La importancia del CV", path: "/#importancia" },
  ];

  return (
    <>
      {/* Panel lateral estilizado */}
      <div
        className={`fixed top-20 right-0 h-full w-64 bg-[var(--azul2)] shadow-lg border-l border-[var(--azul3)] z-40 transform transition-transform duration-300 ${
          abierto ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--azul3)]">
          <h2 className="text-lg font-semibold text-[var(--amarillo1)]">Menú</h2>
          <button onClick={cerrarPanel}>
            <X className="text-white hover:text-[var(--amarillo1)] transition" />
          </button>
        </div>

        {/* Links */}
        <nav className="p-4 space-y-2">
          {links.map((link, idx) => (
            <HashLink
              key={idx}
              to={link.path}
              smooth
              onClick={cerrarPanel}
              className="block text-white hover:bg-[var(--azul3)] hover:text-black rounded px-3 py-2 transition"
            >
              {link.name}
            </HashLink>
          ))}
        </nav>
      </div>

      {/* Fondo con blur y transparencia */}
      {abierto && (
        <div
          className="fixed inset-0 z-30 backdrop-blur-sm bg-black/30 transition-opacity duration-300"
          onClick={cerrarPanel}
        />
      )}
    </>
  );
}
