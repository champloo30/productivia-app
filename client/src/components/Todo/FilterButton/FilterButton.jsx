import React from 'react'
import './filterButton.scss'

export default function FilterButton(props) {
  return (
    <button 
      type='button' 
      className='btn' 
      aria-pressed={props.isPressed} 
      onClick={() => props.setFilter(props.name)}
    >
      <span>Show {props.name} Tasks</span>
    </button>
  )
}
