import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useAuthContext } from '../../../hooks/useAuthContext'
import './editNote.scss'

export default function EditNote(props) {
  const [editForm, setEditForm] = useState({
    category: props.category,
    title: '',
    content: '',
    notes: []
  })

  const {user} = useAuthContext()
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString()
      const response = await fetch(`https://productivia-app-aa1913e6aceb.herokuapp.com/api/note/${params.id.toString()}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`
        window.alert(message)
        return
      }

      const note = await response.json()
      if (!note) {
        window.alert(`Note with id ${id} not found`)
        navigate('/notes')
        return
      }
      setEditForm(note)
    }
    if (user) {
      fetchData()
    }
    return
  }, [params.id, navigate, user])

  function handleEditChange(value) {
    return setEditForm((prev) => {
      return { ...prev, ...value }
    })
  }

  async function handleEditSubmit(e) {
    e.preventDefault()

    const editedNote = {
      title: editForm.title,
      content: editForm.content
    }

    await fetch(`https://productivia-app-aa1913e6aceb.herokuapp.com/api/note/edit/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(editedNote),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    navigate(`/notes/${params.id}`)
  }

  return (
    <div className="edit">
      <div className="edit-container">
        <form className='edit-note' onSubmit={handleEditSubmit}>
          <h1>Edit {editForm.category}</h1>
          <div className="fieldset">
            <input 
              type="text" 
              name="note" 
              id="edit-note" 
              className='note-input' 
              value={editForm.title} 
              onChange={(e) => handleEditChange({ title: e.target.value })}
            />
            <textarea 
              name="content" 
              id="textarea" 
              value={editForm.content} 
              required 
              onChange={(e) => handleEditChange({ content: e.target.value })}
            ></textarea>
          </div>
          <div className="btn-group">
            <Link className='btn cancel' to={`/notes/${params.id}`}>Cancel</Link>
            <button className='btn save' type='submit'>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
