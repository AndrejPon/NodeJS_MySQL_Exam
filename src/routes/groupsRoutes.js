const express = require('express');
const groupsController = require('../controllers/groupsController');

const groupsRoutes = express.Router();

groupsRoutes.post('/addgroup', groupsController.addGroup);

module.exports = groupsRoutes;
