import React, {ChangeEvent, useCallback} from "react";
import {Checkbox} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {DeleteSweep} from "@material-ui/icons";
import { TaskType } from "./AppWithRedux";
import {log} from "util";

export type TasksPropsType = {
    task:TaskType
    todolistID:string
    removeTask: (id:string,todolistID:string) =>void
    changeTaskStatus: (id:string,cheked:boolean,todolistID:string)=>void
    newTitleTask: (title:string,todolistID:string,id:string)=>void
}

export const Tasks =  React.memo((props:TasksPropsType) =>{
     // console.log('Хуяcka')
    // Хуяска
        const taskPosition = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistID)
    }
        const newTitleTask =useCallback( (title: string) => {
            props.newTitleTask(title, props.todolistID, props.task.id)
        },[props.newTitleTask,props.todolistID, props.task.id])

        return <div key={props.task.id}>

            <Checkbox style={{color: 'navy'}} onChange={taskPosition} checked={props.task.isDone}/>
            <EditableSpan onChange={newTitleTask} title={props.task.title}/>

            <DeleteSweep style={{marginTop: '5px'}} color="disabled" onClick={() => {
                props.removeTask(props.task.id, props.todolistID)
            }}>x</DeleteSweep>
        </div>

})