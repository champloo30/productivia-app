import React, { useState } from 'react'
import './formModal.scss'

export default function Form(props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  function handleContentChange(e) {
    setContent(e.target.value)
  }

  function handleSubmit(e) {}

  if (!props.show) {
    return null
  }

  return (
    <form className='form-modal' onClick={e => e.stopPropagation()}>
      <div className="form-container">
        <h1>New Note</h1>
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
