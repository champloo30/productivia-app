import React, { useEffect, useState } from 'react'
import FilterButton from './FilterButton/FilterButton'
import FormModal from './FormModal/FormModal'
import NoteItem from './NoteItem/NoteItem'
import './notes.scss'
import { nanoid } from 'nanoid'

const FILTER_MAP = {
  Notes: (note) => note.category === 'Notes',
  Journal: (note) => note.category === 'Journal'
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

export default function Notes(props) {
  const [notes, setNotes] = useState(() => {
    const savedItems = localStorage.getItem('new-item')
    if (savedItems) {
      return JSON.parse(savedItems)
    } else {
      return props.notes
    }
  })
  const [filter, setFilter] = useState('Notes')
  const [show, setShow] = useState(false)

  useEffect(() => {
    localStorage.setItem('new-item', JSON.stringify(notes))
  }, [notes])

  function deleteItem(id) {
    const remainingItems = notes.filter((note) => id !== note.id)
    setNotes(remainingItems)
    console.log(props.id);
  }

  const noteList = notes
  .filter(FILTER_MAP[filter])
  .map((note) => (
    <NoteItem 
      id={note.id} 
      category={note.category} 
      title={note.title} 
      content={note.content} 
      key={note.id}
      deleteItem={deleteItem}
    />
  ))

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
      key={name} 
      name={name} 
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  function addNotes(title, content) {
    const newNote = {id: `note-${nanoid()}`, category: 'Notes', title, content }
    setNotes([...notes, newNote])
  }

  function addJournal(title, content) {
    const newEntry = {id: `journal-${nanoid()}`, category: 'Journal', title, content }
    setNotes([...notes, newEntry])
  }

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

  function onOpen() {
    setShow(true)
  }

  function onClose() {
    setShow(false)
  }

  return (
    <div className='notes'>
      <div className="notes-container">
        <h1>My Notes</h1>
        <div className="btn-group">
          {filterList}
        </div>
        <div className="bottom-section">
          <FormModal 
            onClose={onClose} 
            show={show} 
            addNotes={addNotes} 
            addJournal={addJournal}
          />
          <button type='button' className='add-form' onClick={onOpen}>
            <span>+</span>
          </button>
          <ul className='note-list' aria-labelledby='list-heading'>
            {noteList}
          </ul>
        </div>
      </div>
    </div>
  )
}
