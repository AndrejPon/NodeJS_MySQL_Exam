const express = require('express');
const accountsController = require('../controllers/accountsController');
const { validateToken } = require('../middleware');

const accountsRoutes = express.Router();

accountsRoutes.post(
  '/accounts',
  validateToken,
  accountsController.createAccount,
);

// authRoutes.get('/users', authController.usersIndex);

module.exports = accountsRoutes;
