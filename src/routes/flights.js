const express = require('express');
const router = express.Router();
const vuelosController = require('../controllers/flightsController');

router.get('/', vuelosController.getAllVuelos);
router.get('/:vueloNumber', vuelosController.getVueloByNumber); 

module.exports = router;