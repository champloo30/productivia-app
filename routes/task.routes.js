const express = require('express')
const taskRouter = express.Router()

const Task = require('../models/task.model')

/**
 * @route GET api/task
 * @description get all tasks
 * @access public
 */
taskRouter.get('/', async (req, res) => {
    try {
        const tasks = await Task.find()
        res.json(tasks)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

/**
 * @route POST api/task/add
 * @description create a new task
 * @access public
 */
taskRouter.post('/add', async (req, res) => {
    const task = new Task({
        name: req.body.name,
        completed: req.body.completed
    })

    try {
        const newTask = await task.save()
        res.status(201).json(newTask)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

/**
 * @route PUT api/task/edit/:id
 * @description update task
 * @access public
 */
taskRouter.put('/edit/:id', getTask, async (req, res) => {
    if (req.body.name != null) {
        res.task.name = req.body.name
    }
    if (req.body.completed != null) {
        res.task.completed = req.body.completed
    }
    try {
        const updatedTask = await res.task.save()
        res.json(updatedTask)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

/**
 * @route DELETE api/task/:id
 * @description delete task
 * @access public
 */
taskRouter.delete('/:id', getTask, async (req, res) => {
    try {
        await res.task.delete()
        res.json({ message: 'Task deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getTask(req, res, next) {
    let task
    try {
        task = await Task.findById(req.params.id)
        if (task == null) {
            return res.status(404).json({ message: 'Cannot find task' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.task = task
    next()
}

module.exports = taskRouter