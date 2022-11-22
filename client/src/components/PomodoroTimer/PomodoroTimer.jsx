import React from 'react'
import './pomodoroTimer.scss'
import { useTimer } from 'react-timer-hook'

export default function PomodoroTimer({ expiryTimestamp, mode, setSec, pomodoro, short, long }) {

  const { seconds, minutes, isRunning, pause, resume, restart } = useTimer({ expiryTimestamp, onExpire: () => alert(`${mode} timer has completed`), autoStart: false })

  console.log(mode);
  console.log(minutes);
  console.log(expiryTimestamp);

  return (
    <div className={mode}>
      <div className="container">
        <div className="t-btn-group">
          <button className='t-btn' onClick={() => pomodoro()}>Pomodoro</button>
          <button className='t-btn' onClick={() => short()}>Short</button>
          <button className='t-btn' onClick={() => long()}>Long</button>
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
