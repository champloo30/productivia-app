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
      const response = await fetch(`https://productivia-app.herokuapp.com/myTasks/${params.id.toString()}`)

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`
        window.alert(message)
        return
      }

      const task = await response.json()
      if (!task) {
        window.alert(`Record with id ${id} not found`)
        navigate('/myTasks')
        return
      }
      setEditForm(task)
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

    await fetch(`https://productivia-app.herokuapp.com/myTasks/edit/${params.id}`, {
      method: 'POST',
      body: JSON.stringify(editedTask),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    navigate('/myTasks')
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
            <Link className='btn cancel' to='/myTasks'>Close</Link>
            <button className='btn save'>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
