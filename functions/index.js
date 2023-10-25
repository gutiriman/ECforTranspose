const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './.env' });
const createCheckoutSession = require('./api/checkout');

const functions = require("firebase-functions");

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors({ origin: true }));

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/create-checkout-session', createCheckoutSession);

//if (process.env.FUNCTIONS_EMULATOR) {//running on firebase this will be true
exports.app = functions.https.onRequest(app);
//} else {
app.listen(port, () => console.log('server listening on port', port));
//}