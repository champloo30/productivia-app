const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {
    createJWT
} = require('../utils/auth.utils')

const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

exports.getAllUsers = (req, res) => {
    User.find()
        .then((user) => res.json(user))
        .catch((err) => 
            res
                .status(404)
                .json({ message: 'Users not found', error: err.message }) 
        )
}

exports.userSignup = (req, res, next) => {
    let { first, last, email, password, password_confirmation } = req.body

    let errors = []

    if (!first) {
        errors.push({ first: 'First name required' })
    }

    if (!last) {
        errors.push({ last: 'Last name required' })
    }

    if (!email) {
        errors.push({ email: 'Email required' })
    }

    if (!emailRegEx.test(email)) {
        errors.push({ email: 'Email is invalid' })
    }

    if (!password) {
        errors.push({ password: 'Password required' })
    }

    if (!password_confirmation) {
        errors.push({ password_confirmation: 'Password confirmation required' })
    }

    if (password != password_confirmation) {
        errors.push({ password: 'Passwords do not match' })
    }

    if (errors.length > 0) {
        return res
            .status(422)
            .json({ errors: errors })
    }

    User.findOne({email: email})
        .then(user => {
            if (user) {
                return res
                    .status(422)
                    .json({ errors: [{ user: 'Email already exists' }] })
            } else {
                const user = new User({
                    first: first,
                    last: last,
                    email: email,
                    password: password
                })
                bcrypt.hash(password, 10, function(err, hash) {
                    if (err) throw err
                    user.password = hash
                    user.save()
                        .then(response => {
                            res
                                .status(200)
                                .json({
                                    success: true,
                                    result: response
                                })
                        })
                        .catch(err => {
                            res
                                .status(500)
                                .json({
                                    errors: [{ error: err }]
                                })
                        })
                })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    errors: [{ errors: 'Something went wrong' }]
                })
        })
}

exports.getOneUser = (req, res) => {
    User.findById(req.params.id)
        .then((user) => res.json(user))
        .catch((err) => 
            res
                .status(404)
                .json({ message: 'User not found', error: err.message }) 
        )
}

exports.userLogin = (req, res) => {
    let { email, password } = req.body

    let errors = []

    if (!email) {
        errors.push({ email: 'Email required' })
    }

    if (!emailRegEx.test(email)) {
        errors.push({ email: 'Email is invalid' })
    }

    if (!password) {
        errors.push({ password: 'Password required' })
    }

    if (errors.length > 0) {
        return res
            .status(422)
            .json({ errors: errors })
    }

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res
                    .status(404)
                    .json({
                        errors: [{ user: 'User not found' }]
                    })
            } else {
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            return res
                                .status(400)
                                .json({
                                    errors: [{ password: 'Password is incorrect' }]
                                })
                        }
                        let access_token = createJWT(
                            user.email,
                            user._id,
                            3600
                        )
                        jwt.verify(access_token, process.env.TOKEN_SECRET, (err, decoded) => {
                            if (err) {
                                res
                                    .status(500)
                                    .json({ errors: err })
                            }
                            if (decoded) {
                                return res
                                    .status(200)
                                    .json({
                                        success: true,
                                        token: access_token,
                                        message: user
                                    })
                            }
                        })
                    })
                    .catch(err => {
                        res
                            .status(500)
                            .json({ errors: err })
                    })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ errors: err })
        })
            
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