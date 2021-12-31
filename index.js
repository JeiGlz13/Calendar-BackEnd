const express = require('express');
const dbConnection = require('./database/config');
const cors = require('cors');
require('dotenv').config();

//Crear el servidor

 const app = express();

//Base de datos

dbConnection();

//CORS
app.use(cors());


 //Directorio publico
 app.use(express.static('public'));

 //Lectura y parse del body
 app.use(express.json());

 //Rutas

 //TODO: crear usurio, login, renew

 app.use('/api/auth', require('./routes/auth'));
 //TODO CRUD

 app.use('/api/events', require('./routes/events'));


 //Escuchar peticiones
 app.listen(process.env.PORT    , () =>{
     console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
 })