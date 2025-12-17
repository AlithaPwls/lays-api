import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from './models/User.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = express.Router()

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required'
      })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword
    })

    await user.save()

    // 🔐 TOKEN AANMAKEN (BELANGRIJK)
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    // ✅ ZELFDE STRUCTUUR ALS LOGIN
    res.status(201).json({
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        isAdmin: user.isAdmin
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        isAdmin: user.isAdmin
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


router.delete('/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.json({ message: 'User deleted' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })

export default router