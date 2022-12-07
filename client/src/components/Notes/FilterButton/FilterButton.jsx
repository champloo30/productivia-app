import React from 'react'
import './filterButtonNotes.scss'

export default function FilterButton(props) {
  return (
    <button 
      type='button' 
      className='btn-notes' 
      aria-pressed={props.isPressed} 
      onClick={() => props.setFilter(props.name)}
    >
      <span>My {props.name}</span>
    </button>
  )
}
