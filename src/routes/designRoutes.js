import express from 'express'
import Design from './models/Design.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// GET /designs  → alle designs ophalen
router.get('/', authMiddleware, async (req, res) => {
    try {
      const designs = await Design.find({ userId: req.userId })
        .sort({ createdAt: -1 })
  
      res.json(designs)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })

// POST /designs → nieuw design opslaan
router.post('/', authMiddleware, async (req, res) => {
    try {
      const design = new Design({
        title: req.body.title,
        color: req.body.color,
        font: req.body.font,
        image: req.body.image,
        userId: req.userId
      })
  
      await design.save()
      res.status(201).json(design)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })

export default router