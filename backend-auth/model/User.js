import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const User = new Schema({
  id: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  salt: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
  },
  isManager: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', User);
