import React from 'react'
import './filterButtonTasks.scss'

export default function FilterButton(props) {
  return (
    <button 
      type='button' 
      className='btn-tasks' 
      aria-pressed={props.isPressed} 
      onClick={() => props.setFilter(props.name)}
    >
      <span>Show {props.name} Tasks</span>
    </button>
  )
}
