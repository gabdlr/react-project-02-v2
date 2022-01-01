import { useState, useEffect } from 'react';
import Header from './components/Header';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import Filtros from './components/Filtros';
function App() {

  const [ presupuesto, setPresupuesto ] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [ isValidPresupuesto, setIsValidPresupuesto ] = useState(false);
  const [ modal, setModal ] = useState(false);
  const [ animarModal, setAnimarModal ] = useState(false);
  const [ gastos, setGastos ] = useState([]);
  const [ gastoEditar, setGastoEditar ] = useState({});
  const [ filtro, setFiltro ] = useState('');
  const [ gastosFiltrados, setGastosFiltrados ] = useState([]);

  const handleNuevoGasto = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      setModal(true);
    setTimeout(()=>{
      setAnimarModal(true)
    }, 100)
  }
  const guardarGasto = gasto => {
    setGastos(gasto);
  }
  const eliminarGasto = (id) => {
    const tempGastos = gastos.filter(gasto => gasto.id !== id);
    setGastos(tempGastos);
  }

  useEffect(()=>{
    localStorage.getItem('gastos') ? setGastos(JSON.parse(localStorage.getItem('gastos'))) : null;
  },[])

  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos))
  },[gastos]);

  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro);
      setGastosFiltrados(gastosFiltrados);
    }
  },[filtro]);
  useEffect(() => {
    if(Object.keys(gastoEditar).length){
      handleNuevoGasto()
    }
  },[gastoEditar]);
  
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0);
  },[presupuesto]);
  
  useEffect(()=>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto'));
    if(presupuestoLS > 0 && !isNaN(presupuestoLS)){
      setIsValidPresupuesto(true);
    }
  },[]);

  useEffect(()=> {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  },[gastos]);
  
  return (
    <div className={ modal ? 'fijar' : '' }>
     <Header
      gastos={gastos}
      setGastos={setGastos}
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      isValidPresupuesto={isValidPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
     />
     {isValidPresupuesto ? 
     (
       <>
        <main>
          <Filtros
            filtro={filtro}
            setFiltro={setFiltro}
          />
         <ListadoGastos
            gastos={gastos}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
            filtro={filtro}
            gastosFiltrados={gastosFiltrados}
          />
        </main>
        <div className='nuevo-gasto'>
          <img 
          src='/img/nuevo-gasto.svg'
          alt='icono nuevo gasto'
          onClick={handleNuevoGasto}
          />
        </div>
      </>) 
     : null}
      { modal 
        && <Modal
            setModal={setModal}
            animarModal={animarModal}
            setAnimarModal={setAnimarModal}
            gastos={gastos}
            guardarGasto={guardarGasto}
            setGastoEditar={setGastoEditar}
            gastoEditar={gastoEditar}
        />}
    </div>
    
  )
}

export default App
