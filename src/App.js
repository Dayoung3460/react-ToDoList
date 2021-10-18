import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import {useState} from "react"
import AddTask from "./components/AddTask"

function App() {
    const [tasks, setTasks] = useState([
            {
                id: 1,
                text: 'Doctors Appointment',
                day: '210804',
                reminder: 'true'
            },
            {
                id: 2,
                text: 'Meeting at School',
                day: '210805',
                reminder: 'true'
            },
            {
                id: 3,
                text: 'Grocery Shopping',
                day: '210806',
                reminder: 'false'
            }
        ]
    )

    const addTask = (task) => {
        const id = Math.floor(Math.random() * 10000) + 1
        const newTask = { id, ...task }
        setTasks([...tasks, newTask])
    }

    const deleteTask = (id) => {
        console.log(id)
        setTasks(
            tasks.filter((task) => (
                task.id !== id
            ))
        )
    }

    const toggleReminder = (id) => {
        setTasks(tasks.map((task) => (
            task.id === id ?
            {
                ...task,
                reminder: !task.reminder
            }
            : task
        )))
    }

  return (
    <div className="container">
        <Header title='Task Tracker'/>
        <AddTask onAdd={addTask}/>
        {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'no Tasks to Show'}
    </div>
  )
}

export default App
