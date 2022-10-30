import React, { useState } from 'react'
import './formModal.scss'

export default function Form(props) {
  const [title, setTitle] = useState('')
  const [newTitle, setNewTitle] = useState(title)
  const [content, setContent] = useState('')
  const [newContent, setNewContent] = useState(content)
  const [category, setCategory] = useState(props.category)

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  function handleContentChange(e) {
    setContent(e.target.value)
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
    setNewTitle('')
    setNewContent('')
    props.onClose()
    props.setEditing(false)
  }

  if (!props.show) {
    return null
  }

  const editingTemplate = (
    <div className="form-container">
      <h1>Update {props.category}</h1>
      <div className="fieldset">
        <input 
          type="text" 
          name="title" 
          value={newTitle} 
          placeholder={newTitle} 
          onChange={handleTitleChange} 
        />
        <textarea 
          name="content" 
          value={newContent} 
          id="textarea" 
          placeholder={newContent} 
          required 
          onChange={handleContentChange}
        ></textarea>
      </div>
      <div className="bottom-btn-group">
        <button className='note-btn close' type='button' onClick={props.onClose}>Close</button>
        <button className='note-btn save' type='submit'>Save</button>
      </div>
    </div>
  )

  const formTemplate = (
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
  )

  return (
    <form className='form-modal' onSubmit={props.isEditing === true ? handleEditSubmit() : handleFormSubmit()}>
      {props.isEditing === true ? editingTemplate : formTemplate}
    </form>
  )
}
