import express from 'express'
import Design from './models/Design.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const designs = await Design.find()
  .populate('userId', 'email')
  .sort({ createdAt: -1 })
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

router.post('/:id/like', authMiddleware, async (req, res) => {
    try {
      const design = await Design.findById(req.params.id)
  
      if (!design) {
        return res.status(404).json({ message: 'Design not found' })
      }
  
      // ❌ eigen design liken
      if (design.userId.toString() === req.user._id.toString()) {
        return res.status(403).json({ message: 'Cannot like your own design' })
      }
  
      // ❌ al geliked
      if (design.likes.includes(req.user._id)) {
        return res.status(400).json({ message: 'Already liked' })
      }
  
      design.likes.push(req.user._id)
      await design.save()
  
      res.json({
        likes: design.likes.length
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
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