import React from 'react'
import './pomodoroTimer.scss'

export default function PomodoroTimer({ expiryTimestamp, mode, seconds, minutes, isRunning, pause, resume, restart, pomodoro, short, long }) {

  return (
    <div className={mode}>
      <div className="container">
        <div className="t-btn-group">
          <button id='pomodoro' className='t-btn' onClick={() => pomodoro()}>Pomodoro</button>
          <button id='short' className='t-btn' onClick={() => short()}>Short</button>
          <button id='long' className='t-btn' onClick={() => long()}>Long</button>
        </div>
        <div className="progress">
          <h1>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
        </div>
        <div className="b-btn-group">
          <button className="b-btn start" onClick={() => {
            if (mode === 'pomodoro') {
              expiryTimestamp.setSeconds(expiryTimestamp.getSeconds())
            } else if (mode === 'short') {
              expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() - 1200)
            } else if (mode === 'long') {
              expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() - 600)
            }
            restart(expiryTimestamp)
            pause()
            }
          } >
            Restart
          </button>
          <button className="b-btn pause" onClick={isRunning ? pause : resume} >
            {isRunning ? 'Pause' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  )
}
