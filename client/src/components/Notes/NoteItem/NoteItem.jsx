import React, { useState } from 'react'
import './noteItem.scss'
import NoteModal from './NoteModal/NoteModal'

export default function NoteItem(props) {
  const [showMenu, setShowMenu] = useState(false)

  function onOpen() {
    setShowMenu(!showMenu)
  }

  function deleteItem() {
    let x = localStorage.getItem('new-item')
    x = JSON.parse(x)
    const remainingItems = x.filter((note) => props.id !== note.id)
    props.setNotes(remainingItems)
  }

  return (
    <li className='note-item' id={props.id}>
      <NoteModal setEditing={props.setEditing} deleteItem={deleteItem} showMenu={showMenu} />
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
