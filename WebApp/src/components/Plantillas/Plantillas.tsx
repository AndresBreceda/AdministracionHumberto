
export default function Plantillas(){
    return(
    <div className="bg-[var(--gris2)] ">

    <h1 className="text-black text-3xl font-extrabold mt-6 ml-6">Plantillas</h1>    
    {/* Plantillas */}
    <div className="grid grid-cols-4 grid-rows-2 gap-6 mt-6 ml-6 mr-6">
        <div >
            <img></img>
            <h1>Plantilla colorida</h1>
            
        </div>

        <div className="col-start-1 row-start-2">2</div>
        <div className="col-start-2 row-start-1">3</div>
        <div className="col-start-2 row-start-2">4</div>
        <div className="col-start-3 row-start-1">5</div>
        <div className="col-start-3 row-start-2">6</div>
        <div className="col-start-4 row-start-1">7</div>
        <div >8</div>
    </div>

    </div>

    
    );
}