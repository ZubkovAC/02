import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';
import {AddItemForm} from "./AddItemForm";



export type TodolistsType = {
    id:string
    title:string
    filter:"all" | "completed" | "active"
}

export  type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TasksType={
    [key:string]:TaskType[]
}

const App = () => {

    const changeFilter = (value:"all" | "completed" | "active", todolistID:string) =>{
        let filterTask=  todolists.find(t=>t.id===todolistID)
        if (filterTask)
            filterTask.filter=value
        setTodolists([...todolists])
    }

    const addTasks =(newTitle:string, todolistID:string)=>{
        let newTasks = {id:v1(), title:newTitle, isDone:false}
        tasks[todolistID] = [newTasks,...tasks[todolistID]]
        setTask({...tasks})
    }

    const removeTask = (id: string, todolistID:string) => {
        let remTask = tasks[todolistID]
        tasks[todolistID]=remTask.filter(t => t.id !== id)
        setTask({...tasks})
    }

    const changeTaskStatus = (idTask:string,newIsDone:boolean, todolistID:string) =>{
        let ntasks=tasks[todolistID]
        let tasksProg = ntasks.find( t=>t.id===idTask)
        if (tasksProg)
            tasksProg.isDone=newIsDone
        setTask({...tasks})
    }

    const removeTodolist = (todolistID:string) =>{
        let newTodolists = todolists.filter(t=>t.id!==todolistID)
        setTodolists([...newTodolists])
        delete tasks[todolistID]
        setTask({...tasks})
    }


    let todolistID1 = v1()
    let todolistID2 = v1()

    const [todolists, setTodolists]= useState< TodolistsType[] >([
    {id:todolistID1,title:'Time, Time, IS TIME!',filter:'all'},
    {id:todolistID2,title:'Programming NEW LIFE',filter:'all'}
    ])

    const [tasks, setTask] = useState<TasksType>({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Hello world", isDone: true},
            {id: v1(), title: "I am Happy", isDone: false},
            {id: v1(), title: "Yo", isDone: false}
            ],
        [todolistID2]:[
            {id: v1(), title: "S-A-S-S", isDone: true},
            {id: v1(), title: "NODE JS", isDone: true},
            {id: v1(), title: "VjI", isDone: false},
            {id: v1(), title: "PyToHt", isDone: true},
            {id: v1(), title: "RybI", isDone: false},
            {id: v1(), title: "ANguLAr", isDone: false}
            ]
    })

    const addTodolist = (todolistTitle:string) => {
        let todolistID3 = v1()
        let newTodolist:TodolistsType = {id:todolistID3, title:todolistTitle, filter:'all'}
        setTodolists([newTodolist,...todolists])
        setTask({
            ...tasks,
            [todolistID3]:[]
        })
    }
    const newTitleTask = (newtitle:string, todolistID:string,id:string) =>{
        let newtitleTask = tasks[todolistID]
        let titleTask = newtitleTask.find(t=>t.id===id)
        if (titleTask)
            titleTask.title=newtitle
        setTask({...tasks})
    }

    const newTitleTodolist = (newTitle:string,todolistID:string) =>{
        let todolist = todolists.find(t=>t.id===todolistID)
        if (todolist)
            todolist.title=newTitle
        setTodolists([...todolists])
    }


    return (
        <div className="App">

            <AddItemForm addTitle={addTodolist}/>
            {
                todolists.map( t => {

                    let Todolists = tasks[t.id]
                    let allTodolists = Todolists

                    if (t.filter==='completed'){
                        allTodolists = Todolists.filter( t=>t.isDone)
                    }
                    if (t.filter==='active'){
                        allTodolists = Todolists.filter( t=>!t.isDone)
                    }

                    return(

                        <Todolist
                            id={t.id}
                            key={t.id}
                            title={t.title}
                            filter={t.filter}
                            addTasks={addTasks}
                            tasks={allTodolists}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            newTitleTask={newTitleTask}
                            removeTodolist={removeTodolist}
                            newTitleTodolist={newTitleTodolist}
                            changeTaskStatus={changeTaskStatus}

                        />
                    )
                })
            }
        </div>
    );
}

export default App;
