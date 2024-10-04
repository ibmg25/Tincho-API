const express = require('express');
const router = express.Router();
const flightsController = require('../controllers/flightsController.js');

router.get('/', flightsController.getAllFlights);
router.get('/:id', flightsController.getFlightByID); 
router.post('/createFlight', flightsController.createFlight);
router.patch('/updateAvailableSeats/:id', flightsController.updateAvailableSeats);  

module.exports = router;