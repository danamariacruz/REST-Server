const {response } = require('express');

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

  const usuariosPost =  (req, res = response) => {

    const body = req.body;
    /* tambien puedo desealizar el objecto y mostrar solo lo que me interesa y en la respuesta mandar esas variables
    el nombre de la variable destructurada tiene que ser igual que el de la respuesta
    const {nombre, edad} = req.body;*/
    
    res.json({
        msg: 'Esto es una peticion POST',
        body
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