import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import {useState, useEffect} from "react"
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AddTask from "./components/AddTask"
import Footer from './components/Footer'
import About from './components/About'

function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        getTasks()
    }, [])

    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        return await res.json()
    }

    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        return await res.json()
    }

    const addTask = async (task) => {
        await fetch('http://localhost:5000/tasks', { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(task) })

        const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer)
    }

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })

        const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer)
    }

    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}

        await fetch(`http://localhost:5000/tasks/${id}`, { method: 'PUT', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(updateTask) })

        const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer)
    }

  return (
      <Router>
          <div className="container">
              <Header title='Task Tracker' onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
              <Route path='/'
                     exact
                     render={(props => (
                         <>
                             { showAddTask && <AddTask onAdd={addTask}/>}
                             { tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'no Tasks to Show' }
                         </>
                     ))}
              />
              <Route path='/about' component={About} />
              <Footer/>
          </div>
      </Router>

  )
}

export default App
