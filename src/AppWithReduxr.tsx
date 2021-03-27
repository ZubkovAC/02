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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";



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

let todolistID1 = v1()
let todolistID2 = v1()

const AppWithRedux = () => {

    const dispatch = useDispatch()

    const todolists= useSelector<AppRootStateType,Array<TodolistsType>>(state =>state.todolists)
    const tasks= useSelector<AppRootStateType,TasksStateType>(state =>state.tasks)


    const removeTodolist = (todolistID:string) =>{
        dispatch(RemoveTodolistAC(todolistID))

    }
    const addTodolist = (todolistTitle:string) => {
        let todolistID3 = v1()
        dispatch(AddTodolistsAC(todolistID3,todolistTitle))
    }
    const newTitleTodolist = (newTitle:string,todolistID:string) =>{
        dispatch(ChangeTodolistsTitlestAC(newTitle,todolistID))
    }
    const changeFilter = (value:"all" | "completed" | "active", todolistID:string) =>{
        dispatch(ChangeTodolistsFiltersTitlestAC(value,todolistID))
    }





    const addTasks =(newTitle:string, todolistID:string)=>{
        dispatch(addTasksAC(newTitle,todolistID))
    }
    const removeTask = (id: string, todolistID:string) => {
        dispatch(removeTaskAC(id,todolistID))
    }
    const changeTaskStatus = (idTask:string,newIsDone:boolean, todolistID:string) =>{
        dispatch(changeTaskStatusAC(idTask,newIsDone,todolistID))
    }
    const newTitleTask = (newtitle:string, todolistID:string,id:string) =>{
        dispatch(newTitleTaskAC(newtitle,todolistID,id))
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

export default AppWithRedux;
