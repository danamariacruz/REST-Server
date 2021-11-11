const {Router} = require('express');
const { TasaGet, IndiceGet, UserGet, HistorialGet, HistorialLogs } = require('../controllers/OpenSource');


const router = Router();

router.get('/tasa/:CodigoMoneda', TasaGet);

router.get('/indice', IndiceGet);

router.get('/usuario/', UserGet);

router.get('/historial/', HistorialGet);

router.get('/logs/', HistorialLogs);


 module.exports = router;