const Artwork = require('../models/artworkModel')
const RaspberryPiSession = require('../models/raspberryPiSession')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')

// Get all artwork from gallery
const getGallery = async (req, res) => {
  const user_id = req.user._id

  const gallery = await Artwork.find({ user_id }).sort({ createdAt: -1 })
  const artworks = gallery.map((image) => ({
    ...image._doc,
    imageURL: `/images/${image.RaspID}`,
  }))

  res.status(200).json(artworks)

  // res.status(200).json(gallery)
}

// Get a single artwork
const getArtworkById = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such artwork' })
  }

  const artwork = await Artwork.findById(id)

  if (!artwork) {
    return res.status(404).json({ error: 'No such artwork' })
  }

  const reponse = { ...artwork._doc, imageURL: `/images/${artwork.RaspID}` }

  res.status(200).json(reponse)
}

const getArtworkByRaspId = async (req, res) => {
  req.json({})
}

// Create new artwork
const createArtwork = async (req, res) => {
  const { title, desc, stat, RaspID } = req.body

  console.log(title, desc, stat)

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!desc) {
    emptyFields.push('desc')
  }
  if (!stat) {
    emptyFields.push('stat')
  }

  if (!RaspID) {
    emptyFields.push('RaspID')
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields })
  }

  // Add doc to db
  try {
    const raspberryPiId = await Artwork.findOne({ RaspID: RaspID })

    if (raspberryPiId) {
      return res
        .status(400)
        .json({ error: 'Raspberry pi ID is already associated with a panting' })
    }

    const user_id = req.user._id
    const artwork = await Artwork.create({ title, desc, stat, RaspID, user_id })
    const reponse = { ...artwork._doc, imageURL: `/images/${artwork.RaspID}` }
    res.status(200).json(reponse)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Delete an artwork
const deleteArtwork = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such artwork' })
  }

  const artwork = await Artwork.findOne({ _id: id })

  if (!artwork) {
    return res.status(400).json({ error: 'No such artwork' })
  }
  const imageDirectory = path.join(__dirname, '../images')
  const files = fs.readdirSync(imageDirectory)

  const matchingImage = files.find((file) => file.startsWith(artwork.RaspID))
  if (matchingImage) {
    const imagePath = path.join(imageDirectory, matchingImage)
    fs.unlinkSync(imagePath)
  }

  artwork.deleteOne()

  res.status(200).json(artwork)
}

// Update a artwork
const updateArtwork = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such artwork' })
  }

  const artwork = await Artwork.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
  )

  if (!artwork) {
    return res.status(400).json({ error: 'No such artwork' })
  }

  res.status(200).json(artwork)
}

const sessions = async (req, res) => {
  try {
    if (req.body && Array.isArray(req.body)) {
      for (const session of req.body) {
        await RaspberryPiSession.create(session)
      }
    }
    res.json({})
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', error })
  }
}
const getArtworkSessions = async (req, res) => {
  try {
    const { id } = req.params
    console.log('yella', id)

    const artwork = await Artwork.findById(id)

    if (!artwork) {
      res.statu(400).json({ err: 'Painting does not exit' })
    }

    const sessions = await RaspberryPiSession.find({
      RaspID: artwork.RaspID,
    }).select('-_id Happy Sad Excited Surprise Neutral')

    res.status(200).json(sessions)
  } catch (err) {}
}

const getAllSessions = async (req, res) => {
  try {
    const { id } = req.params

    const artwork = await Artwork.findById(id)

    if (!artwork) {
      res.statu(400).json({ err: 'Painting does not exit' })
    }

    const sessions = await RaspberryPiSession.find({
      RaspID: artwork.RaspID,
    }).select('-_id Happy Sad Excited Surprise Neutral')

    res.status(200).json(sessions)
  } catch (err) {}
}

const getHottest = async (req, res) => {
  try {
    const top3HappyExcitedSessions = await RaspberryPiSession.find({})
      .select('-_id RaspID Happy Sad Excited Surprise Neutral')
      .sort({ Happy: -1, Excited: -1 })
      .limit(5)

    const response = []
    for (const session of top3HappyExcitedSessions) {
      const artwork = await Artwork.findOne({ RaspID: session.RaspID }).select(
        '-_id title stat',
      )
      response.push({
        ...session._doc,
        imageURL: `/images/${session.RaspID}`,
        artwork,
      })
    }
    res.status(200).json(response)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  getGallery,
  getArtworkById,
  createArtwork,
  deleteArtwork,
  updateArtwork,
  sessions,
  getArtworkSessions,
  getAllSessions,
  getHottest,
  getArtworkByRaspId,
}
