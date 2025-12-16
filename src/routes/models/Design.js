import mongoose from 'mongoose'
import { ref } from 'vue'

const designSchema = new mongoose.Schema(
  {
    title: String,
    color: String,
    font: String,
    image: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  { timestamps: true }
)

export default mongoose.model('Design', designSchema)