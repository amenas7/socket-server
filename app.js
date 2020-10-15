// requires
const express = require('express');
const consql = require('./database/database');
var bodyParser = require('body-parser');

// nuevo
const cors = require('cors');


// inicializar variables
const app = express();


// habilitar CORS
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// });

// configurar nuevos cors
app.use( cors() );

// lectura y parseo del body
//app.use( express.json );


// body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// importar rutas
// var appRoutes = require('./routes/app');
// var usuarioRoutes = require('./routes/usuario');
// var uploadRoutes = require('./routes/upload');
// var loginRoutes = require('./routes/login');

//acceder a coneccion de mysql configurada
//const consql = require('database.js');


// rutas
app.use('/api/usuarios', require('./routes/usuarios') );
app.use('/api/areas', require('./routes/areas') );
app.use('/api/sedes', require('./routes/sedes') );
app.use('/api/tipos_inci', require('./routes/tipos_inci') );
app.use('/api/incidencias', require('./routes/incidencias') );
app.use('/api/tickets', require('./routes/tickets') );
app.use('/api/usuario_sesion', require('./routes/usuario_sesion') );
app.use('/api/inci_ticket', require('./routes/inci_ticket') );
app.use('/api/nuticket', require('./routes/nuticket') );
app.use('/api/especialistas', require('./routes/especialistas') );
app.use('/api/prioridades', require('./routes/prioridades') );
app.use('/api/roles', require('./routes/roles') );
app.use('/api/login', require('./routes/auth') );
// app.use('/login', loginRoutes);
// app.use('/upload', uploadRoutes);
// app.use('/', appRoutes);

// escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});