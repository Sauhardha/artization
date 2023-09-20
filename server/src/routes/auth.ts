import express from 'express'
import auth from '../authHelper/auth'

const router = express()

router.post('/register', auth.register)

export default router;
