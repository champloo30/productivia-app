import './app.scss';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Home from './components/Home/Home';
import Todo from './components/Todo/Todo';
import Notes from './components/Notes/Notes'
import Pomodoro from './components/PomodoroTimer/PomodoroTimer'
import WOD from './components/WordOfDay/WordOfDay'

function App() {
  const TASK_DATA = []
  const NOTE_DATA = [
    { id: 'note-1', category: 'Notes', title: 'Note One', content: 'lorem ipsum asvdn vasvas dvadsv paojva'},
    { id: 'note-2', category: 'Notes', title: 'Note Two', content: 'lorem ipsum asvdn vasvas dvadsv dasdgvar'},
    { id: 'note-3', category: 'Notes', title: 'Note Three', content: 'lorem ipsum asvdn vasvas dvadsv btsr'},
    { id: 'journal-1', category: 'Journal', title: 'Journal One', content: 'lorem ipsum asvdn vasvas dvadsv btsr'}
  ]

  return (
    <div className="app">
      <Menu />
      <Routes>
        <Route path='/' element={<Home tasks={TASK_DATA} />} />
        <Route path='/todo-list' element={<Todo tasks={TASK_DATA} />} />
        <Route path='/notes' element={<Notes notes={NOTE_DATA} />} />
        <Route path='/pomodoro-timer' element={<Pomodoro />} />
        <Route path='/word-of-the-day' element={<WOD />} />
      </Routes>
    </div>
  );
}

export default App;
