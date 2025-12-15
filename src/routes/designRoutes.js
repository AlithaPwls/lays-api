import express from 'express'
import Design from './models/Design.js'

const router = express.Router()

// POST /designs
router.post('/', async (req, res) => {
    try {
      console.log('BODY RECEIVED:', req.body) // 🔍 DEBUG
  
      const design = new Design({
        title: req.body.title,
        color: req.body.color,
        font: req.body.font
      })
  
      await design.save()
      res.status(201).json(design)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })

export default router