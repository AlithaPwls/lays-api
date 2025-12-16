import mongoose from 'mongoose'

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
    }
  },
  { timestamps: true }
)

export default mongoose.model('Design', designSchema)