import { FileSpreadsheet, TableOfContents } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[var(--gris1)] absolute w-full px-4 py-2 flex justify-between items-center z-50">
      {/* Grupo izquierdo: ícono + texto */}
      <div className="flex items-center gap-2">
        <FileSpreadsheet className="w-6 h-6 text-white" />
        <p className="font-bold text-white">Pronto CV</p>
      </div>

      {/* Ícono derecho */}
      <TableOfContents className="w-6 h-6 text-white" />
    </header>
  );
}
