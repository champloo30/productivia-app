import React, { useState } from 'react'
import './noteItem.scss'
import NoteModal from './NoteModal/NoteModal'
import arrow from '../../../assets/right-arrow-svgrepo-com.svg'

export default function NoteItem(props) {
  const [showMenu, setShowMenu] = useState(false)

  function toggle() {
    setShowMenu(!showMenu)
    console.log(showMenu);

    if (showMenu === true) {
      close()
    } else {
      open()
    }
  }

  let x = localStorage.getItem('new-item')
  x = JSON.parse(x)

  function deleteItem() {
    const remainingItems = x.filter((note) => props.id !== note.id)
    props.setNotes(remainingItems)
  }

  function open() {
    const noteItem = document.getElementById(props.id)
    const noteMenu = document.getElementById('noteMenu')
    console.log(props.id);

    noteItem.classList.remove('hidden-menu')
    noteItem.classList.add('active-menu')
    noteMenu.classList.remove('hidden')
    noteMenu.classList.add('active')
    console.log(noteItem.classList);
    console.log(noteMenu.classList);
  }

  function close() {
    const noteItem = document.getElementById(props.id)
    const noteMenu = document.getElementById('noteMenu')
    console.log(props.id);

    noteItem.classList.add('hidden-menu')
    noteItem.classList.remove('active-menu')
    noteMenu.classList.add('hidden')
    noteMenu.classList.remove('active')
    console.log(noteItem.classList);
    console.log(noteMenu.classList);
  }


  return (
    <li className='hidden-menu' id={props.id}>
      <NoteModal setShow={props.setShow} setNoteEditing={props.setNoteEditing} />
      
      <div className="left">
        <h1>{props.title}</h1>
        <p className='content'>{props.content}</p>
        <p className='date'>Date</p>
      </div>
      <div className="right">
        <div className="img">
          <img className='arrow' src={arrow} alt="" onClick={toggle} />
        </div>
        <div id='noteMenu' className="hidden">
          <button type='button' className='note-btn edit' >Edit</button>
          <button type='button'className='note-btn delete' onClick={() => deleteItem(props.id)}>Delete</button>
        </div>
      </div>
    </li>
  )
}
