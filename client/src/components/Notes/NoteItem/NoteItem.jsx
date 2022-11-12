import React, { useState } from 'react'
import './noteItem.scss'
import arrow from '../../../assets/right-arrow-svgrepo-com.svg'
import { Link } from 'react-router-dom'

export default function Note(props) {
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

  function open() {
    const noteItem = document.getElementById(props._id)
    noteItem.classList.remove('hidden-menu')
    noteItem.classList.add('active-menu')
  }

  function close() {
    const noteItem = document.getElementById(props._id)
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
    <li className='hidden-menu' id={props.note._id}>
    <div className="left">
      <h1>{props.note.title}</h1>
      <p className='content'>{truncate()}</p>
      <p className='date'>Date</p>
    </div>
    <div className="right">
      <div className="img">
        <img className='arrow' src={arrow} alt="" onClick={toggle} />
      </div>
      <div id='noteMenu' className="hidden active">
        <Link to={`edit/${props.task._id}`} className='note-btn edit'>Edit</Link>
        <button type='button'className='note-btn delete' onClick={() => props.deleteItem(props.id)}>Delete</button>
      </div>
    </div>
  </li>
  )
}
