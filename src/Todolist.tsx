import React, { useCallback} from 'react';
import {TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup} from "@material-ui/core";
import {DeleteSweep} from "@material-ui/icons";
import {Tasks} from "./Tasks";

export type FilterValuesType = {
    filter: "all" | "completed" | "active"
}


type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    filter: "all" | "completed" | "active"
    removeTodolist: (todolistID: string) => void
    addTasks: (newTitle: string, todolistID: string) => void
    removeTask: (id: string, todolistID: string) => void
    newTitleTodolist: (newTitle: string, todolistID: string) => void
    newTitleTask: (title: string, todolistID: string, id: string) => void
    changeTaskStatus: (taskID: string, newIsDone: boolean, todolistID: string) => void
    changeFilter: (filter: "all" | "completed" | "active", todolistID: string) => void
}

export const Todolist = React.memo((props: PropsType) => {

    const addTasks = useCallback((title: string) => {
        props.addTasks(title, props.id)
    }, [props.addTasks, props.id])
    const newTitleTodolist =  useCallback((newTitle: string) => {
        props.newTitleTodolist(newTitle, props.id)
    },[props.newTitleTodolist,props.id])


    const buttonOnClickFilterAll = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter,props.id])
    const buttonOnClickFilterActive = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter,props.id])
    const buttonOnClickFilterCompleted = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter,props.id])

    let tasksForTodolists = props.tasks

    if (props.filter === 'completed') {
        tasksForTodolists = props.tasks.filter(t => t.isDone)
    }
    if (props.filter === 'active') {
        tasksForTodolists = props.tasks.filter(t => !t.isDone)
    }


    return <div style={{margin:'20px'}}>
        <h3>
            <EditableSpan onChange={newTitleTodolist} title={props.title}/>
            <DeleteSweep color="disabled" onClick={() => {props.removeTodolist(props.id)}}>x</DeleteSweep>
        </h3>

        <AddItemForm addTitle={addTasks}/>


        <div style={{paddingTop: '20px'}}>
            <ButtonGroup color="primary" size="small" aria-label="small primary button group">
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} color="primary"
                        onClick={buttonOnClickFilterAll}>All</Button>
                <Button variant={props.filter === 'active' ? 'contained' : 'text'} color="primary"
                        onClick={buttonOnClickFilterActive}>Active</Button>
                <Button variant={props.filter === 'completed' ? 'contained' : 'text'} color="primary"
                        onClick={buttonOnClickFilterCompleted}>Completed</Button>
            </ButtonGroup>
        </div>

        <ul>
            {
                tasksForTodolists.map(t => {
                    return <Tasks
                        key={t.id}
                        task={t}
                        todolistID={props.id}
                       removeTask={props.removeTask}
                        changeTaskStatus={props.changeTaskStatus} newTitleTask={props.newTitleTask}/>
                })
            }
        </ul>

    </div>
})
