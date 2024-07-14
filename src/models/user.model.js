const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
  fullName: {
    type: String,
    required: true,
    maxLength: 100
  },
  document: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  career: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('users', User);