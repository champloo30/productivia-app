import React from 'react'
import { Link } from 'react-router-dom'
import './menu.scss'
import task from '../../assets/tasks-svgrepo-com.svg'
import notes from '../../assets/notes-svgrepo-com.svg'
import speech from '../../assets/speech-bubble-svgrepo-com.svg'
import timer from '../../assets/timer-svgrepo-com.svg'
import home from '../../assets/home-svgrepo-com.svg'

export default function Menu() {
  return (
    <div className='menu'>
      <h1>Menu</h1>
      <Link to='/' className="menuItem">
        <p>Home</p>
        <img className='menuIcon' src={home} alt="home" />
      </Link>
      <Link to='/myTasks' className="menuItem">
        <p>My Tasks</p>
        <img className='menuIcon' src={task} alt="my tasks" />
      </Link>
      <Link to='/myNotes' className="menuItem">
        <p>My Notes</p>
        <img className='menuIcon' src={notes} alt="my notes" />
      </Link>
      <Link to='/pomodoroTimer' className="menuItem">
        <p>Pomodoro Timer</p>
        <img className='menuIcon' src={timer} alt="pomodoro timer" />
      </Link>
      <Link to='/wordOfTheDay' className="menuItem">
        <p>Word of the Day</p>
        <img className='menuIcon' src={speech} alt="word of the day" />
      </Link>
    </div>
  )
}
