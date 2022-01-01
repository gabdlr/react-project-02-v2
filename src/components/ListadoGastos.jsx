import Gasto from "./Gasto";

const ListadoGastos = ({
    gastos, 
    setGastoEditar, 
    eliminarGasto,
    filtro,
    gastosFiltrados})  => {
    return ( 
        <div className="listado-gastos contenedor">
                {
                    
                    filtro ? (
                    <>
                        <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos en esta categoria'}</h2>
                                       
                    {   gastosFiltrados.map(gasto => <Gasto 
                        gasto={gasto} 
                        key={gasto.id} 
                        setGastoEditar={setGastoEditar} 
                        eliminarGasto={eliminarGasto}/>)}
                    </>
                    
                    ) :  (
                    <>
                        <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos aun'}</h2>
                       { gastos.map(gasto => <Gasto 
                            gasto={gasto} 
                            key={gasto.id} 
                            setGastoEditar={setGastoEditar} 
                            eliminarGasto={eliminarGasto}/>) }
                    </>
                    )
                }
        </div>
     );
}
 
export default ListadoGastos;