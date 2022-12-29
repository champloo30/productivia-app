const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Full Name required'],
        unique: false
    },
    username: {
        type: String,
        required: [true, 'Username required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        unique: false,
        minlength: [8, 'Password must be more than 8 characters']
    },
}, {
    timestamps: true,
    collection: 'users'
})

module.exports = mongoose.model("Users", userSchema)