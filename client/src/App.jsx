import './app.scss';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Home from './components/Home/Home';
import Todo from './components/Todo/Todo';
import Notes from './components/Notes/Notes'
import Pomodoro from './components/PomodoroTimer/PomodoroTimer'
import WOD from './components/WordOfDay/WordOfDay'
import Form from './components/Todo/Form/Form';
import EditForm from './components/Todo/EditForm/EditForm';

function App() {
  const TASK_DATA = []
  const NOTE_DATA = []

  return (
    <div className="app">
      <Menu />
      <Routes>
        <Route path='/' element={<Home tasks={TASK_DATA} />} />
        <Route path='/myTasks' element={<Todo />} />
        <Route path='/myTasks/addTask' element={<Form />} />
        <Route path='/myTasks/edit/:id' element={<EditForm />} />
        <Route path='/myNotes' element={<Notes notes={NOTE_DATA} />} />
        <Route path='/pomodoroTimer' element={<Pomodoro />} />
        <Route path='/wordOfTheDay' element={<WOD />} />
      </Routes>
    </div>
  );
}

export default App;
