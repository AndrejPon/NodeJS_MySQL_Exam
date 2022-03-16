const express = require('express');
const accountsController = require('../controllers/accountsController');
const { validateToken } = require('../middleware');

const accountsRoutes = express.Router();

accountsRoutes.post(
  '/accounts',
  validateToken,
  accountsController.createAccount,
);

accountsRoutes.get(
  '/accounts',
  validateToken,
  accountsController.getUserGroups,
);

module.exports = accountsRoutes;
