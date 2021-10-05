const {validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    //validacion de los errores que vienen de la clase de routers que vienen almacenados en el request
    const errors = validationResult(req);
    if(!errors.isEmpty() ){
      return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    validarCampos
}