const role = require('../models/role');
const Usuario = require('../models/usuario');

const esValido = async(rol = '') => {
    const existeRol = await role.findOne({rol});
    if (!existeRol) {
      throw new Error(`El rol ${rol} no es valido`)
    }
  }

  const emailValido = async(correo = '') => {
    const ExisteCorreo = await Usuario.findOne({correo});
    if (ExisteCorreo) {
        throw new Error(`El correo ${correo} ya fue registrado`);        
      }
  }
  
  const ExisteUsuarioId = async(id) => {
    const ExisteUsuario = await Usuario.findById(id);
    if (!ExisteUsuario) {
        throw new Error(`El id no es valido`);        
      }
  }

  module.exports = {
      esValido,
      emailValido,
      ExisteUsuarioId
  }