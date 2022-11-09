import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './form.scss'

export default function Form(props) {
  const [form, setForm] = useState({
    name: '',
    completed: false
  })

  const navigate = useNavigate()

  function handleChange(value) {
    return setForm((prev) => {
      return { ...prev, ...value }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const newTask = { ...form }
    
    await fetch(`http://localhost:5000/myTasks/addTask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
    .catch(error => {
      window.alert(error)
      return
    })

    setForm({name: '', completed: false})
    navigate('/myTasks')
  }

  return (
    <div className="form">
      <div className="form-container">
        <form className='create-todo' onSubmit={handleSubmit}>
          <input 
            className='todo-input' 
            type="text" 
            name="todo" 
            id="new-todo" 
            value={form.name} 
            onChange={(e) => handleChange({ name: e.target.value })}
            placeholder='What are we doing today?' 
            required 
          />
          <button className='submit'>+</button>
        </form>
      </div>
    </div>
  )
}
