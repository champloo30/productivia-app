const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

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

// static signup method
userSchema.statics.signup = async function(first, last, email, password) {

    // validation
    if (!first || !last || !email || !password) {
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email }) 

    if (exists) {
        throw Error('Email already exists')
    }

    const hashPass = await bcrypt.hash(password, 10)

    const user = await this.create({ first, last, email, password: hashPass })

    return user
}

// static login method
userSchema.statics.login = async function(email, password) {
    // validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email }) 

    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}


module.exports = mongoose.model("User", userSchema)