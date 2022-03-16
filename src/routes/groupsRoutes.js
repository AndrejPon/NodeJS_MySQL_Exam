const express = require('express');
const groupsController = require('../controllers/groupsController');
// const { validateUserRegister, validateUserLogin } = require('../middleware');

const groupsRoutes = express.Router();

groupsRoutes.post('/addgroup', groupsController.addGroup);

// authRoutes.get('/users', authController.usersIndex);

module.exports = groupsRoutes;
