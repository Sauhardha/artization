const express = require('express');
// const {signupUser, loginUser} = require('../controllers/authController');
const {getAllUsers, setUserPermissions, getUserPermissions, deleteUser, updateUser} = require('../controllers/userController');


const router = express.Router();


// Login Route
// router.post('/login', loginUser);

// // Signup Route
// router.post('/signup', signupUser);

router.get('/', getAllUsers)

router.get('/permissions/:id', getUserPermissions)

router.post('/permissions', setUserPermissions);

router.put('/:id', updateUser)

router.delete('/:id', deleteUser);


module.exports = router

