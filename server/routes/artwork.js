const express = require('express')
const Artwork = require('../models/artworkModel')
const {
  createArtwork,
  getGallery,
  getArtworkById,
  deleteArtwork,
  updateArtwork,
  sessions,
  getArtworkSessions,
  getAllSessions,
  getHottest
} = require('../controllers/artworkController')
const requireAuth = require('../middleware/requireAuth')
const multer = require('multer')

const router = express.Router()


router.post('/sessions', sessions)

router.use(requireAuth)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images/')
  },
  filename: (req, file, cb) => {
    try {
      const id = req.body.RaspID
      if (!id) {
        throw new Error('Raspberry pi Id is required')
      }
      const fileExtension = file.originalname.split('.').pop()
      const fileName = `${id}.${fileExtension}`
      cb(null, fileName)
    } catch (err) {
      console.error(err)
      // cb(err)
    }
  },
})

const upload = multer({ storage: storage })

// GET all art in gallery
router.get('/', getGallery)



//GET a single artwork
router.get('/:id', getArtworkById)

router.get('/:id/sessions', getArtworkSessions)

router.get('/:id/sessions/all', getAllSessions)

router.get('/sessions/hottest', getHottest)

// POST a new artwork
router.post('/', upload.single('image'), createArtwork);

// DELETE a artwork
router.delete('/:id', deleteArtwork)

// UPDATE a artwork
router.patch('/:id', updateArtwork)

module.exports = router
