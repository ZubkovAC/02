import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {TaskType} from "./App";
import './App.css';

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    setFilter: (filter: "all" | "completed" | "active") => void
    addTasks:(newTitle:string)=>void
    changeStatus:(id:string , newIsDone:boolean)=>void
    filter:"all" | "completed" | "active"
}

export const Todolist =  ({title, tasks, removeTask, setFilter,addTasks,changeStatus,filter}: PropsType) => {

    const [addTitle, setAddTitle] = useState('Jylio')
    const [error,setError] = useState<string|null>(null)



    const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddTitle(e.currentTarget.value)
        setError(null)
    }
    const inputOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" ){
            if (addTitle.trim()!==''){
                addTasks(addTitle)
                setAddTitle('')
            }else{setError('Title is required')}
    }}
    const addTask = () => {
        if (addTitle.trim()!==''){
            addTasks(addTitle)
            setAddTitle('')
        }else{setError('Title is required')}
    }

    const buttonOnClickFilterAll = () => setFilter('all')
    const buttonOnClickFilterActive = () => setFilter('active')
    const buttonOnClickFilterCompleted = () => setFilter('completed')

    const buttonClassFilterAll = filter === "all"? 'colorButton': ''
    const buttonClassFilterActive= filter === "active"? 'colorButton': ''
    const buttonClassFilterCompleted = filter === "completed"? 'colorButton': ''

    return <div>
        <h3>{title}</h3>
        <div>
            <input
                value={addTitle}
                onChange={inputOnChange}
                onKeyPress={inputOnKeyPress}
                className={error? 'inputError':'input'}
            />
            <button
                onClick={addTask}
            >+
            </button>
            {error?  <div className='error'>{error}</div>: error}
        </div>
        <ul>
            {
                tasks.map(t => <li key={t.id}><input type="checkbox" onClick={(e)=>{changeStatus(t.id , e.currentTarget.checked)}} checked={t.isDone}/> <span>{t.title} </span>
                    <button onClick={() => {
                        removeTask(t.id)
                    }}>x
                    </button>
                </li>)
            }

        </ul>
        <div>
            <button className={buttonClassFilterAll} onClick={buttonOnClickFilterAll}>All</button>
            <button className={buttonClassFilterActive} onClick={buttonOnClickFilterActive}>Active</button>
            <button className={buttonClassFilterCompleted} onClick={buttonOnClickFilterCompleted}>Completed</button>
        </div>
    </div>
}
