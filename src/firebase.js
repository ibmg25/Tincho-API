const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  console.error('FIREBASE_SERVICE_ACCOUNT no está definido en las variables de entorno.');
  process.exit(1); 
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} catch (error) {
  console.error('Error al parsear FIREBASE_SERVICE_ACCOUNT:', error);
  process.exit(1); 
}

initializeApp({
    credential: cert(serviceAccount),
    // databaseURL no es estrictamente necesario para Firestore, pero puedes incluirlo si lo necesitas
    // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
  });

const db = getFirestore();

module.exports = db;