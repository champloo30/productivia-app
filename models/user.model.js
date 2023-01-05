const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    first: {
        type: String,
        required: [true, 'First name required'],
        unique: false
    },
    last: {
        type: String,
        required: [true, 'Last name required'],
        unique: false
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
},
{
    timestamps: true,
    collection: 'users'
})

module.exports = mongoose.model("Users", userSchema)