import React, {useEffect, useState} from 'react'
import {TasksAPI} from "../api/tasks-api";

export default {
    title: 'API-13/TASKS'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '6f565eaa-cae0-4010-9588-f070d4bc5b19'
        TasksAPI.getTasks(todolistId)
            .then( (res) =>{

                setState(res.data.items.map(t=>t.title))
            })

    }, [])
    return <div> {JSON.stringify(state)}</div>
}


export const CreateTask = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        let todolistId = '6f565eaa-cae0-4010-9588-f070d4bc5b19'
        let title = 'LitrBoll'
        TasksAPI.createTask(todolistId,title)
            .then( (res) =>{
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTask = () => {

    const [state, setState] = useState<any>(null)
    let todolistId = '6f565eaa-cae0-4010-9588-f070d4bc5b19'
    let taskId = '80a92882-d56e-4eff-8fc9-2362d36d6472'
    let title = 'Foly-Voley'
    useEffect(() => {
        TasksAPI.updateTask(todolistId,taskId,title)
            .then( (res) =>{
                debugger
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    let todolistId = '6f565eaa-cae0-4010-9588-f070d4bc5b19'
    let taskId = '5f7ada79-9eff-4591-aa75-267f4205fc73'
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TasksAPI.deleteTask(todolistId,taskId)
            .then( (res) =>{
                debugger
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
