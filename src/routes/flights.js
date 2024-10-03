const express = require('express');
const router = express.Router();
const vuelosController = require('../controllers/flightsController');

router.get('/', vuelosController.getAllVuelos);

module.exports = router;