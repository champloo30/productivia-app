const Task = require('../models/task.model')

exports.getAllTasks = (req, res) => {
    Task.find()
        .then((task) => res.json(task))
        .catch((err) => 
            res
                .status(404)
                .json({ message: 'Tasks not found', error: err.message }) 
        )
}

exports.postCreateTask = (req, res) => {
    Task.create(req.body)
        .then((data) => res.json({ message: 'Task added successfully', data }))
        .catch((err) => 
            res
                .status(400)
                .json({ message: 'Failed to add task', error: err.message })
        )
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