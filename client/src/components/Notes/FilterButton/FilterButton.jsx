import React from 'react'
import './filterButton.scss'

export default function FilterButton(props) {
  return (
    <div className='filter-button'>
        <button 
            type='button' 
            className='btn' 
            aria-pressed={props.isPressed} 
            onClick={() => props.setFilter(props.name)}
        >
            My {props.name}
        </button>
    </div>
  )
}
