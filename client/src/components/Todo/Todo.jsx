import React, { useState, useEffect } from 'react'
import './todo.scss'
import TodoItem from './TodoItem/TodoItem'
import Form from './Form/Form'
import FilterButton from './FilterButton/FilterButton'
import { nanoid } from 'nanoid'

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

export default function Todo(props) {
  
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('new-task')
    if (savedTasks) {
      return JSON.parse(savedTasks)
    } else {
      return props.tasks
    }
  })
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    localStorage.setItem('new-task', JSON.stringify(tasks))
  }, [tasks])

  const today = new Date()

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task
    })
    console.log(id, newName);
    setTasks(editedTaskList)
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id)
    setTasks(remainingTasks)
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task
    })
    setTasks(updatedTasks)
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <TodoItem 
      id={task.id} 
      name={task.name} 
      completed={task.completed} 
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ))

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
      key={name} 
      name={name} 
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false }
    setTasks([...tasks, newTask])
  }

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task'
  const headingTextWithTasks = `${taskList.length} ${tasksNoun} remaining`
  const headingTextWithoutTasks = "Let's add a task!"
  const headingText = taskList.length >= 1 ? headingTextWithTasks : headingTextWithoutTasks

  return (
    <div className='todo'>
      <div className="todo-container">
        <h1>My Tasks: <span>{today.toDateString()}</span></h1>
        <Form addTask={addTask} />
        <div className="filter-buttons">
          {filterList}
        </div>
        <h2 id='list-heading'>{headingText}</h2>
        <ul className='todo-list' aria-labelledby='list-heading'>
          {taskList}
        </ul>
      </div>
    </div>
  )
}
