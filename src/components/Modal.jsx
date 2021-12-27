import { useState } from 'react';
import CerrarBtn from '../img/cerrar.svg';
import Mensaje from './Mensaje';
import { generarId } from '../helpers';

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastos}) => {
    const [ gasto, setGasto ] = useState({
        'nombre':'',
        'monto': 0,
        'categoria': '',
        'fecha': Date.now(),
        'id': generarId()
    });
    const [ mensaje, setMensaje ] = useState('');

    const onChangeHandler = e => {
        if(e.target.name === 'monto'){
            setGasto({...gasto,
                monto:Number(e.target.value)})
        } else {
            setGasto({
                ...gasto,
                [e.target.name]:e.target.value
            });
        }
    }
    const handleSubmit = e => {
        e.preventDefault();
        for(const key in gasto){
            if(gasto[key] === '') {
                setMensaje('Todos los campos son obligatorios');
                setTimeout(() => {
                    setMensaje('');
                }, 1000)
                return;
            }
        }
        guardarGasto([...gastos, gasto])
        setGasto({
            'nombre':'',
            'monto': 0,
            'categoria': '',
            'fecha': Date.now(),
            'id': generarId()
        });
        ocultarModal();
    }
    const ocultarModal = () => {
        setAnimarModal(false)
        setTimeout(() => {
            setModal(false);
        },500)
    }
    return ( 
        <div className="modal">
            <div className="cerrar-modal">
                <img 
                    src={CerrarBtn} 
                    alt="cerrar modal"
                    onClick={ocultarModal} 
                />
            </div>
            <form className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>
                <legend>Nuevo Gasto</legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
                <div className='campo'>
                    <label htmlFor="nombre">Nombre gasto</label>
                    <input
                        name="nombre"
                        value={gasto.nombre || ''}
                        onChange={ (e) => onChangeHandler(e) } 
                        type="text" 
                        placeholder='Añade el nombre del gasto'
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="nombre">Monto</label>
                    <input
                        name="monto" 
                        type="number" 
                        placeholder='Añade el monto del gasto'
                        value={gasto.monto || ''}
                        onChange={ (e) =>  onChangeHandler(e) } 
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="categoria">Categoria</label>
                    <select 
                        name="categoria"
                        id="categoria"
                        onChange={(e) => onChangeHandler(e)}
                        value={gasto.categoria || ''}
                    >
                        <option disabled value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="alimentos">Alimentos</option>
                        <option value="hogar">Hogar</option>
                        <option value="varios">Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input 
                type="submit" 
                value="Añadir gasto"
                onClick={ (e) => handleSubmit(e)}
                />
            </form>
        </div>
     );
}
 
export default Modal;