const express = require('express');


// Controller functions
const {createGallery, getGalleries, getOneGallery} = require('../controllers/galleryController');

const router = express.Router();


// Login Route
router.get('/', getGalleries);

// Signup Route
router.post('/', createGallery);
router.get('/:id', getOneGallery);





module.exports = router

