const jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;



const validarJWT = (req, res, next) =>{
    // leer el token
    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const { uid } = jwt.verify( token, SEED );

        //console.log(uid);

        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token incorrecto'
        });
    }   
    
}

const validarJWT_params = (req, res, next) =>{
    // leer el token
    let token = req.query.x-token;
    //const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const { uid } = jwt.verify( token, SEED );

        //console.log(uid);

        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token incorrecto'
        });
    }   
    
}

module.exports = {
    validarJWT,
    validarJWT_params
}