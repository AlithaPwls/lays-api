import express from 'express'
import Color from '../models/Color.js'

const router = express.Router()

// GET /colors
router.get('/', async (req, res) => {
  try {
    const colors = await Color.find()
    res.json(colors)
  } catch (error) {
    res.status(500).json({ message: 'Fout bij ophalen colors' })
  }
})

export default router