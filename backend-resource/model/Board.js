import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Board = new Schema({
  author: {
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  created: { type: Date, default: Date.now },
  modified: { type: Date, default: Date.now },
  url: {
    type: String,
  },
});

module.exports = mongoose.model('Board', Board);
