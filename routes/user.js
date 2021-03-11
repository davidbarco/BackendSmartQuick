'use strict'

var express = require('express');
var UserController = require('../controllers/user');
const mdAuth = require('../middlewares/authenticated')

var router = express.Router();

const multiparty = require('connect-multiparty');
const middleware_upload= multiparty({uploadDir:"./upload/usuarios"});



router.post('/register', UserController.create)
router.post('/login', UserController.login)


module.exports = router;