const admin = require('firebase-admin')
const serviceAccount = require('./findMiniAccountKey.json')
const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://find-mini.firebaseio.com'
})

const authenticate = require('./authenticate')

exports.authenticate = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    authenticate(admin, request, response)
  })
})
