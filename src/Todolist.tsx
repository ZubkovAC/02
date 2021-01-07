import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {TaskType} from "./App";


type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    setFilter: (filter: "all" | "completed" | "active") => void
    addTasks:(newTitle:string)=>void
}

export const Todolist =  ({title, tasks, removeTask, setFilter,addTasks}: PropsType) => {

    const [addTitle, setAddTitle] = useState('Jylio')
    const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddTitle(e.currentTarget.value)
    }
    const inputOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            addTasks(addTitle)
    }
    const buttonOnClick = () => {
        addTasks(addTitle)
    }

    const buttonOnClickFilterAll = () => setFilter('all')
    const buttonOnClickFilterActive = () => setFilter('active')
    const buttonOnClickFilterCompleted = () => setFilter('completed')


    return <div>
        <h3>{title}</h3>
        <div>
            <input
                value={addTitle}
                onChange={inputOnChange}
                onKeyPress={inputOnKeyPress}
            />
            <button
                onClick={buttonOnClick}
            >+
            </button>
        </div>
        <ul>
            {
                tasks.map(t => <li><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                    <button onClick={() => {
                        removeTask(t.id)
                    }}>x
                    </button>
                </li>)
            }

        </ul>
        <div>
            <button onClick={buttonOnClickFilterAll}>All</button>
            <button onClick={buttonOnClickFilterActive}>Active</button>
            <button onClick={buttonOnClickFilterCompleted}>Completed</button>
        </div>
    </div>
}
