const db = require('../firebase');
const collectionName = 'vuelos';

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

  module.exports = {
    getAllFlights, getFlightByNumber
  };