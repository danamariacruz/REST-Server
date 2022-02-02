const {Router} = require('express');
const { check } = require('express-validator');
const { login,googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('clave','La clave es obligatorio').not().notEmpty(),
    validarCampos
], login);

router.post('/google',[
    check('id_token','El id_token es obligatorio').not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;