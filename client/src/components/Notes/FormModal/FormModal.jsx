import React, { useState } from 'react'
import './formModal.scss'

export default function Form(props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState(props.category)

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  function handleContentChange(e) {
    setContent(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    category === 'Notes' ? props.addNotes(title, content) : props.addJournal(title, content)
    setTitle('')
    setContent('')
    props.onClose()
  }

  if (!props.show) {
    return null
  }

  return (
    <form className='form-modal' onSubmit={handleSubmit}>
      <div className="form-container">
        <h1>New Note</h1>
        <div className="radios">
          <div className="radioset">
            <input type="radio" name="note-journal" id="note" value={category} onClick={() => setCategory('Notes')} />
            <label htmlFor="note">Note</label>
          </div>
          <div className="radioset">
            <input type="radio" name="note-journal" id="journal" value={category} onClick={() => setCategory('Journal')} />
            <label htmlFor="journal">Journal</label>
          </div>
        </div>
        <div className="fieldset">
          <input 
            type="text" 
            name="title" 
            value={title} 
            id="new-note" 
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
}
