const express = require('express')
const Artwork = require('../models/artworkModel')
const {
  createArtwork,
  getGallery,
  getArtwork,
  deleteArtwork,
  updateArtwork
} = require('../controllers/artworkController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
//router.use(requireAuth)

// GET all art in gallery
router.get('/', getGallery)

//GET a single artwork
router.get('/:id', getArtwork)

// POST a new artwork
router.post('/', createArtwork)

// DELETE a artwork
router.delete('/:id', deleteArtwork)

// UPDATE a artwork
router.patch('/:id', updateArtwork)


module.exports = router