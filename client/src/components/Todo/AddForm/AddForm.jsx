import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../hooks/useAuthContext'
import './addForm.scss'

export default function Form(props) {
  const [form, setForm] = useState({
    name: '',
    completed: false
  })

  const {user} = useAuthContext()
  const navigate = useNavigate()

  function handleChange(value) {
    return setForm((prev) => {
      return { ...prev, ...value }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const newTask = { ...form }
    
    await fetch(`http://localhost:5000/api/task/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(newTask)
    })
    .catch(error => {
      window.alert(error)
      return
    })

    setForm({name: '', completed: false})
    navigate('/tasks')
  }

  return (
    <div className="form">
      <div className="form-container">
        <form className='create-todo' onSubmit={handleSubmit}>
          <h1>Add A Task</h1>
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
          <div className="btn-group">
            <Link className='btn cancel' to='/tasks'>Close</Link>
            <button className='btn save'>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
