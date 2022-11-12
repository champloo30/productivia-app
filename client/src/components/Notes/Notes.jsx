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
      <h1>{props.note.title}</h1>
      <p className='content'>{truncate(props)}</p>
      <p className='date'>Date</p>
    </div>
    <div className="right">
      <div id='plus' className="plus">+</div>
      <div id='noteMenu' className="hidden active">
        <Link to={`edit/${props.note._id}`} className='note-btn edit'>Edit</Link>
        <button type='button'className='note-btn delete' onClick={() => props.deleteItem(props.id)}>Delete</button>
      </div>
    </div>
  </li>
)

// function toggle(props) {
//   const noteItem = document.getElementById(`${props.note._id}`)

//   noteItem.classList.remove('hidden-menu')
//   noteItem.classList.add('active-menu')
//   console.log(noteItem);
// }

function truncate(props) {
  if (props.note.content.length > 20) {
    return props.note.content.substring(0, 20) + '...'
  }
  return props.note.content
}

export default function Notes(props) {
  const [notes, setNotes] = useState([])
  const [filter, setFilter] = useState('Notes')

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

  // function editNote(id, newTitle, newContent) {
  //   const editedNoteList = notes.map((note) => {
  //     if (id === note.id) {
  //       return {...note, title: newTitle, content: newContent}
  //     }
  //     return note
  //   })
  //   console.log(id, newTitle, newContent);
  //   setNotes(editedNoteList)
  // }

  async function deleteNote(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: 'DELETE'
    })

    const remainingNotes = notes.filter((note) => note._id !== id)
    setNotes(remainingNotes)
  }

  function noteList() { 
    return notes
    .filter(FILTER_MAP[filter])
    .map((note) => (
      <Note 
        note={note} 
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
