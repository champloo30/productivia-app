const mongoose = require('mongoose')

const Schema = mongoose.Schema

const noteSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("Notes", noteSchema)