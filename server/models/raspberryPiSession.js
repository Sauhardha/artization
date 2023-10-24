const mongoose = require('mongoose')

const Schema = mongoose.Schema

const raspberryPiSession = new Schema(
  {
    RaspID: {
      type: Number,
      required: true,
    },
    SessionID: {
      type: Number,
      required: true,
    },
    Happy: {
      type: Number,
      required: true,
    },
    Sad: {
      type: Number,
      required: true,
    },
    Excited: {
      type: Number,
      required: true,
    },
    Surprise: {
      type: Number,
      required: true,
    },
    Neutral: {
      type: Number,
      required: true,
    },
    Seconds: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('RaspberryPiSession', raspberryPiSession)
