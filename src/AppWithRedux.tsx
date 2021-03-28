import React, {useCallback, useReducer, useState} from 'react';
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


    const removeTodolist =useCallback(  (todolistID:string) =>{
        dispatch(RemoveTodolistAC(todolistID))

    },[dispatch])
    const newTitleTodolist =useCallback(  (newTitle:string,todolistID:string) =>{
        dispatch(ChangeTodolistsTitlestAC(newTitle,todolistID))
    },[dispatch])
    const changeFilter = useCallback( (value:"all" | "completed" | "active", todolistID:string) =>{
        dispatch(ChangeTodolistsFiltersTitlestAC(value,todolistID))
    },[dispatch])
    const addTodolist = useCallback( (todolistTitle:string) => {
        let todolistID3 = v1()
        dispatch(AddTodolistsAC(todolistID3,todolistTitle))
    },[dispatch])



    const addTasks =useCallback( (newTitle:string, todolistID:string)=>{
        dispatch(addTasksAC(newTitle,todolistID))
    },[dispatch])
    const removeTask =useCallback(  (id: string, todolistID:string) => {
        dispatch(removeTaskAC(id,todolistID))
    },[dispatch])
    const changeTaskStatus = useCallback( (idTask:string,newIsDone:boolean, todolistID:string) =>{
        dispatch(changeTaskStatusAC(idTask,newIsDone,todolistID))
    },[dispatch])
    const newTitleTask =useCallback(  (newtitle:string, todolistID:string,id:string) =>{
        dispatch(newTitleTaskAC(newtitle,todolistID,id))
    },[dispatch])


    return (
        <div className="App">

            <AddItemForm addTitle={addTodolist}/>
            {
                todolists.map( t => {

                    let Todolists = tasks[t.id]

                    return(

                        <Todolist
                            id={t.id}
                            key={t.id}
                            title={t.title}
                            filter={t.filter}
                            addTasks={addTasks}
                            tasks={Todolists}
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
