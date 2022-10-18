import React from 'react'
import './todo.scss'

export default function Todo() {
  const today = new Date()
  // const options = {weekday: 'long', month: 'long', day: 'numeric', year: 'numberic'}

  return (
    <div className='todo'>
      <div className="todo-container">
        <h1>To-Do List</h1>
        <h2>{today.toDateString()}</h2>
        <form className='create-todo' action="">
          <input className='todo-input' type="text" name="todo" id="new-todo" placeholder='What are we doing today?' required />
          <button className='submit'>+</button>
        </form>
        <div className="filters">
          <button className='btn' aria-pressed='true'>
            <span>Show all tasks</span>
          </button>
          <button className="btn" aria-pressed='false'>
            <span>Show active tasks</span>
          </button>
          <button className="btn" aria-pressed='false'>
            <span>Show completed tasks</span>
          </button>
        </div>
        <h2 id='list-heading'>4 Tasks Remaining</h2>
        <ul className='todo-list' aria-labelledby='list-heading'>
          <li className="todo-item">
            <div className='cb'>
              <input type="checkbox" id="todo-0" />
              <label className='todo-label' htmlFor="todo-0">Eat</label>
            </div>
            <div className="btn-group">
              <button className="todo-btn edit" type='button'>Edit</button>
              <button className="todo-btn delete" type='button'>Delete</button>
            </div>
          </li>
          <li className="todo-item">
            <div className='cb'>
              <input type="checkbox" id="todo-1" />
              <label className='todo-label' htmlFor="todo-1">Code</label>
            </div>
            <div className="btn-group">
              <button className="todo-btn edit" type='button'>Edit</button>
              <button className="todo-btn delete" type='button'>Delete</button>
            </div>
          </li>
          <li className="todo-item">
            <div className='cb'>
              <input type="checkbox" id="todo-2" />
              <label className='todo-label' htmlFor="todo-2">Sleep</label>
            </div>
            <div className="btn-group">
              <button className="todo-btn edit" type='button'>Edit</button>
              <button className="todo-btn delete" type='button'>Delete</button>
            </div>
          </li>
          <li className="todo-item">
            <div className='cb'>
              <input type="checkbox" id="todo-3" />
              <label className='todo-label' htmlFor="todo-3">Repeat</label>
            </div>
            <div className="btn-group">
              <button className="todo-btn edit" type='button'>Edit</button>
              <button className="todo-btn delete" type='button'>Delete</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
