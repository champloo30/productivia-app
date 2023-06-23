import React from 'react'
import { motion } from 'framer-motion'
import './landing.scss'
import tasksVideo from '../../assets/tasks.mp4'
import notesVideo from '../../assets/notes.mp4'
import pomodoroVideo from '../../assets/pomodoro.mp4'
import wotdVideo from '../../assets/wotd.mp4'
import dashboardVideo from '../../assets/dashboard.mp4'

export default function Landing() {

  

  const data = [
    {
      video: tasksVideo,
      name: 'Tasks',
      list: {
        one: '• CREATE, UPDATE and DELETE tasks',
        two: '• Categorize tasks by their active or completed status'
      }
    },
    {
      video: notesVideo,
      name: 'Notes',
      list: {
        one: '• CREATE, READ, UPDATE and DELETE notes',
        two: '• Make your note into a journal entry'
      }
    },
    {
      video: pomodoroVideo,
      name: 'Pomodoro Timer',
      list: {
        one: '• Keep yourself on task to stay productive',
        two: '• A 3 setting timing structure to keep yourself focused'
      }
    },
    {
      video: wotdVideo,
      name: 'Word of the Day',
      list: {
        one: '• Learn a new word each day',
        two: '• Even small details about the word you are learning'
      }
    },
    {
      video: dashboardVideo,
      name: 'Dashboard',
      list: {
        one: '• Your productivity residence',
        two: '• Over look all the important details in one location'
      }
    }
  ]

  const mobileSize = window.innerWidth <= 450

  const h1 = {
    regular: {
      opacity: [0, 1, 1, 1, 1, 1],
      scale: [0, 2, 1, 1, 1, 1],
      x: [0, 0, 0, 0, -440, -440],
      y: [0, 0, 0, 0, -50, -50],
      color: ['#fff', '#fff', '#A4BEF3', '#E0B0FF', '#fff', '#fff'],
      transition: {
        duration: 4,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        delay: 0.3
      }
    },
    small: {
      opacity: [0, 1, 1, 1, 1, 1],
      scale: [0, 2, 1, 1, 1, 1],
      x: [0, 0, 0, 0, -20, -20],
      y: [0, 0, 0, 0, -280, -280],
      color: ['#fff', '#fff', '#A4BEF3', '#E0B0FF', '#fff', '#fff'],
      transition: {
        duration: 4,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        delay: 0.1
      }
    }
  }

  return (
    <div className='landing'>
      <motion.h1  
      variants={h1}
        animate={mobileSize ? 'small' : 'regular'}
      >Productivia</motion.h1>
      <motion.div 
        className="left"
        animate={{
          opacity: [0, 1]
        }}
        transition={{
          duration: 1,
          delay: 3.7
        }}
      >
        <div className="left-container">
          <h2>Welcome to</h2>
          <h3>Productivia</h3>
          <div className="links">
            <a href="/signup" className='btn signup-link'>Sign Up</a>
            <a href="/login" className='btn login-link'>Log In</a>
          </div>
          <p>The only application that will meet your productivity needs. Sign up for four amazing features that will boost your productivity <span className='percent'>110%</span>!</p>
        </div>
      </motion.div>
      <motion.div 
        className="right"
        animate={{
          opacity: [0, 1]
        }}
        transition={{
          duration: 1,
          delay: 3.7
        }}
      >
        <motion.div 
          className='carousel' 
          whileTap={{cursor: 'grabbing'}}
        >
          <motion.div 
            drag='x' 
            dragConstraints={mobileSize ? { right: 0, left: -1570 } : { right: 0, left: -1800 }} 
            className='inner-carousel'
          >
            <div className='box odd'>
              <div className="box-container">
                <video 
                  className='video' 
                  loop 
                  autoPlay={true} 
                  muted
                >
                  <source src={data[0].video} type='video/mp4' />
                </video>
                <div className="text">
                  <h3>{data[0].name}</h3>
                  <p>{data[0].list.one}</p>
                  <p>{data[0].list.two}</p>
                </div>
              </div>
            </div>
            <div className='box even'>
              <div className="box-container">
                <video 
                  className='video' 
                  loop 
                  autoPlay={true} 
                  muted
                >
                  <source src={data[1].video} type='video/mp4' />
                </video>
                <div className="text">
                  <h3>{data[1].name}</h3>
                  <p>{data[1].list.one}</p>
                  <p>{data[1].list.two}</p>
                </div>
              </div>
            </div>
            <div className='box odd'>
              <div className="box-container">
                <video 
                  className='video' 
                  loop 
                  autoPlay={true} 
                  muted
                >
                  <source src={data[2].video} type='video/mp4' />
                </video>
                <div className="text">
                  <h3>{data[2].name}</h3>
                  <p>{data[2].list.one}</p>
                  <p>{data[2].list.two}</p>
                </div>
              </div>
            </div>
            <div className='box even'>
              <div className="box-container">
                <video 
                  className='video' 
                  loop 
                  autoPlay={true} 
                  muted
                >
                  <source src={data[3].video} type='video/mp4' />
                </video>
                <div className="text">
                  <h3>{data[3].name}</h3>
                  <p>{data[3].list.one}</p>
                  <p>{data[3].list.two}</p>
                </div>
              </div>
            </div>
            <div className='box odd'>
              <div className="box-container">
                <video 
                  className='video' 
                  loop 
                  autoPlay={true} 
                  muted
                >
                  <source src={data[4].video} type='video/mp4' />
                </video>
                <div className="text">
                  <h3>{data[4].name}</h3>
                  <p>{data[4].list.one}</p>
                  <p>{data[4].list.two}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        <motion.span 
          animate={{
            opacity: [0, 0.5, 1, 0.5, 0],
            y: [5, -5, 5]
          }} 
          transition={{
            duration: 2,
            repeat: Infinity
          }}
          className='swipe'
        >
          {'Swipe >>'}
        </motion.span>
      </motion.div>
    </div>
  )
}
