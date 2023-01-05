import React from 'react'
import { Link } from 'react-router-dom'
import './menu.scss'
import task from '../../assets/tasks-svgrepo-com.svg'
import notes from '../../assets/notes-svgrepo-com.svg'
import speech from '../../assets/speech-bubble-svgrepo-com.svg'
import timer from '../../assets/timer-svgrepo-com.svg'
import home from '../../assets/home-svgrepo-com.svg'

export default function Menu({ mode }) {
  return (
    <div className={`${mode}-menu`}>
      <div className="menu-top">
        <h1>Menu</h1>
        <Link to='/' className="menuItem">
          <p>Home</p>
          <img className='menuIcon' src={home} alt="home" />
        </Link>
        <Link to='tasks' className="menuItem">
          <p>Tasks</p>
          <img className='menuIcon' src={task} alt="tasks" />
        </Link>
        <Link to='notes' className="menuItem">
          <p>Notes</p>
          <img className='menuIcon' src={notes} alt="notes" />
        </Link>
        <Link to='pomodoroTimer' className="menuItem">
          <p>Pomodoro Timer</p>
          <img className='menuIcon' src={timer} alt="pomodoro timer" />
        </Link>
        <Link to='wordOfTheDay' className="menuItem">
          <p>Word of the Day</p>
          <img className='menuIcon' src={speech} alt="word of the day" />
        </Link>
      </div>
      {/* <div className="menu-bottom">
        <p className='menu-signup'>New to Productivia?</p>
        <div className="btn-group">
          <Link to='signup' className='btn s-btn'>
            Signup
          </Link>
          <Link to='login' className='btn l-btn'>
            Login
          </Link>
        </div>
        <p className='menu-login'>Productivia member?</p>
      </div> */}
    </div>
  )
}
