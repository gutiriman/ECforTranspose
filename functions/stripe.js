const stripeAPI = require('stripe')(process.env.SECRET_KEY); //secret key is used in backend.
module.exports = stripeAPI;