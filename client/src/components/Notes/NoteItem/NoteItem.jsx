import React from 'react'
import './noteItem.scss'

export default function NoteItem(props) {
  return (
    <li className='note-item' id={props.id}>
        <h1>{props.title}</h1>
        <p className='content'>{props.content}</p>
        <p className='date'>Date</p>
    </li>
  )
}
