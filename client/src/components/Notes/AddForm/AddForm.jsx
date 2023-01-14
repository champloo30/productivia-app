import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../hooks/useAuthContext'
import './addForm.scss'

export default function Form(props) {
  const [form, setForm] = useState({
    title: '',
    content: ''
  })
  const [category, setCategory] = useState('')

  const {user} = useAuthContext()
  const navigate = useNavigate()

  function handleChange(value) {
    return setForm((prev) => {
      return { ...prev, ...value }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const newNote = { ...form, category }

    await fetch(`https://productivia-app.herokuapp.com/note/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(newNote)
    })
    .catch(error => {
      window.alert(error)
      return
    })

    category === 'Notes' ? setCategory('Note') : setCategory('Journal')
    setForm({title: '', content: ''})
    console.log(category, form.title, form.content);
    navigate('/notes')
  }

  return (
    <div className="add-form">
      <div className="add-form-container">
        <form className='form' onSubmit={handleSubmit}>
          <div className="form-container">
            <h1>New Note</h1>
            <div className="radios">
              <div className="radioset">
                <input type="radio" name="note-journal" id="note" value={category} onClick={() => setCategory('Notes')} />
                <label className='radio-label' htmlFor="note">Note</label>
              </div>
              <div className="radioset">
                <input type="radio" name="note-journal" id="journal" value={category} onClick={() => setCategory('Journal')} />
                <label className='radio-label' htmlFor="journal">Journal</label>
              </div>
            </div>
            <div className="fieldset">
              <input 
                id="new-note"
                type="text" 
                name="title" 
                value={form.title} 
                placeholder='Title' 
                onChange={(e) => handleChange({title: e.target.value})} 
              />
              <textarea 
                name="content" 
                value={form.content} 
                id="textarea" 
                placeholder='Type your content here' 
                required 
                onChange={(e) => handleChange({content: e.target.value})}
              ></textarea>
            </div>
            <div className="bottom-btn-group">
              <Link className='note-btn close' to='/notes'>Close</Link>
              <button className='note-btn save' type='submit'>Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    
  )
}
