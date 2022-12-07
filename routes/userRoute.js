import express from 'express'
import {signin} from '../controllers/userController.js'
import {signup} from '../controllers/userController.js'

const router = express.Router()

// User signin  localhost:5000/user/signin
router.post('/signin',signin)

// User signup  localhost:5000/user/signup
router.post('/signup',signup)

export default router