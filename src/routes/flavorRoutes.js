import express from 'express'
import Flavor from './models/Flavor.js'

const router = express.Router()

// GET /flavors
router.get('/', async (req, res) => {
  try {
    const flavors = await Flavor.find()
    res.json(flavors)
  } catch (error) {
    res.status(500).json({ message: 'Fout bij ophalen flavors' })
  }
})

export default router