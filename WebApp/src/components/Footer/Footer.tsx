import { Instagram, Facebook, Twitch } from "lucide-react";

export default function Footer(){
    return(
        <footer className="bg-[var(--gris1)] pb-10 flex justify-between">
            
            <div>
                <div className="text-white text-2xl font-extrabold pt-10 pl-10">
                    <img src="./CV-logo1.png" alt="logo de pronto cv" className="w-20"></img>
                    Pronto Cv
                </div>
                <div className="text-white font-bold pl-10">
                    La pagina web para crear tu cv rapido y facil
                </div>
            </div>

            <div>
                <div className="text-white font-bold pt-10 pr-10">
                    Andrés Esquivel Breceda <br></br>
                    Efrén Najera Basurto<br></br>
                    Rodrigo Juaréz del Valle<br></br>
                    Juan Carlos Alvarado Hernandez <br></br>

                </div>
                <div className="flex mt-5 gap-2">
                    <a href="#">
                        <Instagram className="text-white"/>
                    </a >
                    
                    <a  href="#">
                        <Facebook className="text-white"/>
                    </a>
                    <a  href="#">
                        <Twitch className="text-white"/>
                    </a>

                </div>

            </div>
                
                
        </footer>
    );
}