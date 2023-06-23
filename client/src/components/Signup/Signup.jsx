import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignup } from '../../hooks/useSignup'
import { motion } from 'framer-motion'
import './signup.scss'
import facebook from '../../assets/facebook-alt-svgrepo-com.svg'
import google from '../../assets/google-plus-svgrepo-com.svg'
import linkedIn from '../../assets/linkedin-svgrepo-com.svg'

export default function Signup() {
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, isLoading, error} = useSignup()

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        
        await signup(first, last, email, password)
        console.log(error);

        navigate('/')
    }

    const mobileSize = window.innerWidth <= 450

    const right = {
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
    <div className='signup'>
        <motion.div 
            className="left"
            animate={{
                opacity: [0, 1]
            }}
            transition={{
                duration: 1,
                delay: 0.125
            }}
        >
            <a href='/' className='title'>Productivia</a>
            <div className="left-container">
                <h1>Create Account</h1>
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
                <p>- or use your email for registration -</p>
                <form className='signup-form' onSubmit={handleSubmit}>
                    <div className="name">
                        <input 
                            className='name-text' 
                            type="text" 
                            id="first" 
                            placeholder='First Name' 
                            onChange={e => setFirst(e.target.value)}
                            value={first}
                            required 
                        />
                        <input 
                            className='name-text' 
                            type="text" 
                            id="last" 
                            placeholder='Last Name'
                            onChange={e => setLast(e.target.value)} 
                            value={last}
                            required 
                        />
                    </div>
                    <input 
                        className='form-text' 
                        type="text" 
                        id="email" 
                        placeholder='Email'
                        onChange={e => setEmail(e.target.value)} 
                        value={email}
                        required 
                    />
                    <input 
                        className='form-text' 
                        type="password" 
                        id="password" 
                        placeholder='Password' 
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        required 
                    />
                    <button className='signup-btn' type="submit" disabled={isLoading}>Sign Up</button>
                    {error && <div className='error'>{error}</div>}
                </form>
            </div>
        </motion.div>
        <motion.div 
            className="right"
            variants={right}
            animate={mobileSize ? 'small' : 'regular'}
        >
            <div className="right-container">
                <h2>Welcome Back!</h2>
                <p>Please login with your personal info to stay connected with <span>Productivia</span></p>
                <a href='/login' className='login-a'>
                    <button className='login-btn'>log in</button>
                </a>
            </div>
        </motion.div>
    </div>
  )
}
