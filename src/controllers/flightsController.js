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

const updateAvailableSeats = async (req, res) => {
  const { seatsToBook } = req.body;
  const { id } = req.params;
  try {
    const flightDocRef = db.collection(collectionName).doc(id);
    const flightDoc = await flightDocRef.get();

    if (!flightDoc.exists) {
      console.log(`Vuelo con ID ${id} no encontrado.`);
      return res.status(404).json({ error: 'Vuelo no encontrado' });
    }

    const currentSeats = flightDoc.data().availableSeats;
    const updatedSeats = currentSeats - seatsToBook;

    if (updatedSeats < 0) {
      return res.status(400).json({ error: 'No hay suficientes asientos disponibles.' });
    }

    await flightDoc.ref.update({ availableSeats: updatedSeats });

    res.status(200).json({
      message: `Se han reservado ${seatsToBook} asientos.`,
      availableSeats: updatedSeats
    });

  } catch (error) {
    console.error('Error al actualizar los asientos:', error);
    res.status(500).json({ error: 'Error al actualizar los asientos disponibles.' });
  }
}

  module.exports = {
    getAllFlights, getFlightByNumber, createFlight, updateAvailableSeats
  };