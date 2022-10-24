import React, { useState } from 'react'
import FilterButton from './FilterButton/FilterButton'
import FormModal from './FormModal/FormModal'
import NoteItem from './NoteItem/NoteItem'
import './notes.scss'

const FILTER_MAP = {
  Notes: (note) => note.category === 'Notes',
  Journal: (note) => note.category === 'Journal'
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

export default function Notes(props) {
  const [notes, setNotes] = useState(props.notes)
  const [filter, setFilter] = useState('Notes')
  const [show, setShow] = useState(false)

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
      key={name} 
      name={name} 
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  const noteList = notes
  .filter(FILTER_MAP[filter])
  .map((note) => (
    <NoteItem 
      id={note.id} 
      category={note.category} 
      title={note.title} 
      content={note.content} 
      key={note.id}
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
          <FormModal onClose={onClose} show={show} />
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
