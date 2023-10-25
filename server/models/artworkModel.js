const mongoose = require('mongoose')

const Schema = mongoose.Schema

const artworkSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  stat: {
    type: String,
    required: true
  },
  RaspID:{
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Artwork', artworkSchema)