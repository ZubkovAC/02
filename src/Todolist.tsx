import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox} from "@material-ui/core";
import {DeleteSweep} from "@material-ui/icons";

export type FilterValuesType ={
    filter: "all" | "completed" | "active"
}


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

    console.log('xyu')

    const addTasks =useCallback(  (title:string) =>{
        console.log('xyu')
        props.addTasks(title,props.id)
    },[])
    const newTitleTodolist = (newTitle:string) => {
        props.newTitleTodolist(newTitle,props.id)
    }


    const buttonOnClickFilterAll = () => props.changeFilter('all',props.id)
    const buttonOnClickFilterActive = () => props.changeFilter('active',props.id)
    const buttonOnClickFilterCompleted = () => props.changeFilter('completed',props.id)

    let tasksForTodolists=props.tasks

    if (props.filter==='completed'){
        tasksForTodolists = props.tasks.filter( t=>t.isDone)
    }
    if (props.filter==='active'){
        tasksForTodolists = props.tasks.filter( t=>!t.isDone)
    }


    return <div>
        <h3>
            <EditableSpan  onChange={newTitleTodolist} title={props.title}/><DeleteSweep  color="disabled" onClick={()=>{props.removeTodolist(props.id)}}>x</DeleteSweep>
        </h3>

        <AddItemForm  addTitle={addTasks}/>


        <div style={{paddingTop:'20px'}}>
            <ButtonGroup color="primary" size="small" aria-label="small primary button group" >
                <Button  variant={props.filter === 'all'? 'contained' : 'text' } color="primary"  onClick={buttonOnClickFilterAll}>All</Button>
                <Button  variant={props.filter === 'active'? 'contained' : 'text' } color="primary"  onClick={buttonOnClickFilterActive}>Active</Button>
                <Button  variant={props.filter === 'completed'? 'contained' : 'text' } color="primary"  onClick={buttonOnClickFilterCompleted}>Completed</Button>
            </ButtonGroup>
        </div>

        <ul>
            {
                tasksForTodolists.map (t =>{

                    const taskPosition = (e:ChangeEvent<HTMLInputElement>) => {props.changeTaskStatus(t.id,e.currentTarget.checked,props.id)}
                    const newTitleTask = (title:string) =>{
                        props.newTitleTask(title,props.id,t.id)
                    }

                    return <div key={t.id}>

                        <Checkbox style={{color:'navy'}} onChange={taskPosition} checked={t.isDone}/>
                        <EditableSpan  onChange={newTitleTask} title={t.title}/>

                    <DeleteSweep  style={{marginTop:'5px'}}  color="disabled" onClick={() => {
                        props.removeTask(t.id,props.id)
                    }}>x</DeleteSweep>
                </div>
                })
            }
        </ul>

    </div>
}
