import React from 'react'
import './todoItem.scss'

export default function TodoItem(props) {
  return (
    <li className="todo-item">
        <div className='cb'>
            <input 
              type="checkbox" 
              id={props.id} 
              defaultChecked={props.completed} 
              onChange={() => props.toggleTaskCompleted(props.id)}
            />
            <label className='todo-label' htmlFor={props.id}>{props.name}</label>
        </div>
        <div className="btn-group">
            <button className="todo-btn edit" type='button'>
              Edit
            </button>
            <button 
              className="todo-btn delete" 
              type='button' 
              onClick={() => props.deleteTask(props.id)}
            >
              Delete
            </button>
        </div>
    </li>
  )
}
