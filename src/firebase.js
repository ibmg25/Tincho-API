const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const dotenv = require('dotenv');

dotenv.config();

initializeApp({
    credential: applicationDefault(),
    // databaseURL no es estrictamente necesario para Firestore, pero puedes incluirlo si lo necesitas
    // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
  });

const db = getFirestore();

module.exports = db;