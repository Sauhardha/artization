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
  artist_email: {
    type: String,
    required: true
  },
  RaspID:{
    type: Number,
    required: true
  },
  galleryId:{
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Artwork', artworkSchema)