import React, { useState } from 'react'
import './noteItem.scss'
import NoteModal from './NoteModal/NoteModal'

export default function NoteItem(props, {deleteItem}) {
  const [showMenu, setShowMenu] = useState(false)
  // const [notes, setNotes] = useState(props.notes)

  function onOpen() {
    setShowMenu(!showMenu)
  }

  return (
    <li className='note-item' id={props.id}>
      <NoteModal deleteItem={deleteItem} showMenu={showMenu} />
      <button type='button' className="dots" onClick={onOpen}>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </button>
      <h1>{props.title}</h1>
      <p className='content'>{props.content}</p>
      <p className='date'>Date</p>
    </li>
  )
}
