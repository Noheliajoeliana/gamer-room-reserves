const registerUser = require('./register');
const login = require('./login');
const { getReservations, postReservation, removeReservation } = require('./reservation');

module.exports = {
  registerUser,
  login,
  getReservations,
  postReservation,
  removeReservation
}