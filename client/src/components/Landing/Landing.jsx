import React, { useState } from 'react'
import './landing.scss'
import arrow from '../../assets/left-arrow-direction-svgrepo-com.svg'
import tasksVideo from '../../assets/tasks.mp4'
import notesVideo from '../../assets/notes.mp4'

export default function Landing() {
  const [activeIndex, setActiveIndex] = useState(0)

  const data = [
    {
      video: tasksVideo,
      name: 'Tasks',
      list: {
        one: '• CREATE, UPDATE and DELETE tasks',
        two: '• Categorize tasks by their active or completed status'
      }
    },
    {
      video: notesVideo,
      name: 'Notes',
      list: {
        one: '• CREATE, READ, UPDATE and DELETE notes',
        two: '• Make your note into a journal entry'
      }
    }
  ]

  const activeCard = data[activeIndex]

  function handleNext() {
    if (activeIndex >= data.length - 1) {
      setActiveIndex(0)
    } else {
      setActiveIndex((oldIndex) => oldIndex + 1)
    }
  }

  function handlePrev() {
    if (activeIndex <= 0) {
      setActiveIndex(data.length - 1)
    } else {
      setActiveIndex((oldIndex) => oldIndex - 1)
    }
  }

  return (
    <div className='landing'>
        <div className="left">
          <div className="left-container">
            <h2>Welcome to</h2>
            <h1>Productivia</h1>
            <div className="links">
              <a href="/signup" className='btn signup-link'>Signup</a>
              <a href="/login" className='btn login-link'>Login</a>
            </div>
            <p>The only application that will meet your productivity needs. Sign up for four amazing features that will boost your productivity <span>110%</span>!</p>
          </div>
        </div>
        <div className="right">
          <div className="box active">
            <div className="box-container">
              <video className='video' loop autoPlay={true} muted>
                <source src={activeCard.video} type='video/mp4' />
              </video>
              <div className="text">
                <h3>{activeCard.name}</h3>
                <p>{activeCard.list.one}</p>
                <p>{activeCard.list.two}</p>
              </div>
              <div className="arrows">
                <img src={arrow} alt="" onClick={handlePrev} />
                <img className='right' src={arrow} alt="" onClick={handleNext} />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
