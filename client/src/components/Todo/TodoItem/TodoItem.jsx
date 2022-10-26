import React, { useState } from 'react'
import './todoItem.scss'

export default function TodoItem(props) {
  const [isEditing, setEditing] = useState(false)
  const [newName, setNewName] = useState('')

  function handleChange(e) {
    setNewName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.editTask(props.id, newName)
    setNewName('')
    setEditing(false)
  }

  const editingTemplate = (
    <form className='editing' onSubmit={handleSubmit}>
      <div className="input-group">
        <label className='todo-label' htmlFor={props.id}>New name for {props.name}:</label>
        <input 
          type="text" 
          id={props.id}
          className='todo-text'
          value={newName}
          onChange={handleChange}
        />
      </div>
      <div className="btn-group">
        <button 
          className="todo-btn cancel" 
          type='button' 
          onClick={() => setEditing(false)}
        >
          Cancel
        </button>
        <button 
          className="todo-btn save" 
          type='submit' 
        >
          Save
        </button>
      </div>
    </form>
  )

  function truncate() {
    if (props.name.length > 15) {
      return props.name.substring(0, 15) + '...'
    }
    return props.name
  }

  

  const viewingTemplate = (
    <div className='viewing'>
      <div className='cb'>
        <input 
          type="checkbox" 
          id={props.id} 
          defaultChecked={props.completed} 
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label data-title={props.name} id='todo-label' className='todo-label' htmlFor={props.id}>
          {truncate()}
        </label>
      </div>
      <div className="btn-group">
        {props.completed === true ? null : <button 
          className="todo-btn edit" 
          type='button' 
          onClick={() => setEditing(true)}
        >
          Edit
        </button>}
        <button 
          className="todo-btn delete" 
          type='button' 
          onClick={() => props.deleteTask(props.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )

  return (
    <li className="todo-item">
      {isEditing ? editingTemplate : viewingTemplate}
    </li>
  )
}
