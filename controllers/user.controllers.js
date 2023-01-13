const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

function createToken(_id) {
    return jwt.sign({_id}, process.env.TOKEN_SECRET, { expiresIn: '1h' })
}

exports.getAllUsers = (req, res) => {
    User.find()
        .then((user) => res.json(user))
        .catch((err) => 
            res
                .status(404)
                .json({ message: 'Users not found', error: err.message }) 
        )
}

exports.userSignup = async (req, res) => {
    const { first, last, email, password } = req.body

    try {
        const user = await User.signup(first, last, email, password)

            // create token
        const token = createToken(user._id)

        res.status(201).json({ email, user, token })
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
}

exports.userLogin = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        // create token
        const token = createToken(user._id)

        res.status(200).json({ email, user, token })
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
}

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id, req.body)
        .then((data) => res.json({ message: 'User deleted', data }))
        .catch((err) => 
            res
                .status(404)
                .json({ message: 'User not found', error: err.message })
        )
}