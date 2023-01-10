const Task = require('../models/task.model')

exports.getAllTasks = async (req, res) => {
    const user_id = req.user._id
    const tasks = await Task.find({user_id})

    res.status(200).json(tasks)
}

exports.postCreateTask = async (req, res) => {
    const {name, completed} = req.body

    try {
        const user_id = req.user._id
        const task = await Task.create({name, completed, user_id})
        res.status(201).json(task)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.putUpdateTask = (req, res) => {
    Task.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => res.json({ message: 'Task updated', data }))
        .catch((err) => 
            res
                .status(400)
                .json({ message: 'Failed to update task', error: err.message })
        )
}

exports.deleteTask = (req, res) => {
    Task.findByIdAndDelete(req.params.id, req.body)
        .then((data) => res.json({ message: 'Task deleted', data }))
        .catch((err) => 
            res
                .status(404)
                .json({ message: 'Task not found', error: err.message })
        )
}