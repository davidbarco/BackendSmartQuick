'use strict'

const mongoose = require('mongoose');
var app = require('./app');
var port = 3900;
mongoose.set('useFindAndModify', false);

mongoose.Promise= global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_netflix', {useNewUrlParser: true,useUnifiedTopology: true})
         .then(()=>{  
            console.log("conexion a base de datos correctamente");

            /* crear servidor y escuchar peticiones http */
            app.listen(port,()=>{
                console.log("servidor corriendo en http://localhost:" + port);
             });
        });