import React, { useState } from 'react'
import './form.scss'

export default function Form(props) {
  const [name, setName] = useState('')

  function handleChange(e) {
    setName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.addTask(name)
    setName('')
  }

  return (
    <form className='create-todo' onSubmit={handleSubmit}>
        <input 
          className='todo-input' 
          type="text" 
          name="todo" 
          id="new-todo" 
          value={name} 
          onChange={handleChange}
          placeholder='What are we doing today?' 
          required 
        />
        <button className='submit'>+</button>
    </form>
  )
}
