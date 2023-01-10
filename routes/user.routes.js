const express = require('express')
const userRouter = express.Router()

const {
    getAllUsers,
    userSignup,
    getOneUser,
    userLogin,
    deleteUser
} = require('../controllers/user.controllers')

/**
 * @route api/user
 * @description get all users
 * @access public
 */
userRouter.get('/', getAllUsers)

/**
 * @route api/user/signup
 * @description signup user
 * @access public
 */
userRouter.post('/signup', userSignup)

/**
 * @route api/user/:id
 * @description get a users
 * @access public
 */
//  userRouter.get('/:id', getOneUser)

/**
 * @route api/user/login
 * @description login user
 * @access public
 */
userRouter.post('/login', userLogin)

/**
 * @route api/user/:id
 * @description delete a users
 * @access public
 */
 userRouter.delete('/:id', deleteUser)

module.exports = userRouter