import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './todo.scss'
import FilterButton from './FilterButton/FilterButton'

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

const Task = (props) => (
  <li className="todo-item">
    <div className='viewing'>
      <div className='cb'>
        <input 
          type="checkbox" 
          id={props.task._id} 
          defaultChecked={props.task.completed} 
          onChange={() => props.toggleTaskCompleted(props._id)}
        />
        <label data-title={props.task.name} id='todo-label' className='todo-label' htmlFor={props.task._id}>
          {truncate(props)}
        </label>
      </div>
      <div className="btn-group">
        {props.task.completed === true ? null : <Link 
          className="todo-btn link" 
          to={`edit/${props.task._id}`} 
        >
          Edit
        </Link>}
        <button 
          className="todo-btn delete" 
          type='button' 
          onClick={() => props.deleteTask(props.id)}
        >
          Delete
        </button>
      </div>
    </div>
  </li>
)

function truncate(props) {
  if (props.task.name.length > 10) {
    return props.task.name.substring(0, 10) + '...'
  }
  return props.task.name
}

export default function Todo(props) {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')

  // get task from db
  useEffect(() => {
    async function getTasks() {
      const response = await fetch(`https://productivia-app.herokuapp.com/myTasks`)

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`
        window.alert(message)
        return
      }

      const tasks = await response.json()
      setTasks(tasks)
    }
    getTasks()
    return
  }, [tasks.length])

  const today = new Date()

  // delete task
  async function deleteTask(id) {
    await fetch(`https://productivia-app.herokuapp.com/myTasks/${id}`, {
      method: 'DELETE'
    })

    const remainingTasks = tasks.filter((task) => task._id !== id)
    setTasks(remainingTasks)
  }

  // toggle completion of task
  async function toggleTaskCompleted(id) {
    const currentTask = tasks.find((e) => e._id === id)
    await fetch(`https://productivia-app.herokuapp.com/myTasks/edit/${id}`, {
      method: 'POST',
      body: JSON.stringify({name: currentTask.name, completed: !currentTask.completed}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const updatedTasks = tasks.map((task) => {
      if (id === task._id) {
        return {...task, completed: !task.completed}
      }
      return task
    })
    setTasks(updatedTasks)
  }

  function taskList() {
    return tasks
    .filter(FILTER_MAP[filter])
    .map((task) => {
      return (
        <Task 
          task={task}
          deleteTask={() => deleteTask(task._id)}
          toggleTaskCompleted={() => toggleTaskCompleted(task._id)}
          key={task._id}
        />
      )
    })
  }

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
      key={name} 
      name={name} 
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  // header statement for how many are reamining
  const tasksNoun = taskList().length !== 1 ? 'tasks' : 'task'
  const headingTextWithTasks = `${taskList().length} ${tasksNoun} remaining`
  const headingTextWithoutTasks = "Let's add a task!"
  const headingText = taskList().length >= 1 ? headingTextWithTasks : headingTextWithoutTasks

  return (
    <div className='todo'>
      <div className="todo-container">
        <h1>My Tasks: <span>{today.toDateString()}</span></h1>
        <Link to='addTask' className='add-btn'>
          <span>+</span>
        </Link>
        <div className="filter-buttons">
          {filterList}
        </div>
        <h2 id='list-heading'>{headingText}</h2>
        <ul className='todo-list' aria-labelledby='list-heading'>
          {taskList()}
        </ul>
      </div>
    </div>
  )
}
