/**
  Rutas de usuario /auth
  host + /api/auth
 */

const {Router} = require('express');

const router =  Router();

router.get('/', (request, response)=>{
    response.json({
        ok: true
    })
 });

 module.exports = router;