const {Router} = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');

const router = Router();

  router.get('/', usuariosGet);

  //defino cual es el parametro que esta esperando en esta ruta
  router.put('/:id',  usuariosPut);

  router.post('/', usuariosPost);

  router.delete('/',  usuariosDelete);

module.exports = router;