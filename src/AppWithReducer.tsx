import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {
    todolistsReducer,
    ChangeTodolistsFiltersTitlestAC,
    AddTodolistsAC,
    RemoveTodolistAC, ChangeTodolistsTitlestAC
} from "./state/todolists-reducer";
import {tasksReducer, addTasksAC, removeTaskAC, changeTaskStatusAC, newTitleTaskAC} from "./state/tasks-reducer";



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

export type TasksStateType={
    [key:string]:TaskType[]
}

const AppWithReducer = () => {

    const removeTodolist = (todolistID:string) =>{
        dispatchToTodolist(RemoveTodolistAC(todolistID))
        dispatchToTasks(RemoveTodolistAC(todolistID))
    }
    const addTodolist = (todolistTitle:string) => {
        let todolistID3 = v1()
        dispatchToTodolist(AddTodolistsAC(todolistID3,todolistTitle))
        dispatchToTasks(AddTodolistsAC(todolistID3,todolistTitle))
    }
    const newTitleTodolist = (newTitle:string,todolistID:string) =>{
        dispatchToTodolist(ChangeTodolistsTitlestAC(newTitle,todolistID))
    }
    const changeFilter = (value:"all" | "completed" | "active", todolistID:string) =>{
        dispatchToTodolist(ChangeTodolistsFiltersTitlestAC(value,todolistID))
    }

    let todolistID1 = v1()
    let todolistID2 = v1()

    const [todolists, dispatchToTodolist]= useReducer(todolistsReducer,[
    {id:todolistID1,title:'Time, Time, IS TIME!',filter:'all'},
    {id:todolistID2,title:'Programming NEW LIFE',filter:'all'}
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
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

    const addTasks =(newTitle:string, todolistID:string)=>{
      dispatchToTasks(addTasksAC(newTitle,todolistID))
    }
    const removeTask = (id: string, todolistID:string) => {
      dispatchToTasks(removeTaskAC(id,todolistID))
    }
    const changeTaskStatus = (idTask:string,newIsDone:boolean, todolistID:string) =>{
       dispatchToTasks(changeTaskStatusAC(idTask,newIsDone,todolistID))
    }
    const newTitleTask = (newtitle:string, todolistID:string,id:string) =>{
       dispatchToTasks(newTitleTaskAC(newtitle,todolistID,id))
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

export default AppWithReducer;
