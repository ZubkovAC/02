import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';


export  type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistsPropsType ={
    id:string,
    title:string,
    filter:"all" | "completed" | "active"
}
const App = () => {

    const changeFilter = (newFilter:"all" | "completed" | "active",todolistID:string) =>{
        let todolistFilter = todolists.find(t=>t.id==todolistID)
        if (todolistFilter)
            todolistFilter.filter=newFilter
        setTodolists([...todolists])
    }

    const changeStatus = (id:string , newIsDone:boolean,todolistID:string) =>{
        let newStatus = tasks[todolistID]
        let statusNew = newStatus.find( t=> t.id===id)
        if(statusNew)
            statusNew.isDone = newIsDone
        setTasks ({...tasks})
    }


    const addTasks =(newTitle:string,todolistID:string)=>{
        let newTasks = {id:v1(), title:newTitle, isDone:false}
        tasks[todolistID] = [newTasks,...tasks[todolistID]]
        setTasks({...tasks})
    }

    const removeTask = (id: string,todolistID:string) => {
        let remTask = tasks[todolistID]
        tasks[todolistID]=remTask.filter(t => t.id !== id)
        setTasks({...tasks})
    }

    const todolistID1=v1()
    const todolistID2=v1()

    const [todolists,setTodolists]=useState<Array<TodolistsPropsType>>([
        {id:todolistID1,title:'the future is formed in the head', filter:"all"},
        {id:todolistID2,title:'Lets GO!', filter:"all"}

    ])
    const [tasks, setTasks] = useState({
        [todolistID1]:[{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Hello world", isDone: true},
            {id: v1(), title: "I am Happy", isDone: false},
            {id: v1(), title: "Yo", isDone: false}],
        [todolistID2]:[{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Hello world", isDone: true},
            {id: v1(), title: "I am Happy", isDone: false},
            {id: v1(), title: "Yo", isDone: false}]
    })

    return (
        <div className="App">
            {
                todolists.map(t =>{
                    let todolistForTask = tasks[t.id]
                    let allTodolistTask = todolistForTask

                    if(t.filter==="active"){
                        todolistForTask = allTodolistTask.filter( t=>!t.isDone)
                    }
                    if(t.filter==="completed"){
                        todolistForTask = allTodolistTask.filter( t=>t.isDone)
                    }

                    return<Todolist
                        key={t.id}
                        id={t.id}
                        title={t.title}
                        tasks={todolistForTask}
                        removeTask={removeTask}
                        setFilter={changeFilter}
                        addTasks={addTasks}
                        changeStatus={changeStatus}
                        filter={t.filter}
                    />

                })
            }

        </div>
    );
}

export default App;