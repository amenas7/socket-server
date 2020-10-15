const bcrypt = require('bcrypt');

//acceder a coneccion de mysql configurada
const consql = require('../database/database');
const { generarJWT } = require('../helpers/jwt');


// ==========================================
// obtener todos los tickets
// ==========================================
const getTickets = (req, res) => {
    consql.query(` SELECT  
    ticket.IDticket as ticketid, IDtipo_inci, tipos_inci.nombre_tipo_inci, ticket.IDpersona,
    usuario.usuario, ticket.nombre_persona, ticket.serie,
    CONCAT(usuario.usuario, ' - ', ticket.nombre_persona) as usuario_completo, 
    nombre_area, ticket.fecha_reg, detalle_ticket,
    CASE
        WHEN ticket.estado_ticket = 1 THEN 'Pendiente' 
        WHEN ticket.estado_ticket = 2 THEN 'Registrada'
    END as estado, ticket.IDprioridad, prioridad.nombre_prioridad
    from ticket
    inner join tipos_inci
    on tipos_inci.IDtipos_inci = ticket.IDtipo_inci
    inner join usuario
    on usuario.IDpersona = ticket.IDpersona
		inner join prioridad
		on prioridad.IDprioridad = ticket.IDprioridad
    where ticket.interno = 1 `, (err, filas) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando las incidencias',
                errors: err
            })
        }
        if (!err) {
            return res.status(200).json({
                ok: true,
                tickets: filas,
                aid: req.aid
            })
        }
    });
}

function consultar(req, res, reg) {
    const query = `
    SELECT  
    ticket.IDticket as ticketid, IDtipo_inci, tipos_inci.nombre_tipo_inci, ticket.IDpersona,
    usuario.usuario, ticket.nombre_persona, ticket.serie,
    CONCAT(usuario.usuario, ' - ', ticket.nombre_persona) as usuario_completo, 
    nombre_area, ticket.fecha_reg, detalle_ticket,
    CASE
        WHEN ticket.estado_ticket = 1 THEN 'Pendiente' 
        WHEN ticket.estado_ticket = 2 THEN 'Registrada'
    END as estado, ticket.IDprioridad, prioridad.nombre_prioridad, usuario.usuarioID as IDusuario
    from ticket
    inner join tipos_inci
    on tipos_inci.IDtipos_inci = ticket.IDtipo_inci
    inner join usuario
    on usuario.IDpersona = ticket.IDpersona
		inner join prioridad
		on prioridad.IDprioridad = ticket.IDprioridad
    where ticket.IDticket = ${reg} AND ticket.interno = 1  
    `;

    //console.log(query);
    return new Promise((resolve, reject) => {
        consql.query(query, (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

// ==========================================
// crear un ticket
// ==========================================
const crearTicket = async(req, res) => {

    const p_idp = req.body.idp;
    const p_idu = req.body.idu;
    const p_usuario = req.body.usuario;
    const p_nombre_persona = req.body.usuario_nombre;
    const p_nombre_area_usuario = req.body.nombre_area_usuario;
    const p_tipo_incidencia = req.body.IDtipoinci;
    const p_detalle = req.body.detalle;
    const p_especialista = req.body.especialista;
    const p_prioridad = req.body.tipo_prioridad;
    const p_incidenciaid = req.body.incidenciaid;

    const query = `CALL USP_REG_TICKET( "${p_tipo_incidencia}", "${p_idp}", "${p_nombre_persona}", 
    "${p_idu}", "${p_usuario}", "${p_nombre_area_usuario}" , "${p_detalle}", "${p_especialista}", "${p_prioridad}", 
    "${p_incidenciaid}" )  `;

    //console.log(query);

    const reg = await registrar(req, res, query);
    //console.log(reg);
    //console.log(reg);

    if (reg == '') {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error al crear ticket'
        })
    }
    const consulta = await consultar(req, res, reg);
    // let arreglo = {
    //     uid: consulta[0].usuarioID,
    //     nombre: consulta[0].nombre_total,
    //     usuario: consulta[0].usuario,
    //     password: consulta[0].password,
    //     role: consulta[0].nombre_rol
    // }

    // crear token
    const token =  await generarJWT( consulta[0].IDusuario );
    
    res.status(201).json({
        ok: true,
        //usuario: arreglo,
        //usuariotoken: req.usuario,
        token
    });
}

function registrar(req, res, query) {
    return new Promise((resolve, reject) => {
        consql.query(query, (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            //console.log(rows[0][0]);
            //console.log(rows[0].idp);
            resolve(rows[0][0].idp);
        });
    });
}


// ==========================================
// borrar una incidencia
// ==========================================
const borrarInci = async(req, res = response) => {
    const reg = req.params.id;

    const obtenerReg = await consultar(req, res, reg);
    if (obtenerReg == '') {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error incidencia no encontrado'
        })
    }

    const actualizareg = await eliminar(req, res, reg);
    if (actualizareg.insertId != '0') {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error al actualizar incidencia'
        });
    }
    else{
        res.status(200).json({
            ok: true,
            mensaje: "Incidenciarea eliminada"
        });
    }
}

function eliminar(req, res, reg) {
    const p_id = reg;

    const query = `
    UPDATE incidencia
    SET interno = 0
    WHERE IDincidencia = "${p_id}"
    `;
    return new Promise((resolve, reject) => {
        consql.query(query, (err, rows, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}


module.exports = {
    getTickets,
    borrarInci,
    crearTicket,
}