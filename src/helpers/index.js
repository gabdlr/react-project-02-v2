export const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const randomAux = Date.now().toString(36);
    return random + randomAux;
}

export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha);
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    return fechaNueva.toLocaleDateString('es-ES', opciones);
}