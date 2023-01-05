const express = require('express')
const noteRouter = express.Router()

const {
    getAllNotes,
    postCreateNote,
    getOneNote,
    putUpdateNote,
    deleteNote
} = require('../controllers/note.controllers')

/**
 * @route GET api/note
 * @description get all notes
 * @access public
 */
noteRouter.get('/', getAllNotes)

/**
 * @route POST api/note/add
 * @description create a new note
 * @access public
 */
noteRouter.post('/add', postCreateNote)

/**
 * @route GET api/note/:id
 * @description get a notes
 * @access public
 */
 noteRouter.get('/:id', getOneNote)

/**
 * @route PUT api/note/edit/:id
 * @description update task
 * @access public
 */
noteRouter.put('/edit/:id', putUpdateNote)

/**
 * @route DELETE api/note/:id
 * @description delete note
 * @access public
 */
noteRouter.delete('/:id', deleteNote)

module.exports = noteRouter