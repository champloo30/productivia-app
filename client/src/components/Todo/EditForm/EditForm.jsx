import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import './editForm.scss'

export default function EditForm(props) {
  const [editForm, setEditForm] = useState({
    name: '',
    tasks: []
  })

  const params = useParams()
  const navigate = useNavigate()
  
  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString()
      const response = await fetch(`http://localhost:5000/api/task/${params.id.toString()}`)

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`
        window.alert(message)
        return
      }

      const task = await response.json()
      if (!task) {
        window.alert(`Record with id ${id} not found`)
        navigate('/tasks')
        return
      }
      setEditForm(task)
      console.log(task);
    }
    fetchData()
    return
  }, [params.id, navigate])

  function handleEditChange(value) {
    return setEditForm((prev) => {
      return { ...prev, ...value }
    })
  }

  async function handleEditSubmit(e) {
    e.preventDefault()

    const editedTask = {
      name: editForm.name,
    }
    console.log(editForm.name);

    await fetch(`http://localhost:5000/api/task/edit/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(editedTask),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    navigate('/tasks')
  }

  return ( 
    <div className="edit-form">
      <div className="edit-container">
        <form className='edit-todo' onSubmit={handleEditSubmit}>
          <h1>Edit Task</h1>
          <input 
            className='todo-input' 
            type="text" 
            name="todo" 
            id="new-todo" 
            value={editForm.name} 
            onChange={(e) => handleEditChange({ name: e.target.value })}
            placeholder='What are we changing today?' 
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
