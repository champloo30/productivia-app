import React from 'react'
import './filterButton.scss'

export default function Filter(props) {
  return (
    <button className='btn' aria-pressed={props.active}>
        <span>Show {props.id} tasks</span>
      </button>
  )
}
