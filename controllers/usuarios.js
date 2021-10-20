const {response } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');

  const usuariosGet = async(req, res = response) => {
      //obteniendo los valores de un query params, como no son obligatorios y express los fomatea no es 
      //necesario poner nada en la ruta
      //tambien puedo ponerle a las variable valores por defecto si no se lo envian

      const {limite = 5, desde = 0} = req.query;
      const estado = {estado:true};

      const [total,usuarios]= await Promise.all([
          Usuario.countDocuments(estado),
          Usuario.find(estado).skip(Number(desde)).limit(Number(limite))
      ]);

    res.json({
        total,
        usuarios
    })
  }

  const usuariosPut = async(req, res = response) => {
      //obteniendo el valor del parametro que me pasaron y enviandolo en la respuesta
      const {id} = req.params;
      const {_id,clave,google,correo, ...resto} = req.body;

      if (clave) {
        const salt = bcryptjs.genSaltSync();
        resto.clave = bcryptjs.hashSync(clave,salt);
      }

      const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        msg: 'Informacion actualizada',
        usuario
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

   //para guardar la data la base de datos
    await usuario.save();
    
    res.json({
        msg: 'Esto es una peticion POST',
        usuario
    })
  }

  const usuariosDelete = async (req, res = response) => {

    const {id} = req.params;

    /*eliminando fisicamente el registro de la base de datos
    const ususrio = await Usuario.findByIdAndDelete(id);*/

    //eliminando pero solo cambiando el estado
    const ususrio = await Usuario.findByIdAndUpdate(id,{estado : false});

    res.json({
      usuario : ususrio,
        msg: 'Esto es una peticion DELETE'
    })
  }

  module.exports = {
      usuariosGet,
      usuariosPut,
      usuariosPost,
      usuariosDelete
  }