import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import flavorRoutes from './routes/flavorRoutes.js'



dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/flavors', flavorRoutes)

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