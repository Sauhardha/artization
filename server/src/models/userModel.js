const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  permissions: {
    type: [String],
    default: [],
  },
  galleryId:{
    type: String,
  }
})

// Static signup method
userSchema.statics.signup = async function ({
  firstName,
  lastName,
  email,
  password,
}) {
  if (!email || !password || !firstName || !lastName) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email is already in use')
  }

  //Salt for password is an extension to pwd wehn hashed eg. "abc" -> "abcJ7G4fasdf7J"
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ firstName, lastName, email, password: hash })
  return user
}

// Static Login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  // Check Email
  const user = await this.findOne({ email })

  if (!user) {
    throw Error('Incorrect Email')
  }

  // bcrypt special function "compare" check password
  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)
