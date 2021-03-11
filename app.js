"use strict"

//cargar modulos de node para crear el servidor
const express =require("express");
const bodyParser= require ("body-parser");


//ejecutar express (http)
const app = express()

 //cargar ficheros rutas

const user_routes = require ("./routes/user")  


//cargar middelwares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//CORS
// Configurar cabeceras y cors, para el fronted. esto es importante.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//añadir prefijos a rutas / cargar rutas

 app.use("/api", user_routes); 

//ruta o metodo de prueba



//exportar modulo (fichero actual)
module.exports=app;