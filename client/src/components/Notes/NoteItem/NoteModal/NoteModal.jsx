import React from 'react'
import './noteModal.scss'

export default function NoteModal(props) {
  if (!props.showMenu) {
    return null
  }

  return (
    <div className='note-modal'>
      <div className="note-modal-container">
        <button type='button' className='note-btn edit'>Edit</button>
        <button type='button'className='note-btn delete' onClick={() => props.deleteItem(props.id)}>Delete</button>
      </div>
    </div>
  )
}
