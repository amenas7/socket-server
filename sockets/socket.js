//import { Socket } from 'socket.io';


function desconectar ( cliente ) {
    cliente.on('disconnect', () =>{
        console.log('Cliente desconectado');
    });
}

// escuchar mensajes
function mensaje ( cliente, io ){
    cliente.on('mensaje', ( payload ) =>{
        console.log('Mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload);

    });
}


module.exports = {
    desconectar,
    mensaje
}