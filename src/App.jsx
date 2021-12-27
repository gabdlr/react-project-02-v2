import { useState } from 'react';
import Header from './components/Header';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import IconoNuevoGasto from './img/nuevo-gasto.svg';

function App() {

  const [ presupuesto, setPresupuesto ] = useState('');
  const [ isValidPresupuesto, setIsValidPresupuesto ] = useState(false);
  const [ modal, setModal ] = useState(false);
  const [ animarModal, setAnimarModal ] = useState(false);
  const [ gastos, setGastos ] = useState([]);

  const handleNuevoGasto = () => {
    setModal(true);
    setTimeout(()=>{
      setAnimarModal(true)
    }, 100)
  }
  const guardarGasto = gasto => {
    setGastos(gasto);
  }
  return (
    <div className={ modal ? 'fijar' : '' }>
     <Header
      gastos={gastos}
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      isValidPresupuesto={isValidPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
     />
     {isValidPresupuesto ? 
     (
       <>
        <main>
          <ListadoGastos
            gastos={gastos}
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
        />}
    </div>
    
  )
}

export default App
