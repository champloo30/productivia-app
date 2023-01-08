import React from 'react'
import './signup.scss'
import facebook from '../../assets/facebook-alt-svgrepo-com.svg'
import google from '../../assets/google-plus-svgrepo-com.svg'
import linkedIn from '../../assets/linkedin-svgrepo-com.svg'

export default function Signup() {
  return (
    <div className='signup'>
        <div className="left">
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
                <form className='signup-form' method="post">
                    <div className="name">
                        <input className='name-text' type="text" name="name" id="first" placeholder='First Name' required />
                        <input className='name-text' type="text" name="name" id="last" placeholder='Last Name' required />
                    </div>
                    <input className='form-text' type="text" name="email" id="email" placeholder='Email' required />
                    <input className='form-text' type="text" name="password" id="password" placeholder='Password' required />
                    <input className='form-text' type="text" name="password_confirmation" id="password_confirmation" placeholder='Password Confirmation' required />
                    <button className='signup-btn' type="submit">Sign Up</button>
                </form>
            </div>
        </div>
        <div className="right">
            <div className="right-container">
                <h2>Welcome Back!</h2>
                <p>Please login with your personal info to stay connected with <span>Productivia</span></p>
                <a href='/login' className='login-a'>
                    <button className='login-btn'>log in</button>
                </a>
            </div>
        </div>
    </div>
  )
}
