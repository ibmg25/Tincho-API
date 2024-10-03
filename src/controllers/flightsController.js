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

  module.exports = {
    getAllVuelos
  };