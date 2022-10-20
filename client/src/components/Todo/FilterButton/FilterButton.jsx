import React from 'react'
import './filterButton.scss'

export default function Filter(props) {
  return (
    <button 
      className='btn' 
      aria-pressed={props.isPressed} 
      onClick={() => props.setFilter(props.name)}
    >
      <span>Show {props.name} tasks</span>
    </button>
  )
}
