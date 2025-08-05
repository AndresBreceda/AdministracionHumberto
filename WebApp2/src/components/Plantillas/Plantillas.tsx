// Plantillas.tsx
import './styles_platillas.css';
import CV_cart from './cv';

export default function Plantillas() {
  return (
    <div className="bg-[var(--gris2)] min-h-screen pt-16" id="seccion-plantillas">
      <h1 className="text-[var(--azul1)] text-4xl font-extrabold text-center">Plantillas</h1>

      <div className="grid grid-cols-4 grid-rows-2 gap-6 mt-6 ml-6 mr-6">
        <div className="clase">
          <CV_cart
            img="/cv1.png"
            titulo="Clásico gris"
            texto="Un CV elegante y clásico"
            tags={['Clave', 'Directo', 'Limpio']}
            id={1}
          />
        </div>

        <div className="clase">
          <CV_cart
            img="/cv2.png"
            titulo="CV En proceso"
            texto="Plantilla aún no disponible"
            tags={['próximamente', 'en desarrollo', 'temporal']}
            id={2}
          />
        </div>

        <div className="clase">
          <CV_cart
            img="/cv3.png"
            titulo="Corporativo"
            texto="Ideal para perfiles ejecutivos y serios"
            tags={['formal', 'ejecutivo', 'negocios']}
            id={3}
          />
        </div>

        <div className="clase">
          <CV_cart
            img="/cv4.png"
            titulo="Colorido"
            texto="Un CV lleno de colores y creatividad"
            tags={['creativo', 'diseño', 'moderno']}
            id={4}
          />
        </div>

        <div className="clase">
          <CV_cart
            img="/cv5.jpg"
            titulo="CV NO PROCESO"
            texto="Plantilla en construcción"
            tags={['borrador', 'incompleto', 'próximamente']}
            id={5}
          />
        </div>

        <div className="clase">
          <CV_cart
            img="/cv6.jpg"
            titulo="CV EN PROCESO"
            texto="Estamos trabajando en esta plantilla"
            tags={['espera', 'en proceso', 'pronto disponible']}
            id={6}
          />
        </div>

        <div className="clase">
          <CV_cart
            img="/cv-no-hecho.png"
            titulo="CV NO HECHO"
            texto="Diseño en fase de diseño"
            tags={['diseño', 'en curso', 'preview']}
            id={7}
          />
        </div>

        <div className="clase">
          <CV_cart
            img="/cv-no-hecho.png"
            titulo="CV NO HECHO"
            texto="Prototipo sin finalizar"
            tags={['prototipo', 'sin estilo', 'plantilla base']}
            id={8}
          />
        </div>
      </div>
    </div>
  );
}
