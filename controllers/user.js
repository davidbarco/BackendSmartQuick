'use strict'

const fs = require("fs");
const path= require("path");
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');
var User = require('../models/user');

var controller={
    
    /* metodo para crear un usuario */
    create:(req, res)=> {
        let user = new User()
    
        let params = req.body
    
        user.firstName = params.firstName
        user.lastname = params.lastname
        user.email = params.email.toLowerCase()
        user.role = 'ROLE_COORDINADOR'
        user.image = 'null'
    
        if (params.password) {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    console.log(err)
                } else {
                    bcrypt.hash(params.password, salt, null, function (err, hash) {
                        user.password = hash
                        if (user.firstName != null && user.lastname != null && user.email != null) {
                            User.findOne({ email: user.email }, (err, userEmail) => {
                                if (userEmail) {
                                    console.log("Ya existe")
                                    res.status(200).send({ message: "El correo ya existe" })
                                } else {
                                    user.save((err, userStored) => {
                                        if (err) {
                                            res.status(500).send({ message: 'Error al guardar usuario' })
                                        } else {
                                            if (!userStored) {
                                                res.status(404).send({ message: 'No se ha registrado el usuario' })
                                            } else {
                                                res.status(200).send({ user: userStored })
                                            }
                                        }
                                    })
                                }
                            })
    
                        }
                    })
                }
            })
        } else {
            res.status(200).send({ message: 'Introduce la contraseña' })
        }
    },

    /* metodo para logear al usuario */
    login:(req, res)=> {
        let params = req.body;
        let email = params.email
        let pass = params.password
    
    
        User.findOne({ email: email.toLowerCase() }, (err, user) => {
            if (err) {
                res.status(500).send({ message: 'Error en la petición' })
            } else {
                if (!user) {
                    res.status(404).send({ message: 'El usuario no existe' })
                } else {
                    bcrypt.compare(pass, user.password, function (err, check) {
                        if (check) {
                            if (params.gethash) {
                                res.status(200).send({
                                    token: jwt.userToken(user)
                                })
                            } else {
                                res.status(200).send({ token: jwt.userToken(user)})
                            }
                        } else {
                            res.status(404).send({ message: 'El usuario no ha podido logearse' })
                        }
                    })
                }
            }
        })
    },

};

module.exports= controller;