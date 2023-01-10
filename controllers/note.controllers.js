const Note = require('../models/note.model')

exports.getAllNotes = async (req, res) => {
    const user_id = req.user._id
    const notes = await Note.find({user_id})

    res.status(200).json(notes)
}

exports.postCreateNote = async (req, res) => {
    const {category, title, content} = req.body

    try {
        const user_id = req.user._id
        const note = await Note.create({category, title, content, user_id})
        res.status(201).json(note)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.getOneNote = (req, res) => {
    Note.findById(req.params.id)
        .then((note) => res.json(note))
        .catch((err) => 
            res
                .status(404)
                .json({ message : 'Note not found', error: err.message })
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