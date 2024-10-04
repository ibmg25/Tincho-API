const express = require('express');
const router = express.Router();
const flightsController = require('../controllers/flightsController.js');

router.get('/', flightsController.getAllFlights);
router.get('/:flightNumber', flightsController.getFlightByNumber); 
router.post('/createFlight', flightsController.createFlight);  

module.exports = router;