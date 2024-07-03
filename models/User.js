const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  jobTitle: {
    type: String,
    trim: true,
  },
  organization: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  function: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactInformation: {
    type: String,
    trim: true,
  },
  resume: {
    type: String,
    trim: true,
  },
  // role: {
  //   type: String,
  //   enum: ['user', 'admin'],
  //   default: 'user',
  // },
  role: {
    type: String,
    required: true,
    trim: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
