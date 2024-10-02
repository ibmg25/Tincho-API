const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('API de Agencia de Viajes');
  });

app.use((req, res) => {
res.status(404).json({ error: 'Ruta no encontrada.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});