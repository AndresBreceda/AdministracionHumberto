import { TableOfContents } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[var(--gris1)] w-full px-4 py-2 flex justify-between items-center z-50 fixed">
      {/* Grupo izquierdo: ícono + texto */}
      <a className="flex items-center gap-2" href="/">
        <img src="CV-logo1.png" className="w-15 h-15 text-white" />
        <p className="font-bold text-white">Pronto CV</p>
      </a>

      {/* Ícono derecho */}
      <TableOfContents className="w-9 h-9 text-white" />
    </header>
  );
}
