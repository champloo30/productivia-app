// import React, { useEffect, useState } from 'react'
// import './todoItem.scss'

// const Task = (props) => (
//   <div className='viewing'>
//     <div className='cb'>
//       <input 
//         type="checkbox" 
//         id={props.id} 
//         defaultChecked={props.completed} 
//         onChange={() => props.toggleTaskCompleted(props.id)}
//       />
//       <label data-title={props.task.name} id='todo-label' className='todo-label' htmlFor={props.id}>
//         {truncate()}
//       </label>
//     </div>
//     <div className="btn-group">
//       {props.completed === true ? null : <button 
//         className="todo-btn edit" 
//         type='button' 
//         // onClick={() => setEditing(true)}
//       >
//         Edit
//       </button>}
//       <button 
//         className="todo-btn delete" 
//         type='button' 
//         onClick={() => props.deleteTask(props.id)}
//       >
//         Delete
//       </button>
//     </div>
//   </div>
// )

// export default function TodoItem(props) {
//   const [task, setTask] = useState([])
  
//   useEffect(() => {
//     async function getTasks() {
//       const response = await fetch(`http://localhost:5000/myTasks`)

//       if (!response.ok) {
//         const message = `An error has occurred: ${response.statusText}`
//         window.alert(message)
//         return
//       }

//       const task = await response.json()
//       setTask(task)
//     }
//     getTasks()
//     return
//   }, [task.length])

//   function truncate() {
//     if (props.task.name.length > 15) {
//       return props.name.substring(0, 15) + '...'
//     }
//     return props.task.name
//   }

//   return (
//     function 
//     <li className="todo-item">
//       {Task}
//     </li>
//   )
// }
