
/*
    Ruta : /api/estados_ticket
*/

const { Router } = require('express');
const { check } = require ('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getEstadosTicket } = require('../controllers/estados_ticket');


const router = Router();

router.get('/', 
    validarJWT, 
    getEstadosTicket );



module.exports = router;