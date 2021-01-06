import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export  type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const App = () => {

    const tasks1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Hello world", isDone: true},
        {id: 5, title: "I am Happy", isDone: false},
        {id: 6, title: "Yo", isDone: false}
    ]

    const [tasks, setTask] = useState<TaskType[]>(tasks1)

    const [filter, setFilter] = useState<"all" | "completed" | "active">('all')

    const FilterTasks = (tasks: TaskType[]) => {
        switch (filter) {
            case "all":
                return tasks
            case "active":
                return tasks.filter(e => !e.isDone)
            case "completed":
                return tasks.filter(e => e.isDone)
            default:
                return tasks
        }
    }

    const removeTask = (id: number) => {
        setTask(tasks.filter(t => t.id !== id))
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={FilterTasks(tasks)}
                removeTask={removeTask}
                setFilter={setFilter}
            />
        </div>
    );
}

export default App;
