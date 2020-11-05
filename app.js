// requires
//const express = require('express');
const consql = require('./database/database');
const bodyParser = require('body-parser');

const { Server } = require('./sockets/server');
//const server  = new Server();
const server  = Server.instance;


// importando cors
const cors = require('cors');


// inicializar variables
//const app = express();


// habilitar CORS
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// });

// configurar nuevos cors
server.app.use( cors({ origin: true, credentials: true }) );

// lectura y parseo del body
//app.use( express.json );


// body parser
// parse application/x-www-form-urlencoded
server.app.use(bodyParser.urlencoded({ extended: false }))
server.app.use(bodyParser.json())


// rutas
server.app.use('/api/usuarios', require('./routes/usuarios') );
server.app.use('/api/areas', require('./routes/areas') );
server.app.use('/api/sedes', require('./routes/sedes') );
server.app.use('/api/tipos_inci', require('./routes/tipos_inci') );
server.app.use('/api/incidencias', require('./routes/incidencias') );
server.app.use('/api/tickets', require('./routes/tickets') );
server.app.use('/api/tickets_historial', require('./routes/tickets_historial') );
server.app.use('/api/tickets_lista', require('./routes/tickets lista') );
server.app.use('/api/estados_ticket', require('./routes/estados_ticket') );
server.app.use('/api/usuario_sesion', require('./routes/usuario_sesion') );
server.app.use('/api/inci_ticket', require('./routes/inci_ticket') );
server.app.use('/api/nuticket', require('./routes/nuticket') );
server.app.use('/api/especialistas', require('./routes/especialistas') );
server.app.use('/api/prioridades', require('./routes/prioridades') );
server.app.use('/api/indicador_uno', require('./routes/indicador_uno') );
server.app.use('/api/roles', require('./routes/roles') );
server.app.use('/api/login', require('./routes/auth') );


// escuchar peticiones
server.start( ()=>{
    console.log('Servidor corriendo en el puerto 3000');
});
// server.app.listen(3000, () => {
//     console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
// });