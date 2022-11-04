import React, { useState } from 'react'
import './noteItem.scss'
import NoteModal from './NoteModal/NoteModal'
import arrow from '../../../assets/right-arrow-svgrepo-com.svg'

export default function NoteItem(props) {
  const [showMenu, setShowMenu] = useState(false)
  const [isNoteEditing, setNoteEditing] = useState(false)

  function openEditForm() {
    setNoteEditing(!isNoteEditing)
    console.log(isNoteEditing);
  }

  function toggle() {
    setShowMenu(!showMenu)
    console.log(showMenu);

    if (showMenu === true) {
      close()
    } else {
      open()
    }
  }

  function open() {
    const noteItem = document.getElementById(props.id)
    noteItem.classList.remove('hidden-menu')
    noteItem.classList.add('active-menu')
  }

  function close() {
    const noteItem = document.getElementById(props.id)
    noteItem.classList.add('hidden-menu')
    noteItem.classList.remove('active-menu')
  }

  function truncate() {
    if (props.content.length > 25) {
      return props.content.substring(0, 25) + '...'
    }
    return props.content
  }

  return (
    <li className='hidden-menu' id={props.id}>
      <div className="modal">
        <NoteModal
          id={props.id}
          category={props.category}
          isNoteEditing={isNoteEditing}
          setNoteEditing={setNoteEditing}
          editNote={props.editNote}
        />
      </div>
      <div className="left">
        <h1>{props.title}</h1>
        <p className='content'>{truncate()}</p>
        <p className='date'>Date</p>
      </div>
      <div className="right">
        <div className="img">
          <img className='arrow' src={arrow} alt="" onClick={toggle} />
        </div>
        <div id='noteMenu' className="hidden active">
          <button type='button' className='note-btn edit' onClick={() => openEditForm()}>Edit</button>
          <button type='button'className='note-btn delete' onClick={() => props.deleteItem(props.id)}>Delete</button>
        </div>
      </div>
    </li>
  )
}
