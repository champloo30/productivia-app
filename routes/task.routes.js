const express = require('express')
const taskRouter = express.Router()

const {
    getAllTasks,
    postCreateTask,
    putUpdateTask,
    deleteTask
} = required('../controllers/task.controllers')

/**
 * @route GET api/task
 * @description get all tasks
 * @access public
 */
taskRouter.get('/', getAllTasks)

/**
 * @route POST api/task
 * @description create a new task
 * @access public
 */
taskRouter.post('/add', postCreateTask)

/**
 * @route PUT api/task/:id
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

module.exports = tasksRouter