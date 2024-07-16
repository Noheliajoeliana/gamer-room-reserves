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
  startWeek: {
    type: Number
  },
  endWeek: {
    type: Number
  },
  title: {
    type: String,
    maxLength: 100
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }
});

module.exports =  mongoose.model('reservations', Reservation);
