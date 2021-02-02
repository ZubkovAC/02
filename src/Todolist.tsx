import React, {ChangeEvent} from 'react';
import {TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


type PropsType = {
    id:string
    title: string
    tasks: TaskType[]
    filter:"all" | "completed" | "active"
    removeTodolist:(todolistID:string)=>void
    addTasks:(newTitle:string, todolistID:string)=>void
    removeTask: (id: string, todolistID:string) => void
    newTitleTodolist:(newTitle:string, todolistID:string)=>void
    newTitleTask:(title:string,todolistID:string,id:string)=>void
    changeTaskStatus:(taskID:string, newIsDone:boolean, todolistID:string)=>void
    changeFilter: (filter: "all" | "completed" | "active", todolistID:string) => void
}

export const Todolist =  (props:PropsType) => {



    const addTasks = (title:string) =>{
        props.addTasks(title,props.id)
    }
    const newTitleTodolist = (newTitle:string) => {
        props.newTitleTodolist(newTitle,props.id)
    }


    const buttonOnClickFilterAll = () => props.changeFilter('all',props.id)
    const buttonOnClickFilterActive = () => props.changeFilter('active',props.id)
    const buttonOnClickFilterCompleted = () => props.changeFilter('completed',props.id)

    return <div>
        <h3>
            <EditableSpan  onChange={newTitleTodolist} title={props.title}/><button onClick={()=>{props.removeTodolist(props.id)}}>x</button>
        </h3>

        <AddItemForm  addTitle={addTasks}/>


        <ul>
            {
                props.tasks.map (t =>{

                    const taskPosition = (e:ChangeEvent<HTMLInputElement>) => {props.changeTaskStatus(t.id,e.currentTarget.checked,props.id)}
                    const newTitleTask = (title:string) =>{
                        props.newTitleTask(title,props.id,t.id)
                    }


                    return <li key={t.id}>
                        <input type="checkbox" onChange={taskPosition} checked={t.isDone}/>
                        <EditableSpan  onChange={newTitleTask} title={t.title}/>

                    <button onClick={() => {
                        props.removeTask(t.id,props.id)
                    }}>x</button>
                </li>
                })
            }

        </ul>
        <div>
            <button className={props.filter === 'all'? 'color':''} onClick={buttonOnClickFilterAll}>All</button>
            <button className={props.filter === 'active'? 'color':''} onClick={buttonOnClickFilterActive}>Active</button>
            <button className={props.filter === 'completed'? 'color':''} onClick={buttonOnClickFilterCompleted}>Completed</button>
        </div>
    </div>
}
