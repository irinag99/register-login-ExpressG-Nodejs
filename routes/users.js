var express = require('express');
var router = express.Router();
const path = require('path');
const usersController = require('../controllers/usersController');
const validator = require('../middlewares/validator');






router.get('/register', usersController.register);
router.post('/register', validator.register, usersController.processRegister);
router.get('/login', usersController.login);
router.post('/login', usersController.processLogin);
router.post('/logout', usersController.logout);



module.exports = router;


