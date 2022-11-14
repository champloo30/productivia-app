import React, { useEffect, useState } from 'react'
import FilterButton from './FilterButton/FilterButton'
import './notes.scss'
import { Link } from 'react-router-dom'

const FILTER_MAP = {
  Notes: (note) => note.category === 'Notes',
  Journal: (note) => note.category === 'Journal'
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

const Note = (props) => (
  <li className='hidden-menu' id={props.note._id}>
    <div className="left">
      <h1>{truncateTitle(props)}</h1>
      <p className='content'>{truncateContent(props)}</p>
      <p className='date'>Date</p>
    </div>
    <div className="right">
      <div id='plus' className="plus" onClick={() => props.toggle(props._id)}>+</div>
      <div id='noteMenu' className="hidden active">
        <Link to={`${props.note._id}`} className='note-btn view'>View</Link>
        <button type='button'className='note-btn delete' onClick={() => props.deleteNote(props.id)}>Delete</button>
      </div>
    </div>
  </li>
)

function truncateTitle(props) {
  if (props.note.title.length > 8) {
    return props.note.title.substring(0, 8) + '...'
  }
  return props.note.title
}

function truncateContent(props) {
  if (props.note.content.length > 20) {
    return props.note.content.substring(0, 20) + '...'
  }
  return props.note.content
}

export default function Notes(props) {
  const [notes, setNotes] = useState([])
  const [filter, setFilter] = useState('Notes')
  const [show, setShow] = useState(false)

  useEffect(() => {
    async function getNotes() {
      const response = await fetch(`http://localhost:5000/myNotes`)

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`
        window.alert(message)
        return
      }

      const notes = await response.json()
      setNotes(notes)
    }
    getNotes()
    return
  }, [notes.length])

  function toggle(id) {
    setShow(!show)

    const currentNote = notes.find((note) => note._id === id)

    if (show === true) {
      close()
    } else {
      open()
    }

    function open() {
      const noteItem = document.getElementById(currentNote._id)
      noteItem.classList.remove('hidden-menu')
      noteItem.classList.add('active-menu')
    }

    function close() {
      const noteItem = document.getElementById(currentNote._id)
      noteItem.classList.add('hidden-menu')
      noteItem.classList.remove('active-menu')
    }
  }

  async function deleteNote(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: 'DELETE'
    })

    const remainingNotes = notes.filter((note) => note._id !== id)
    setNotes(remainingNotes)
    console.log(remainingNotes);
  }

  function noteList() { 
    return notes
    .filter(FILTER_MAP[filter])
    .map((note) => (
      <Note 
        note={note} 
        toggle={() => toggle(note._id)}
        deleteNote={() => deleteNote(note._id)}
        key={note._id}
      />
    ))
  }

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
      key={name} 
      name={name} 
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  // function headingTextNotes() {
  //   if (notes.category === 'Notes') {
  //     return "Let's add a new note!"
  //   } else if (notes.category === 'Journal') {
  //     return "Let's add a new journal entry!"
  //   } else {
  //     return null
  //   }
  // }

  // const heading = 

  return (
    <div className='notes'>
      <div className="notes-container">
        <h1>My Notes</h1>
        <div className="btn-group">
          {filterList}
        </div>
        <div className="bottom-section">
          <Link to='addNote' className='add-form'>
            <span>+</span>
          </Link>
          <ul className='note-list' aria-labelledby='list-heading'>
            {noteList()}
          </ul>
        </div>
      </div>
    </div>
  )
}
