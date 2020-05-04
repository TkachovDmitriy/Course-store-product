const admin = require('firebase-admin')
const serviceAccount = require('../react-product-list-app-firebase-adminsdk-uqzea-969049d549.json')


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://react-product-list-app.firebaseio.com"
})

const db = admin.firestore()

module.exports = { admin, db };
