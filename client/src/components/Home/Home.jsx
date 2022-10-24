import React, { useState } from 'react'
import './home.scss'

export default function Home(props) {
    const [tasks] = useState(() => {
        const savedTasks = localStorage.getItem('new-task')
        if (savedTasks) {
          return JSON.parse(savedTasks)
        } else {
          return props.tasks
        }
    })
    // {tasks.length} Tasks Remaining
  return (
    <div className='home'>
        <div className="home-container">
            <h1>Productivia</h1>
            <p>{tasks.length}</p>
        </div>
    </div>
  )
}
