import mongoose from 'mongoose'

const designSchema = new mongoose.Schema({
    title: String,
    color: String,
    font: String
})

export default mongoose.model('Design', designSchema)