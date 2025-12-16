import express from 'express'
import Design from './models/Design.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const designs = await Design.find().sort({ createdAt: -1 })
  res.json(designs)
})

router.post('/', authMiddleware, async (req, res) => {
  const design = new Design({
    title: req.body.title,
    color: req.body.color,
    font: req.body.font,
    image: req.body.image,
    userId: req.user._id
  })

  await design.save()
  res.status(201).json(design)
})

router.delete('/:id', authMiddleware, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Admin only' })
  }

  await Design.findByIdAndDelete(req.params.id)
  res.json({ message: 'Design deleted' })
})

router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
      await Design.findByIdAndDelete(req.params.id)
      res.json({ message: 'Design deleted' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })

export default router