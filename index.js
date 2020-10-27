var app = require('express')();
const serverHttp = require('http').Server(app);

const socket = require('./sockets/socket');

// settings
app.set('port', process.env.PORT || 3000);

const io = require('socket.io')(serverHttp);
//const io = SocketIO(server);

const MyMessages = [];

// websockets
io.on('connection', function(cliente) {
    // mensaje de conectado cuando alguien ingresa
    console.log('Una conexion nueva aqui...');

    
    // cliente.on('disconnect', () => {
    //     console.log('Cliente desconectado');
    // });

    // mensajes
    socket.mensaje( cliente, io );

    // desconectar
    socket.desconectar( cliente );



    // socket.on('send-message', function name(data) {
    //     MyMessages.push(data);
    //     socket.emit('text-event', MyMessages);
    //     socket.broadcast.emit('text-event', MyMessages);
    // })
    //socket.emit('text-event', 'data enviada desde el backend');
});

// start the server
// const server = serverHttp.listen(app.get('port'), () => {
//     console.log('servidor en puerto', app.get('port'));
// });

serverHttp.listen(3000 , () =>{
    console.log(`servidor en puerto ${ 3000 }`)
});

