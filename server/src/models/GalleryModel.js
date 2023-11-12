const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gallerySchema = new Schema({
  displayName: {
    type: String,
    required: true,
  },
  technicalContactEmail: {
    type: String,
    required: true,
  },
  technicalContactPhone: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
