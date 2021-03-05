import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ArCategory = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('ArCategory', ArCategory);
