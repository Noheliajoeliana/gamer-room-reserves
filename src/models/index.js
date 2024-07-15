const mongoose = require('mongoose');
const Users = require('./user.model');
const Reservations = require('./reservation.model');


function mongooseConnection() {
  mongoose.connect(process.env.MONGO_CONNECTION);
}

module.exports = { Users, Reservations, mongooseConnection };