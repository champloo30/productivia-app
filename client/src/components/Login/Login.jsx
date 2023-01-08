import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import './login.scss'
import facebook from '../../assets/facebook-alt-svgrepo-com.svg'
import google from '../../assets/google-plus-svgrepo-com.svg'
import linkedIn from '../../assets/linkedin-svgrepo-com.svg'

async function loginUser(credintials) {
  return fetch('http://localhost:5000/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credintials)
  })
  .then(data => data.json())
}

export default function Login({ setToken }) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const token = await loginUser({
      email,
      password
    })
    setToken(token)
    console.log(token.token);
    navigate('/')
  }

  return (
    <div className='login'>
      <div className="left">
        <a href='/' className='title'>Productivia</a>
        <div className="left-container">
          <h2>New Here?</h2>
          <p>Sign up and begin your productive journey with <span>Productivia</span></p>
          <a href="/signup" className='signup-a'>
            <button className='signup-btn'>Sign Up</button>
          </a>
        </div>
      </div>
      <div className="right">
        <div className="right-container">
        <h1>Login to Your Account</h1>
        <p>Login using social networks</p>
        <div className="outside-btn-group">
          <div className="outside-btn">
            <img className='icon' src={facebook} alt="" />
          </div>
          <div className="outside-btn">
            <img className='icon google' src={google} alt="" />
          </div>
          <div className="outside-btn">
            <img className='icon' src={linkedIn} alt="" />
          </div>
        </div>
        <p>- or -</p>
        <form className='login-form' onSubmit={handleSubmit}>
          <input 
            className='form-text' 
            type="text" 
            name="email" 
            id="email" 
            placeholder='Email' 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
          <input 
            className='form-text' 
            type="text" 
            name="password" 
            id="password" 
            placeholder='Password' 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
          <button className='login-btn' type="submit">Log In</button>
        </form>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
