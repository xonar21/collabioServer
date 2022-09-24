const mongoose = require('mongoose');

const { isURL } = require('validator');

const movieSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  }, 
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
