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

function App() {

  return (
    <div className="app">
      <Menu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/myTasks' element={<Todo />} />
        <Route path='/myTasks/addTask' element={<AddTask />} />
        <Route path='/myTasks/edit/:id' element={<EditForm />} />
        <Route path='/myNotes' element={<Notes />} />
        <Route path='/myNotes/addNote' element={<AddNote />} />
        <Route path='/myNotes/:id' element={<ViewNote />} />
        <Route path='/myNotes/edit/:id' element={<EditNote />} />
        <Route path='/pomodoroTimer' element={<Pomodoro />} />
        <Route path='/wordOfTheDay' element={<WOD />} />
      </Routes>
    </div>
  );
}

export default App;
