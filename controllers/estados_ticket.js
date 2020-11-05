const bcrypt = require('bcrypt');

//acceder a coneccion de mysql configurada
const consql = require('../database/database');
const { generarJWT } = require('../helpers/jwt');


// ==========================================
// obtener todos los estados de ticket
// ==========================================
const getEstadosTicket = (req, res) => {
    consql.query( 'SELECT IDestado, nombre FROM estado_ticket WHERE IDestado != 1 AND IDestado != 2 ', (err, filas) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando estados',
                errors: err
            })
        }
        if (!err) {
            return res.status(200).json({
                ok: true,
                estados: filas,
                uid: req.uid
            })
        }
    });
}


module.exports = {
    getEstadosTicket

}