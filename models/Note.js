const mongoose = require('mongoose');

const { Schema } = mongoose;

const noteSchema = new Schema({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Note', noteSchema);
