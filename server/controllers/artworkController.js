const Artwork = require('../models/artworkModel')
const mongoose = require('mongoose')

// Get all artwork from gallery
const getGallery = async (req, res) => {
  const gallery = await Artwork.find({}).sort({createdAt: -1})

  res.status(200).json(gallery)
}

// Get a single artwork
const getArtwork = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such artwork'})
  }

  const artwork = await Artwork.findById(id)

  if (!artwork) {
    return res.status(404).json({error: 'No such artwork'})
  }
  
  res.status(200).json(artwork)
}


// Create new artwork
const createArtwork = async (req, res) => {
  const {title, desc, stat} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!desc) {
    emptyFields.push('desc')
  }
  if(!stat) {
    emptyFields.push('stat')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // Add doc to db
  try {
    const artwork = await Artwork.create({title, desc, stat})
    res.status(200).json(artwork)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// Delete an artwork
const deleteArtwork = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such artwork'})
  }

  const artwork = await Artwork.findOneAndDelete({_id: id})

  if (!artwork) {
    return res.status(400).json({error: 'No such artwork'})
  }

  res.status(200).json(artwork)
}

// Update a artwork
const updateArtwork = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such artwork'})
  }

  const artwork = await Artwork.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!artwork) {
    return res.status(400).json({error: 'No such artwork'})
  }

  res.status(200).json(artwork)
}


module.exports = {
  getGallery,
  getArtwork,
  createArtwork,
  deleteArtwork,
  updateArtwork
}