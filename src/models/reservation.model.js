const mongoose = require('mongoose');
const { Schema } = mongoose;

const Reservation = new Schema({
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  screen: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  }
});

module.exports =  mongoose.model('reservations', Reservation);
