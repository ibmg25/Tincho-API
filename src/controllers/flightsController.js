const db = require('../firebase');
const collectionName = 'vuelos';

const getAllVuelos = async (req, res) => {
    try {
      const snapshot = await db.collection(collectionName).get();
      const vuelos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(vuelos);
    } catch (error) {
      console.error('Error al obtener los vuelos:', error);
      res.status(500).json({ error: 'Error al obtener los vuelos.' });
    }
  };

const getVueloByNumber = async (req, res) => {
  let number = req.params.vueloNumber
  console.log(number)
  try {
    let querySnapshot = await db.collection(collectionName).where("flightNumber", '==', number).limit(1).get()
    const vueloDoc = querySnapshot.docs[0]; 
    const vuelo = vueloDoc.data()
    res.status(200).json(vuelo)
  } catch (error) {
    console.error('Error al obtener el vuelo:', error); 
    res.status(500).json({error: "Error al obtener el vuelo"});  
  }
}

  module.exports = {
    getAllVuelos, getVueloByNumber
  };