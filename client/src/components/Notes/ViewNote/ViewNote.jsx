import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'
import './viewNote.scss'
import { useParams, useNavigate, Link } from 'react-router-dom'

export default function ViewNote(props) {
  const [note, setNote] = useState({
    category: props.category,
    title: props.title,
    content: props.content
  })

  const {user} = useAuthContext()
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString()
      const response = await fetch(`http://localhost:5000/api/note/${params.id.toString()}`, {
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
      setNote(note)
    }
    if (user) {
      fetchData()
    }
    return
  }, [params.id, navigate, user])

  return (
    <div className="view">
      <div className="view-container">
        <h1>{note.title}</h1>
        <h2>{note.category + ' - Date'}</h2>
        <p>{note.content}</p>
        <div className="btn-group">
          <Link className='btn back' to='/notes'>Back</Link>
          <Link className='btn edit' to={`/notes/edit/${params.id}`}>Edit</Link>
        </div>
      </div>
    </div>
  )
}
