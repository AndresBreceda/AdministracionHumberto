

export default function About() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between p-10 bg-[var(--gris2)] text-[var(--azul1)]">
      
      {/* Texto informativo */}
      <div className="md:w-1/2 space-y-6">
        <h2 className="text-3xl font-bold text-[var(--azul1)]">¿Por qué es importante tener un buen CV?</h2>
        <p className="text-lg leading-relaxed">
          Tu currículum vitae es tu primera oportunidad para causar una buena impresión.
          Un CV bien diseñado no solo destaca tu experiencia y habilidades, sino que también refleja tu profesionalismo.
          En un mercado laboral competitivo, contar con una presentación clara y visualmente atractiva puede marcar la diferencia.
        </p>
        <p className="text-lg leading-relaxed">
          <strong>Pronto CV</strong> te permite crear un currículum profesional en minutos. 
          Nuestra plataforma ofrece <span className="text-[var(--azul3)] font-semibold">plantillas modernas y listas para usar</span>,
          adaptadas a distintos perfiles y sectores.
          Solo tienes que completar el formulario y descargar tu CV listo para impresionar.
        </p>
      </div>

      {/* Imagen decorativa */}
      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <img
          src="/computadora-cv.png"
          alt="Ilustración sobre creación de CV"
          className="max-w-xs md:max-w-sm"
        />
      </div>
    </section>
  );
}
