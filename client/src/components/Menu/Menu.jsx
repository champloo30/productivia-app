import React from 'react'
import './menu.scss'
import task from '../../assets/tasks-svgrepo-com.svg'
import notes from '../../assets/notes-svgrepo-com.svg'
import speech from '../../assets/speech-bubble-svgrepo-com.svg'
import timer from '../../assets/timer-svgrepo-com.svg'
import home from '../../assets/home-svgrepo-com.svg'

export default function Menu({ mode }) {
  return (
    <div className={`${mode}-menu`}>
      <h1>Menu</h1>
      <a href='/' className="menuItem">
        <p>Home</p>
        <img className='menuIcon' src={home} alt="home" />
      </a>
      <a href='/myTasks' className="menuItem">
        <p>My Tasks</p>
        <img className='menuIcon' src={task} alt="my tasks" />
      </a>
      <a href='/myNotes' className="menuItem">
        <p>My Notes</p>
        <img className='menuIcon' src={notes} alt="my notes" />
      </a>
      <a href='/pomodoroTimer' className="menuItem">
        <p>Pomodoro Timer</p>
        <img className='menuIcon' src={timer} alt="pomodoro timer" />
      </a>
      <a href='/wordOfTheDay' className="menuItem">
        <p>Word of the Day</p>
        <img className='menuIcon' src={speech} alt="word of the day" />
      </a>
    </div>
  )
}
