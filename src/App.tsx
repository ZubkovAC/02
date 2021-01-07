import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';


export  type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const App = () => {

    const tasks1 = [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Hello world", isDone: true},
        {id: v1(), title: "I am Happy", isDone: false},
        {id: v1(), title: "Yo", isDone: false}
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


    const changeStatus = (id:string , newIsDone:boolean) =>{
        let newStatus = tasks.find( t=> t.id===id)
        if(newStatus)
        newStatus.isDone = newIsDone
        setTask ([...tasks])
    }


    const addTasks =(newTitle:string)=>{
        let newTasks = {id:v1(), title:newTitle, isDone:false}
        setTask([newTasks,...tasks])
    }

    const removeTask = (id: string) => {
        setTask(tasks.filter(t => t.id !== id))
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={FilterTasks(tasks)}
                removeTask={removeTask}
                setFilter={setFilter}
                addTasks={addTasks}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
