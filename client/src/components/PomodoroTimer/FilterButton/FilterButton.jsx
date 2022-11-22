import React from 'react'
import './filterButton.scss'

export default function FilterButtons(props) {
  return (
    <div className='filter-button'>
      <button 
        type='button' 
        className='btn' 
        aria-pressed={props.isPressed}
        onClick={() => props.setMode(props.name)}
      >
        {props.name}
      </button>
    </div>
  )
}
