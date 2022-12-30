const express = require('express')
const noteRouter = express.Router()

const Note = require('../models/notes.model')

/**
 * @route GET api/note
 * @description get all notes
 * @access public
 */
noteRouter.get('/', async (req, res) => {
    try {
        const notes = await Note.find()
        res.json(notes)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

/**
 * @route POST api/note/add
 * @description create a new note
 * @access public
 */
noteRouter.post('/add', async (req, res) => {
    const note = new Note({
        category: req.body.category,
        title: req.body.title,
        content: req.body.content
    })

    try {
        const newNote = await note.save()
        res.status(201).json(newNote)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

/**
 * @route GET api/note/:id
 * @description get a notes
 * @access public
 */
 noteRouter.get('/:id', getNote, async (req, res) => {
     res.json(res.note)
 })

/**
 * @route PUT api/note/edit/:id
 * @description update task
 * @access public
 */
noteRouter.put('/edit/:id', getNote, async (req, res) => {
    if (req.body.title == null) {
        res.note.title = req.body.title
    }
    if (req.body.content == null) {
        res.note.content = req.body.content
    }
    try {
        const updatedNote = await res.note.save()
        res.json(updatedNote)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

/**
 * @route DELETE api/note/:id
 * @description delete note
 * @access public
 */
noteRouter.delete('/:id', getNote, async (req, res) => {
    try {
        await res.note.delete()
        res.json({ message: 'Note deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getNote(req, res, next) {
    let note
    try {
        note = await Note.findById(req.params.id)
        if (note == null) {
            return res.status(404).json({ message: 'Cannot find note' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    res.note = note
    next()
}

module.exports = noteRouter