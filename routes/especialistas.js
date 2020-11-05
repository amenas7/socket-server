
/*
    Ruta : /api/especialistas
*/

const { Router } = require('express');
const { check } = require ('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getEspecialistas } = require('../controllers/especialistas');
//const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario, getUsuarioByID } = require('../controllers/usuarios');

const router = Router();

router.get('/', 
    //validarJWT, 
    getEspecialistas );


// router.get('/:id', 
//             //validarJWT,
//             getInciByID 
// );

module.exports = router;