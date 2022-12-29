const Note = require('../models/note.model')

exports.getAllNotes = (req, res) => {
    Note.find()
        .then((note) => res.json(task))
        .catch((err) => 
            res
                .status(404)
                .json({ message : 'Notes not found', error: err.message })
        )
}

exports.postCreateTask = (req, res) => {
    Note.create(req.body)
        .then((data) => res.json({ message: 'Note added successfully', data }))
        .catch((err) => 
            res
                .status(400)
                .json({ message: 'Failed to add note', error: err.message })
        )
}

exports.putUpdateNote = (req, res) => {
    Note.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => res.json({ message: 'Note updated', data }))
        .catch((err) => 
            res
                .status(400)
                .json({ message: 'Failed to update task', error: err.message })
        )
}

exports.deleteNote = (req, res) => {
    Note.findByIdAndDelete(req.params.id, req.body)
        .then((data) => res.json({ message: 'Note deleted', data }))
        .catch((err) => 
            res
                .status(404)
                .json({ message: 'Note not found', error: err.message })
        )
}