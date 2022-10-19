import './app.scss';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Todo from './components/Todo/Todo';
import Notes from './components/Notes/Notes'
import WOD from './components/WordOfDay/WordOfDay'

function App() {
  const DATA = [
    { id: 'todo-0', name: 'Eat', completed: true },
    { id: 'todo-1', name: 'Code', completed: false },
    { id: 'todo-2', name: 'Sleep', completed: false },
    { id: 'todo-3', name: 'Repeat', completed: false }
  ]

  return (
    <div className="app">
      <Menu />
      <Routes>
        <Route path='/' element={<Todo tasks={DATA} />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/wordoftheday' element={<WOD />} />
      </Routes>
    </div>
  );
}

export default App;
