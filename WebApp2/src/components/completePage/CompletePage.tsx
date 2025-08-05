import About from "../About/About";
import Footer from "../Footer/Footer";
import Home from "../home/home";
import Marcas from "../Marcas/Marcas";
import Plantillas from "../Plantillas/Plantillas";

export default function CompletePage(){
    return(
        <div>

        {/* Landing de inicio con header */}
        <Home/>

        <Marcas/>

        <Plantillas/>

        <About/>

        <Footer/>
        </div>

    );
}