const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require('bcryptjs');
const generarJWT = require("../helpers/generar-jwt");


const login = async(req, res = response) => {

    const {correo, clave} = req.body;

    try {
        const usuario = await Usuario.findOne({correo});

        //validando si el usuario existe y si est activo
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario no es valido'
            });
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario no esta activo'
            });
        }

        //verificando la clave
        const validar = bcryptjs.compareSync(clave, usuario.clave);
        if (!validar) {
            return res.status(400).json({
                msg: 'La clave no es valida'
            });
        }

        //generando JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msq : 'Login exitoso, bienvenido(a)',
            token
        })
    } catch (error) {
        return res.status(500).json({
            msg: `Ha ocurrido un error: ${error} `
        })
    }
   
}

const googleSignIn = async(req,res=response) => {

    const {id_token} = req.body;

    res.json({
        msg: "esta funcionando",
        id_token
    })
}

module.exports = {
    login,
    googleSignIn
}