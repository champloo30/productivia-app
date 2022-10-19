import React from 'react'
import { Link } from 'react-router-dom'
import './menu.scss'
import task from '../../assets/tasks-svgrepo-com.svg'
import notes from '../../assets/notes-svgrepo-com.svg'
import speech from '../../assets/speech-bubble-svgrepo-com.svg'

export default function Menu() {
  return (
    <div className='menu'>
      <h1>Menu</h1>
      <Link to='/' className="menuItem">
        <p>Todo List</p>
        <img className='menuIcon' src={task} alt="Todo" />
      </Link>
      <Link to='/notes' className="menuItem">
        <p>Notes</p>
        <img className='menuIcon' src={notes} alt="Todo" />
      </Link>
      <Link to='/wordoftheday' className="menuItem">
        <p>Word of the Day</p>
        <img className='menuIcon' src={speech} alt="Todo" />
      </Link>
    </div>
  )
}
