import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import flavorRoutes from './routes/flavorRoutes.js'
import colorRoutes from './routes/colorRoutes.js'
import fontRoutes from './routes/fontRoutes.js'
import designRoutes from './routes/designRoutes.js'
import authRoutes from './routes/authRoutes.js'



dotenv.config()
const app = express()
app.use(express.json())


app.use(cors())
const PORT = process.env.PORT || 3000


app.use('/flavors', flavorRoutes)
app.use('/colors', colorRoutes)
app.use('/fonts', fontRoutes)
app.use('/designs', designRoutes)
app.use('/auth', authRoutes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB CONNECTED'))
  .catch(err => console.error('❌ MongoDB error:', err))

app.get('/', (req, res) => {
  res.send('Lays API is workingggg 🎉')
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})