import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const GuestBook = new Schema({
  created: { type: Date, default: Date.now },
  name: {
    type: String,
  },
  content: {
    type: String,
  },
});

module.exports = mongoose.model('GuestBook', GuestBook);
