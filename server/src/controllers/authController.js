const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}


// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        // Create a token
        const token = createToken(user._id);

        // Return the same data as in the signup handler
        const resObj = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            permissions: user.permissions
        };

        res.status(200).json({ ...resObj, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const signupUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const user = await User.signup(firstName, lastName, email, password);

        // Create a token
        const token = createToken(user._id);

        let resObj = {};

        if (user) {
            resObj = {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                permissions: user.permissions
            };
        }

        res.status(200).json({ ...resObj, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = { signupUser , loginUser }