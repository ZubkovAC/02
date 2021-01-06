import React from 'react';
import {TaskType} from "./App";


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    setFilter: (filter: "all" | "completed" | "active") => void
}

export const Todolist =  ({title, tasks, removeTask, setFilter}: PropsType) => {
    return <div>
        <h3>{title}</h3>
        <div>
            <input/>
            <button>+</button>
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
            <button onClick={() => setFilter('all')}>All</button>
            <button onClick={() => setFilter('active')}>Active</button>
            <button onClick={() => setFilter('completed')}>Completed</button>
        </div>
    </div>
}
