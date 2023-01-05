import './app.scss';
import { useState } from 'react';
import { useTimer } from 'react-timer-hook'
import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Menu from './components/Menu/Menu';
import Home from './components/Home/Home';
import Todo from './components/Todo/Todo';
import AddTask from './components/Todo/AddForm/AddForm';
import EditForm from './components/Todo/EditForm/EditForm';
import Notes from './components/Notes/Notes'
import AddNote from './components/Notes/AddForm/AddForm'
import ViewNote from './components/Notes/ViewNote/ViewNote';
import EditNote from './components/Notes/EditNote/EditNote';
import Pomodoro from './components/PomodoroTimer/PomodoroTimer'
import WOD from './components/WordOfDay/WordOfDay'



function App() {
  const [mode, setMode] = useState('pomodoro') // session mode
  const [session, setSession] = useState(0) // session counter
  const [isLoggedIn, setIsLoggedIn] = useState(false) // login checker

  const expiryTimestamp = new Date()
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 1500)

  // useTimer API
  const { seconds, minutes, isRunning, pause, resume, restart } = useTimer({ expiryTimestamp, onExpire: () => {
    const expiryTimestamp = new Date()
    if (mode === 'pomodoro' && session < 3) {
      setMode('short')
      expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() - 1200)
      restart(expiryTimestamp)
      setSession(session + 1)
    } else if (mode === 'short') {
      setMode('pomodoro')
      expiryTimestamp.setSeconds(expiryTimestamp.getSeconds())
      restart(expiryTimestamp)
    } else if (mode === 'pomodoro' && session === 3) {
      setMode('long')
      expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() - 600)
      restart(expiryTimestamp)
    } else if (mode === 'long') {
      setMode('pomodoro')
      expiryTimestamp.setSeconds(expiryTimestamp.getSeconds())
      restart(expiryTimestamp)
      setSession(0)
    }
  }, autoStart: false })

  function pomodoro() {
    setMode('pomodoro')
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds())
    restart(expiryTimestamp)
    pause()
  }

  function short() {
    setMode('short')
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() - 1200)
    restart(expiryTimestamp)
    pause()
  }

  function long() {
    setMode('long')
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() - 600)
    restart(expiryTimestamp)
    pause()
  }

  return (
    <div className="app">
      {isLoggedIn ? 
      <>
        <Menu mode={mode} />
        <Routes>
          <Route path='/' element={<Home mode={mode} setMode={setMode} expiryTimestamp={expiryTimestamp} seconds={seconds} minutes={minutes} isRunning={isRunning} restart={restart} resume={resume} pause={pause} pomodoro={pomodoro} short={short} long={long} />} />
          <Route path='tasks' element={<Todo />} />
          <Route path='tasks/addTask' element={<AddTask />} />
          <Route path='tasks/edit/:id' element={<EditForm />} />
          <Route path='notes' element={<Notes />} />
          <Route path='notes/addNote' element={<AddNote />} />
          <Route path='notes/:id' element={<ViewNote />} />
          <Route path='notes/edit/:id' element={<EditNote />} />
          <Route path='pomodoroTimer' element={<Pomodoro expiryTimestamp={expiryTimestamp} mode={mode} seconds={seconds} minutes={minutes} isRunning={isRunning} pause={pause} resume={resume} restart={restart} pomodoro={pomodoro} short={short} long={long} />} />
          <Route path='wordOfTheDay' element={<WOD />} />
        </Routes> 
      </>
      : 
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      
      }
    </div>
  );
}

export default App;
