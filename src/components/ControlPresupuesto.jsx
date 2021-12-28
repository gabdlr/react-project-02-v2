import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({presupuesto, gastos}) => {
    const [ porcentaje, setPorcentaje ] = useState(0);
    const [ disponible, setDisponible ] = useState(0);
    const [ gastado, setGastado ] = useState(0);
    const formatearPresupuesto = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency:'USD'
        })
    }

    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto) => total + gasto.monto, 0);
        const totalDisponible = presupuesto - totalGastado;
        const nuevoPorcentaje = (((presupuesto - totalGastado)/presupuesto)*100);
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje);
        },600);
        setGastado(totalGastado);
        setDisponible(totalDisponible);
    }, [gastos])
    return ( 
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    value={porcentaje}
                    styles={buildStyles({
                        pathColor:'#3b82f6',
                        trailColor:'#F5F5F5'
                    })}
                    text={`${(100-porcentaje).toFixed(2)}% Gastado`}
                />
            </div>
            <div className="contenido-presupuesto">
                <p><span>Presupuesto: </span>{formatearPresupuesto(presupuesto)}</p>
                <p><span>Disponible: </span>{formatearPresupuesto(disponible)}</p>
                <p><span>Gastado: </span>{formatearPresupuesto(gastado)}</p>
            </div>
        </div>
     );
}
 
export default ControlPresupuesto;