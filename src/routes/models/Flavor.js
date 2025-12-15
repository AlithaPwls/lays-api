import mongoose from 'mongoose'

const flavorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
})

const Flavor = mongoose.model('Flavor', flavorSchema)

export default Flavor