import React, { useState } from 'react'
import './noteModal.scss'

export default function NoteModal(props) {
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')

  if (!props.isNoteEditing) {
    return null
  }

  function onEditClose() {
    props.setNoteEditing(false)
  }

  function handleNewTitleChange(e) {
    setNewTitle(e.target.value)
    console.log(newTitle);
    console.log(props.id);
  }

  function handleNewContentChange(e) {
    setNewContent(e.target.value)
    console.log(newContent);
  }

  function handleEditSubmit(e) {
    e.preventDefault()
    props.editNote(props.id, newTitle, newContent)
    setNewTitle(newTitle)
    setNewContent(newContent)
    onEditClose()
    console.log(props.id);
    console.log(newTitle);
    console.log(newContent);
  }

  return (
    <form className='note-modal' onSubmit={handleEditSubmit}>
      <div className="note-container">
        <h1>Update {props.category === 'Notes' ? 'Note' : 'Journal'}</h1>
        <div className="fieldset">
          <input 
            id={props.id}
            type="text" 
            name="title" 
            value={newTitle} 
            placeholder='new title' 
            onChange={handleNewTitleChange} 
          />
          <textarea 
            name="content" 
            value={newContent} 
            id="textarea" 
            placeholder='new content' 
            required 
            onChange={handleNewContentChange}
          ></textarea>
        </div>
        <div className="bottom-btn-group">
          <button className='note-btn close' type='button' onClick={() => onEditClose()}>Close</button>
          <button className='note-btn save' type='submit'>Save</button>
        </div>
      </div>
    </form>
  )
}
