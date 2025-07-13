import Header from "../header/hearder";

export default function Home() {
  return (
    <>
      <Header />

      <div className="flex h-screen">
        {/* Panel izquierdo */}
        <div className="flex-1 bg-[var(--azul2)] flex flex-col justify-center px-12">
          <h1 className="text-white text-3xl font-extrabold mb-6">
            Ten tu currículum vitae en segundos
          </h1>
          <p className="text-white text-2xl font-bold leading-relaxed">
            Crea tu CV con plantillas personalizadas <br />
            y listas para usarse. Escoge, <br />
            llena tu información en el formulario <br />
            ¡y listo!
          </p>
        </div>

        {/* Panel derecho */}
        <div className="flex-1 bg-[var(--gris2)]"></div>
      </div>
    </>
  );
}
