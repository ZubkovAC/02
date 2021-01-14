import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {TaskType} from "./App";
import './App.css';

type PropsType = {
    id:string
    title: string
    tasks: TaskType[]
    removeTask: (id: string,todolistID:string) => void
    setFilter: (filter: "all" | "completed" | "active",todolistID:string) => void
    addTasks:(newTitle:string,todolistID:string)=>void
    changeStatus:(id:string , newIsDone:boolean,todolistID:string)=>void
    filter:"all" | "completed" | "active"
}

export const Todolist =  (props: PropsType) => {

    const [addTitle, setAddTitle] = useState('Jylio')
    const [error,setError] = useState<string|null>(null)



    const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddTitle(e.currentTarget.value)
        setError(null)
    }
    const inputOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" ){
            if (addTitle.trim()!==''){
                props.addTasks(addTitle,props.id)
                setAddTitle('')
            }else{setError('Title is required')}
        }}
    const addTask = () => {
        if (addTitle.trim()!==''){
            props.addTasks(addTitle,props.id)
            setAddTitle('')
        }else{setError('Title is required')}
    }

    const buttonOnClickFilterAll = () => props.setFilter('all',props.id)
    const buttonOnClickFilterActive = () => props.setFilter('active',props.id)
    const buttonOnClickFilterCompleted = () => props.setFilter('completed',props.id)

    const buttonClassFilterAll = props.filter === "all"? 'colorButton': ''
    const buttonClassFilterActive= props.filter === "active"? 'colorButton': ''
    const buttonClassFilterCompleted = props.filter === "completed"? 'colorButton': ''

    return <div>
        <h3>{props.title}</h3>
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
                props.tasks.map(t => <li key={t.id}><input type="checkbox" onClick={(e)=>{props.changeStatus(t.id , e.currentTarget.checked,props.id)}} checked={t.isDone}/> <span>{t.title} </span>
                    <button onClick={() => {
                        props.removeTask(t.id,props.id)
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