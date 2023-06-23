import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'
import { motion } from 'framer-motion'
import './login.scss'
import facebook from '../../assets/facebook-alt-svgrepo-com.svg'
import google from '../../assets/google-plus-svgrepo-com.svg'
import linkedIn from '../../assets/linkedin-svgrepo-com.svg'

export default function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const {login, isLoading, error} = useLogin()
  
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    
    await login(email, password)
    console.log(error);

    navigate('/')
  }

  const mobileSize = window.innerWidth <= 450

    const left = {
        regular: {
            y: ['-100vh', '0vh'],
            transition: {
                delay: 0.125,
                duration: 1
            }
        },
        small: {
            x: ['-100vw', '0vw'],
            transition: {
                delay: 0.125,
                duration: 1
            }
        }
    }

  return (
    <div className='login'>
      <motion.div 
        className="left"
        variants={left}
        animate={mobileSize ? 'small' : 'regular'}
      >
        <a href='/' className='title'>Productivia</a>
        <div className="left-container">
          <h2>New Here?</h2>
          <p>Sign up and begin your productive journey with <span>Productivia</span></p>
          <a href="/signup" className='signup-a'>
            <button className='signup-btn'>Sign Up</button>
          </a>
        </div>
      </motion.div>
      <motion.div 
        className="right"
        animate={{
          opacity: [0, 1]
        }}
        transition={{
          duration: 1,
          delay: 0.125
        }}
      >
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
            value={email}
            required 
          />
          <input 
            className='form-text' 
            type="password" 
            name="password" 
            id="password" 
            placeholder='Password' 
            onChange={e => setPassword(e.target.value)} 
            value={password}
            required 
          />
          <button className='login-btn' type="submit" disabled={isLoading}>Log In</button>
          {error ? <div className='error'>{error}</div> : null}
        </form>
        </div>
      </motion.div>
    </div>
  )
}
