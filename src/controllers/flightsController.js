const { Timestamp } = require('firebase-admin/firestore');
const db = require('../firebase');
const collectionName = 'flights';

const getAllFlights = async (req, res) => {
    try {
      const snapshot = await db.collection(collectionName).get();
      const flights = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(flights);
    } catch (error) {
      console.error('Error al obtener los vuelos:', error);
      res.status(500).json({ error: 'Error al obtener los vuelos.' });
    }
  };

const getFlightByNumber = async (req, res) => {
  let number = req.params.flightNumber
  console.log(number)
  try {
    let querySnapshot = await db.collection(collectionName).where("flightNumber", '==', number).limit(1).get()
    const flightDoc = querySnapshot.docs[0]; 
    const flight = flightDoc.data()
    res.status(200).json(flight)
  } catch (error) {
    console.error('Error al obtener el vuelo:', error); 
    res.status(500).json({error: "Error al obtener el vuelo"});  
  }
}

const createFlight = async (req, res) => {
  const {
    departureCity,
    arrivalCity,
    departureDate,
    arrivalDate,
    airline,
    flightNumber,
    price,
    availableSeats
  } = req.body;

  try {
    const departureTimestamp = Timestamp.fromDate(new Date(departureDate));
    const arrivalTimestamp = Timestamp.fromDate(new Date(arrivalDate));

    const newFlight = {
      departureCity,
      arrivalCity,
      departureDate: departureTimestamp,
      arrivalDate: arrivalTimestamp,
      airline,
      flightNumber,
      price,
      availableSeats
    };

    await db.collection(collectionName).add(newFlight);

    res.status(201).json({ message: 'Vuelo creado exitosamente.' });
  } catch (error) {
    console.error('Error al crear el vuelo:', error);
    res.status(500).json({ error: 'Error al crear el vuelo.' });
  }
}

  module.exports = {
    getAllFlights, getFlightByNumber, createFlight
  };