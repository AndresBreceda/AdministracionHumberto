import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const hiredPeople = [
  { name: 'Ana Martínez', brand: 'Coca-Cola.png' },
  { name: 'Luis Torres', brand: 'Bimbo.png' },
  { name: 'Julia Fernández', brand: 'Microsoft.svg' },
  { name: 'Carlos Méndez', brand: 'Oracle.png' },
  { name: 'María González', brand: 'Hp.png' },
  // Puedes agregar más
];

export default function Marcas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.person', {
        xPercent: -100 * hiredPeople.length,
        ease: 'none',
        duration: 30,
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden bg-white py-6">
        <h1 className='text-black text-3xl font-extrabold mb-10 ml-100'>Nuestros clientes han sido contratados por:</h1>
      <div ref={containerRef} className="relative w-full">
        <div className="flex w-max space-x-12">
          {hiredPeople.concat(hiredPeople).map((person, index) => (
            <div
              key={index}
              className="person flex-shrink-0 bg-gray-100 rounded-xl p-4 shadow-md w-60 text-center"
            >
              {/* <p className="text-lg font-semibold">{person.name}</p>
              <p className="text-sm text-gray-600">Contratado por {person.brand}</p> */}
              <img className="text-sm text-gray-600 h-20 w-32 object-contain mx-auto" src={person.brand} alt={person.brand}></img>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
