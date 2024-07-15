const registerUser = require('./register');
const login = require('./login');
const { getReservations, postReservation } = require('./reservation');

module.exports = {
  registerUser,
  login,
  getReservations,
  postReservation
}