const express = require('express');


// Controller functions
const {signupUser, loginUser} = require('../controllers/authController');

const router = express.Router();


// Login Route
router.post('/login', loginUser);

// Signup Route
router.post('/signup', signupUser);




module.exports = router

