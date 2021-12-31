const { Router } = require("express");
const { check } = require("express-validator");
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const isDate = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validateJWT");

//Obtener eventos
const router = Router();

/*
    Ruta Events routes
*/
router.use(validarJWT);

router.get('/', 
[
    check()
],
getEventos);

router.post('/', 
[
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('start', 'La fecha de fin es obligatoria').custom(isDate),
    validarCampos
],
crearEvento);

router.put('/:id', 
[
    check()
],
actualizarEvento);

router.delete('/:id', 
[
    check()
],
eliminarEvento);

module.exports = router;