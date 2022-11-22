import './app.scss';
import { Routes, Route } from 'react-router-dom';
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
import { useState } from 'react';

function App() {
  const [mode, setMode] = useState('pomodoro')
  const [sec, setSec] = useState(1500)

  const time = new Date()
  time.setSeconds(time.getSeconds() + sec)

  console.log(sec);

  function pomodoro() {
    setMode('pomodoro')
    setSec(1500)
  }

  function short() {
    setMode('short')
    setSec(300)
  }

  function long() {
    setMode('long')
    setSec(900)
  }

  return (
    <div className="app">
      <Menu mode={mode} />
      <Routes>
        <Route path='/' element={<Home mode={mode} />} />
        <Route path='/myTasks' element={<Todo />} />
        <Route path='/myTasks/addTask' element={<AddTask />} />
        <Route path='/myTasks/edit/:id' element={<EditForm />} />
        <Route path='/myNotes' element={<Notes />} />
        <Route path='/myNotes/addNote' element={<AddNote />} />
        <Route path='/myNotes/:id' element={<ViewNote />} />
        <Route path='/myNotes/edit/:id' element={<EditNote />} />
        <Route path='/pomodoroTimer' element={<Pomodoro expiryTimestamp={time} mode={mode} setSec={setSec} pomodoro={pomodoro} short={short} long={long} />} />
        <Route path='/wordOfTheDay' element={<WOD />} />
      </Routes>
    </div>
  );
}

export default App;
