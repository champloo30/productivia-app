import React, { useState, useEffect } from 'react'
import './viewNote.scss'
import { useParams, useNavigate, Link } from 'react-router-dom'

export default function ViewNote(props) {
  const [note, setNote] = useState({
    category: props.category,
    title: props.title,
    content: props.content
  })

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString()
      const response = await fetch(`http://localhost:5000/myNotes/${params.id.toString()}`)

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`
        window.alert(message)
        return
      }

      const note = await response.json()
      if (!note) {
        window.alert(`Note with id ${id} not found`)
        navigate('/myNotes')
        return
      }
      setNote(note)
    }
    fetchData()
    return
  }, [params.id, navigate])

  return (
    <div className="view">
      <div className="view-container">
        <h1>{note.title}</h1>
        <h2>{note.category + ' - Date'}</h2>
        <p>{note.content}</p>
        <div className="btn-group">
          <Link className='btn back' to='/myNotes'>Back</Link>
          <Link className='btn edit' to={`/myNotes/edit/${params.id}`}>Edit</Link>
        </div>
      </div>
    </div>
  )
}