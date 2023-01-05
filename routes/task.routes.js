const express = require('express')
const taskRouter = express.Router()

const {
    getAllTasks,
    postCreateTask,
    putUpdateTask,
    deleteTask
} = require('../controllers/task.controllers')

/**
 * @route GET api/task
 * @description get all tasks
 * @access public
 */
taskRouter.get('/', getAllTasks)

/**
 * @route POST api/task/add
 * @description create a new task
 * @access public
 */
taskRouter.post('/add', postCreateTask)

/**
 * @route PUT api/task/edit/:id
 * @description update task
 * @access public
 */
taskRouter.put('/edit/:id', putUpdateTask)

/**
 * @route DELETE api/task/:id
 * @description delete task
 * @access public
 */
taskRouter.delete('/:id', deleteTask)

module.exports = taskRouter