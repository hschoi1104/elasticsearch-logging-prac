import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ShortUrl = new Schema({
  key: {
    type: String,
    required: true,
    trim: true,
  },
  objectId: { type: Schema.Types.ObjectId, ref: 'ArObject' },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ShortUrl', ShortUrl);
