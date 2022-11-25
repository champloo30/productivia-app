import React, { useState } from 'react'
import './pomodoroTimer.scss'
import { useTimer } from 'react-timer-hook'

export default function PomodoroTimer({ expiryTimestamp, mode, setMode }) {
  const [session, setSession] = useState(0) // session counter

  // useTimer API
  const { seconds, minutes, isRunning, pause, resume, restart } = useTimer({ expiryTimestamp, onExpire: () => {
    const time = new Date()
    if (mode === 'pomodoro' && session < 3) {
      setMode('short')
      time.setSeconds(time.getSeconds() + 300)
      restart(time)
      setSession(session + 1)
    } else if (mode === 'short') {
      setMode('pomodoro')
      time.setSeconds(time.getSeconds() + 1500)
      restart(time)
    } else if (mode === 'pomodoro' && session === 3) {
      setMode('long')
      time.setSeconds(time.getSeconds() + 900)
      restart(time)
    } else if (mode === 'long') {
      setMode('pomodoro')
      time.setSeconds(time.getSeconds() + 1500)
      restart(time)
      setSession(0)
    }
  }, autoStart: false })

  const time = new Date()

  function pomodoro() {
    setMode('pomodoro')
    time.setSeconds(time.getSeconds() + 1500)
    restart(time)
    pause()
  }

  function short() {
    setMode('short')
    time.setSeconds(time.getSeconds() + 300)
    restart(time)
    pause()
  }

  function long() {
    setMode('long')
    time.setSeconds(time.getSeconds() + 900)
    restart(time)
    pause()
  }

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
            const time = new Date()
            if (mode === 'pomodoro') {
              time.setSeconds(time.getSeconds() + 1500)
            } else if (mode === 'short') {
              time.setSeconds(time.getSeconds() + 300)
            } else if (mode === 'long') {
              time.setSeconds(time.getSeconds() + 900)
            }
            restart(time)
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
