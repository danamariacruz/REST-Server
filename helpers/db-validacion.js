const role = require('../models/role');

const esValido = async(rol = '') => {
    const existeRol = await role.findOne({rol});
    if (!existeRol) {
      throw new Error(`El rol ${rol} no es valido`)
    }
  }

  module.exports = {
      esValido
  }