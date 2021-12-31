/**
  Rutas de usuario /auth
  host + /api/auth
 */

const {Router} = require('express');
const {check} = require('express-validator');

const router =  Router();

const {crearUsuario, loginUsuario, renovarToken} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validateJWT');


router.post('/new', 
[
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'El password edebe ser de 6 caracteres o mas').isLength({min: 6}),
  validarCampos
],
crearUsuario);

router.post('/', 
[
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'El password edebe ser de 6 caracteres o mas').isLength({min: 6}),
  validarCampos
],
loginUsuario);

router.get('/renew', validarJWT ,renovarToken);


 module.exports = router;