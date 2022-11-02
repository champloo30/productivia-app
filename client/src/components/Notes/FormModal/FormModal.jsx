import React, { useState } from 'react'
import './formModal.scss'

export default function Form(props) {
  const [title, setTitle] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [content, setContent] = useState('')
  const [newContent, setNewContent] = useState('')
  const [category, setCategory] = useState('')

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  function handleContentChange(e) {
    setContent(e.target.value)
  }

  function handleNewTitleChange(e) {
    setNewTitle(e.target.value)
  }

  function handleNewContentChange(e) {
    setNewContent(e.target.value)
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    category === 'Notes' ? props.addNotes(title, content) : props.addJournal(title, content)
    setTitle('')
    setContent('')
    props.onClose()
  }

  function handleEditSubmit(e) {
    e.preventDefault()
    props.editNote(props.id, newTitle, newContent)
    setNewTitle('')
    setNewContent('')
    props.onClose()
    props.setNoteEditing(false)
    console.log(props.id);
    console.log(newTitle);
    console.log(newContent);
  }

  function onEditClose() {
    props.setNoteEditing(false)
    props.onClose()
  }

  if (!props.show) {
    return null
  }

  const editingTemplate = (
    <form className='form-modal' onSubmit={handleEditSubmit}>
      <div className="form-container">
        <h1>Update {category === 'Notes' ? 'Note' : 'Journal'}</h1>
        <div className="fieldset">
          <input 
            id={props.id}
            type="text" 
            name="title" 
            value={newTitle} 
            placeholder={`${title}`} 
            onChange={handleNewTitleChange} 
          />
          <textarea 
            name="content" 
            value={newContent} 
            id="textarea" 
            placeholder={content} 
            required 
            onChange={handleNewContentChange}
          ></textarea>
        </div>
        <div className="bottom-btn-group">
          <button className='note-btn close' type='button' onClick={onEditClose}>Close</button>
          <button className='note-btn save' type='submit'>Save</button>
        </div>
      </div>
    </form>
  )

  const formTemplate = (
    <form className='form-modal' onSubmit={handleFormSubmit}>
      <div className="form-container">
        <h1>New Note</h1>
        <div className="radios">
          <div className="radioset">
            <input type="radio" name="note-journal" id="note" value={category} onClick={() => setCategory('Notes')} />
            <label className='radio-label' htmlFor="note">Note</label>
          </div>
          <div className="radioset">
            <input type="radio" name="note-journal" id="journal" value={category} onClick={() => setCategory('Journal')} />
            <label className='radio-label' htmlFor="journal">Journal</label>
          </div>
        </div>
        <div className="fieldset">
          <input 
            id={props.id}
            type="text" 
            name="title" 
            value={title} 
            placeholder='Title' 
            onChange={handleTitleChange} 
          />
          <textarea 
            name="content" 
            value={content} 
            id="textarea" 
            placeholder='Type your content here' 
            required 
            onChange={handleContentChange}
          ></textarea>
        </div>
        <div className="bottom-btn-group">
          <button className='note-btn close' type='button' onClick={props.onClose}>Close</button>
          <button className='note-btn save' type='submit'>Save</button>
        </div>
      </div>
    </form>
  )

  return (
    <>
      {props.isNoteEditing === true ? editingTemplate : formTemplate}
    </>
  )
}
