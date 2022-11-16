import React, { useState } from 'react'
import './pomodoroTimer.scss'
import FilterButton from './FilterButton/FilterButton'

const FILTER_MAP = {
  Pomodoro: (timer) => timer.category === 'Pomodoro',
  Short: (timer) => timer.category === 'Short',
  Long: (timer) => timer.category === 'Long',
  Custom: (timer) => timer.category === 'Custom'
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

export default function PomodoroTimer() {
  const [timer, setTimer] = useState('')
  const [filter, setFilter] = useState('Pomodoro')
  const [mode, setMode] = useState({
    pomodoro: 25,
    short: 5,
    long: 15,
    custom: ''
  })
  const [startStop, setStartStop] = useState('start')

  // function mode() {}
  console.log(filter);
  if (filter === 'Pomodoro') {
    setMode(mode.pomodoro)
  }

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
      key={name} 
      name={name} 
      isPressed={name === filter}
      setFilter={setFilter}
      setMode={setMode}
    />
  ))

  return (
    <div className='pomodoro'>
      <div className="pomodoro-container">
        <div className="btn-group">
          {filterList}
        </div>
        <div className="progress">
          <h1>{mode}:00</h1>
        </div>
        <button className="bottom-btn start">{startStop}</button>
      </div>
    </div>
  )
}
