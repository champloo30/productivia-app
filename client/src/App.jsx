import './app.scss';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Todo from './components/Todo/Todo';
import Notes from './components/Notes/Notes'
import Pomodoro from './components/PomodoroTimer/PomodoroTimer'
import WOD from './components/WordOfDay/WordOfDay'

function App() {
  const DATA = []

  return (
    <div className="app">
      <Menu />
      <Routes>
        <Route path='/' element={<Todo tasks={DATA} />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/pomodoro-timer' element={<Pomodoro />} />
        <Route path='/word-of-the-day' element={<WOD />} />
      </Routes>
    </div>
  );
}

export default App;
