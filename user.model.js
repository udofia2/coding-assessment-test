const mongoose = require('mongoose')

const {
  Schema
} = mongoose

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
},
{
  timestamps: true
})

module.exports = mongoose.model('users', User)