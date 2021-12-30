const express = require('express');
require('dotenv').config();

//Crear el servidor

 const app = express();

 //Directorio publico
 app.use(express.static('public'));

 //Rutas

 //TODO: crear usurio, login, renew

 app.use('/api/auth', require('./routes/auth'));
 //TODO CRUD


 //Escuchar peticiones
 app.listen(process.env.PORT    , () =>{
     console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
 })