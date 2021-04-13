import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolists-api";

export default {
    title: 'API-13/TODOLISTS'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then( (res) =>{

                setState(res.data.map(t=>t.title))
            })

    }, [])
    return <div> {JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)
    let title = '-option-'
    useEffect(() => {
        todolistAPI.createTodolist(title)
            .then( (res) =>{

                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}



export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null)
    let todolistID = "74e0293b-c08b-46f1-a2d0-d526ea9195f7"
        useEffect(() => {
            todolistAPI.deleteTodolist(todolistID)
                .then( (res) =>{

                    setState(res.data)
                })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}


export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    let todolistID = "28947180-fc51-4816-b06e-a40f5909661a"
    let title = '=-oleni-='
    useEffect(() => {
        todolistAPI.updateTodolist(todolistID,title)
            .then( (res) =>{
                debugger
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
