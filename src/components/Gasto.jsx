import { formatearFecha } from "../helpers";
import { 
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
 } from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

const Gasto = ({gasto}) => {

    const leadingActions =  ( 
        <LeadingActions>
            <SwipeAction onClick={() => {console.log('lalala')}}>
                Editar
            </SwipeAction>
        </LeadingActions>
    );
    const trailingActions = (
        <TrailingActions>
            <SwipeAction onClick={() => {console.log('lalala')}}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    );

    return ( 
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions}
                trailingActions={trailingActions}
            >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img src={`/img/icono_${gasto.categoria}.svg`}/>
                        <div className="descripcion-gasto">
                            <p className="categoria">{gasto.categoria}</p>
                            <p className="nombre-gasto">{gasto.nombre}</p>
                            <p className="fecha-gasto">Agregado el: {''}
                                <span>{formatearFecha(gasto.fecha)}</span>
                            </p>
                        </div>
                    </div>
                    <p className="cantidad-gasto">${gasto.monto}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
     );
}
 
export default Gasto;