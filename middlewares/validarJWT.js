const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req,res,next) => {

    //el header tiene que ser igual al que se le pasa desde el frontend
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msq: 'El token no esta en la petición'
        })
    }

    try {
        
        //primero validamos el JWT
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);

        const usuarioAuten = await Usuario.findById(uid);

        if (!usuarioAuten) {
            return res.status(401).json({
                msg: 'No existe el usuario'
            })
        }

        if (!usuarioAuten.estado) {
            return res.status(401).json({
                msg: 'El usuario no existe'
            })
        }

        req.usuario = usuarioAuten;
        req.uid = uid;

        next()
    } catch (error) {
        return res.status(401).json({
            msq: `El token no es valido: ${error}`
        })
    }

}


module.exports = {
    validarJWT
}