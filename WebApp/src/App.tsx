import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

//Componentes
// import Home from "./components/home/home";
import NotFound from "./components/notFound/NotFound";
import CompletePage from './components/completePage/CompletePage';
import Formulario from './components/Formulario/Formulario';
import DescargarCv from './components/DescargarCv/DescargarCv';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          {/* Definir las rutas */}
          <Route path="/" element={<CompletePage />} />
          <Route path="/Formulario" element={<Formulario/>}/>
          <Route path="/DescargarCv" element={<DescargarCv/>}/>
          {/* Ruta para páginas no encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
