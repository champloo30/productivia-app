import React, { useState } from 'react'
import './home.scss'
import restartIcon from '../../assets/restart-svgrepo-com.svg'
import playIcon from '../../assets/play-svgrepo-com.svg'
import pauseIcon from '../../assets/pause-svgrepo-com.svg'

export default function Home(props) {
    const [tasks] = useState(() => {
        const savedTasks = localStorage.getItem('new-task')
        if (savedTasks) {
          return JSON.parse(savedTasks)
        } else {
          return props.tasks
        }
    })

    const [notes] = useState(() => {
      const savedItems = localStorage.getItem('new-item')
      if (savedItems) {
        return JSON.parse(savedItems)
      } else {
        return props.notes
      }
  })

  return (
    <div className='home'>
        <div className="home-container">
            <h1 className={`h1-${props.mode}`}>Productivia</h1>
            <div className="item-container">
              <div className="tasks-notes">
                <p><span className={`num-${props.mode}`}>{tasks.length}</span> Task Remaining</p>
                <div className={`h-line-${props.mode}`}></div>
                <p><span className={`num-${props.mode}`}>{notes.length}</span> Notes Remaining</p>
              </div>
              <div className={`v-line-${props.mode}`}></div>
              <div className="mini-timer">
                <div className={props.mode}>
                  <div className="t-btn-group">
                    <button id='pomdoro' className='t-btn' onClick={() => props.pomodoro()}>P</button>
                    <button id='short' className='t-btn' onClick={() => props.short()}>S</button>
                    <button id='long' className='t-btn' onClick={() => props.long()}>L</button>
                  </div>
                  <div className="progress">
                    <span className='time'>{props.minutes < 10 ? `0${props.minutes}` : props.minutes}:{props.seconds < 10 ? `0${props.seconds}` : props.seconds}</span>
                  </div>
                  <div className="b-btn-group">
                    <button className='b-btn' onClick={() => {
                      if (props.mode === 'pomodoro') {
                        props.expiryTimestamp.setSeconds(props.expiryTimestamp.getSeconds())
                      } else if (props.mode === 'short') {
                        props.expiryTimestamp.setSeconds(props.expiryTimestamp.getSeconds() - 1200)
                      } else if (props.mode === 'long') {
                        props.expiryTimestamp.setSeconds(props.expiryTimestamp.getSeconds() - 600)
                      }
                      props.restart(props.expiryTimestamp)
                      props.pause()
                      }
                    } >
                      <img src={restartIcon} alt="" />
                    </button>
                    <button className='b-btn' onClick={props.isRunning ? props.pause : props.resume}>
                      {props.isRunning ? <img className='b-btn' src={pauseIcon} alt="" /> : <img className='b-btn' src={playIcon} alt="" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}
