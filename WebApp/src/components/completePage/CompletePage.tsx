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

        </div>

    );
}