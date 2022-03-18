const express = require('express');
const billsController = require('../controllers/billsController');
const { validateToken } = require('../middleware');

const billsRoutes = express.Router();

billsRoutes.get('/bills/:id', validateToken, billsController.getGroupBills);
billsRoutes.post('/bills', validateToken, billsController.createBill);

module.exports = billsRoutes;
