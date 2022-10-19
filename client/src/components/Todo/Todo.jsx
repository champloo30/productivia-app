import React, { useState } from 'react'
import './todo.scss'
import TodoItem from './TodoItem/TodoItem'
import Form from './Form/Form'
import FilterButton from './FilterButton/FilterButton'
import { nanoid } from 'nanoid'

export default function Todo(props) {
  const [tasks, setTasks] = useState(props.tasks)

  const today = new Date()
  // const options = {weekday: 'long', month: 'long', day: 'numeric', year: 'numberic'}

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task
    })
    setTasks(updatedTasks)
  }

  const taskList = tasks.map((task) => (
    <TodoItem 
      id={task.id} 
      name={task.name} 
      completed={task.completed} 
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
    />
  ))

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false }
    setTasks([...tasks, newTask])
  }

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task'
  const headingText = `${taskList.length} ${tasksNoun} remaining`

  return (
    <div className='todo'>
      <div className="todo-container">
        <h1>To-Do List</h1>
        <h2>{today.toDateString()}</h2>
        <Form addTask={addTask} />
        <div className="filter-buttons">
          <FilterButton id='all' active='true' />
          <FilterButton id='active' active='false' />
          <FilterButton id='complete' active='false' />
        </div>
        <h2 id='list-heading'>{headingText}</h2>
        <ul className='todo-list' aria-labelledby='list-heading'>
          {taskList}
        </ul>
      </div>
    </div>
  )
}
