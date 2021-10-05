const {response } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');

  const usuariosGet = (req, res = response) => {
      //obteniendo los valores de un query params, como no son obligatorios y express los fomatea no es 
      //necesario poner nada en la ruta
      //tambien puedo ponerle a las variable valores por defecto si no se lo envian

      const {nombre = 'no disponible', apikey, limit} = req.query;

    res.json({
        msg: 'Esto es una peticion GET desde el controlador',
    nombre,
    limit,
    apikey
    })
  }

  const usuariosPut = (req, res = response) => {
      //obteniendo el valor del parametro que me pasaron y enviandolo en la respuesta

      const {id} = req.params;

    res.json({
        msg: 'Esto es una peticion PUT',
        id
    })
  }

  const usuariosPost =  async (req, res = response) => {
    /* tambien puedo desealizar el objecto y mostrar solo lo que me interesa y en la respuesta mandar esas variables
    el nombre de la variable destructurada tiene que ser igual que el de la respuesta
    const {nombre, edad} = req.body;*/    

    const {nombre, correo, clave, rol } = req.body;

    const usuario = new Usuario({nombre, correo, clave, rol});

    // Encriptando la clave
    const salt = bcryptjs.genSaltSync(); //para definir el no. de vueltas que se le quiere dar a una clave mientras mas alto mas fuerte en el encriptado
    usuario.clave = bcryptjs.hashSync(clave,salt);

    //validando si el correo existe
    const ExisteCorreo = await Usuario.findOne({correo});
    if (ExisteCorreo) {
      return res.status(400).json({
        mensaje: 'El correo ya fue registrado'
      });
    }

    //para guardar la data la base de datos
    await usuario.save();
    
    res.json({
        msg: 'Esto es una peticion POST',
        usuario
    })
  }

  const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'Esto es una peticion DELETE'
    })
  }

  module.exports = {
      usuariosGet,
      usuariosPut,
      usuariosPost,
      usuariosDelete
  }