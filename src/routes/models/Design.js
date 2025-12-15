import mongoose from 'mongoose'

const designSchema = new mongoose.Schema({
    title: String,
    color: String,
    font: String,
    image: String
}, { timestamps: true })

export default mongoose.model('Design', designSchema)