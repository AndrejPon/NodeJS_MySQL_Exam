const express = require('express');
const authController = require('../controllers/authController');
const { validateUserRegister, validateUserLogin } = require('../middleware');

const authRoutes = express.Router();

authRoutes.post('/register', validateUserRegister, authController.register);
authRoutes.post('/login', validateUserLogin, authController.login);
// authRoutes.get('/users', authController.usersIndex);

module.exports = authRoutes;
