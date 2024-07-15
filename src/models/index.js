const mongoose = require('mongoose');
const Users = require('./user.model');
const Reservations = require('./reservation.model');


function mongooseConnection() {
  mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

module.exports = { Users, Reservations, mongooseConnection };