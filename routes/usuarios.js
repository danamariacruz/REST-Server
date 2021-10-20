const {Router} = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { esValido, emailValido, ExisteUsuarioId } = require('../helpers/db-validacion');
const { validarCampos } = require('../middlewares/validarCampos');


const router = Router();

  router.get('/', usuariosGet);

  //defino cual es el parametro que esta esperando en esta ruta
  router.put('/:id',[
     check('id','No es un id valido').isMongoId(),
     check('id').custom(ExisteUsuarioId),
     check('rol').custom(esValido),
     validarCampos
  ], usuariosPut);

  //aqui en el segundo parametro es en donde se definen los middlewels que haran la validaciones del formulario
  //antes de llevarlos al controlador; El primer valor es el campo que se quiere validar y el segundo el mensaje
  router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(emailValido),
    check('clave','El clave tiene que tener minimo 6 caracteres').isLength({min:6}),
    //validacion del rol mediante un arreglo de string
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    
    //validacion del rol mediante la info de la base de datos
    check('rol').custom(esValido),
    validarCampos,
  ] ,usuariosPost);

  router.delete('/:id', [
    check('id','No es un id valido').isMongoId(),
     check('id').custom(ExisteUsuarioId),
     validarCampos
  ] ,usuariosDelete);

module.exports = router;