import { useEffect, useRef } from "react";
import gsap from "gsap";
import Header from "../header/hearder";

export default function Home() {
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);


  useEffect(() => {
    let current = 0;
    const total = imagesRef.current.length;

    const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    for (let i = 0; i < total; i++) {
      timeline
        .to(imagesRef.current[i], {
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
        })
        .to(imagesRef.current[i], {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          delay: 2, // tiempo visible antes de desaparecer
        });
    }
  }, []);

  return (
    <>
      <Header />

      <div className="flex min-h-screen">
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
        <div className="flex-2 flex-col bg-[var(--gris2)] flex items-center justify-center relative">
          <img src="chicos.svg" className="w-[500px] z-10" />

          {/* CVs superpuestos */}
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[220px] h-auto z-0">
            {["cv1.png", "cv2.png", "cv3.png"].map((src, i) => (
            <img
              key={i}
              ref={(el) => {
                imagesRef.current[i] = el;
              }}
              src={src}
              className="absolute top-0 left-0 w-full opacity-0"
            />
          ))}

          </div>
          <h2 className="mt-20 text-2xl font-bold text-black">Crea el tuyo ¡Ahora!</h2>
          <button className="bg-[var(--azul3)] mt-5 text-xl px-8 py-4 rounded-full hover:bg-blue-700 transition">Comenzar</button>
        </div>
      </div>
    </>
  );
}
