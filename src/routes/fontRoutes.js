import express from 'express'
import Font from './models/Font.js'

const router = express.Router()

// GET /fonts
router.get('/', async (req, res) => {
  try {
    const fonts = await Font.find()
    res.json(fonts)
  } catch (error) {
    res.status(500).json({ message: 'Fout bij ophalen fonts' })
  }
})

export default router