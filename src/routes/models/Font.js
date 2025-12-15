import mongoose from 'mongoose'

const fontSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cssName: {
        type: String,
        required: true
    }
    })

    const Font = mongoose.model('Font', fontSchema)
    export default Font