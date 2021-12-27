import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({
    presupuesto, 
    setPresupuesto, 
    setIsValidPresupuesto
}) => {

    const [ mensaje, setMensaje ] = useState('');
    const handlePresupuesto = (e) => {
        e.preventDefault();
        setPresupuesto(Number(presupuesto));
        if(isNaN(presupuesto) || Number(presupuesto) <= 0){
            setPresupuesto('');
            setMensaje('No es un presupuesto válido');
            return;
        } 
        setMensaje('');
        setIsValidPresupuesto(true);
        
    }   
    return ( 
        <div className='contenedor-presupuesto contenedor sombra'>
            <form 
                onSubmit={handlePresupuesto} 
                className='formulario'
            >
                <div className='campo'>
                    <label>Definir presupuesto</label>
                    <input 
                        className='nuevo-presupuesto' 
                        type="text" 
                        placeholder="Añade tu presupuesto"
                        value={presupuesto}
                        //Esto se podria mejorar para no reescribir tantas veces el mismo estado
                        onChange={ e => setPresupuesto(e.target.value) }
                    />
                </div>
                <input type="submit" value="Añadir"/>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>
        </div>
     );
}
 
export default NuevoPresupuesto;