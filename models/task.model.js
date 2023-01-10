const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Tasks", taskSchema)