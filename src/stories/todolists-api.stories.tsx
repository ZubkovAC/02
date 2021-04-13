import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolists-api";

export default {
    title: 'API-13'
}

const settings = {
    withCredentials:true,
    headers: {
        'API-KEY': 'b3721dee-f7d9-448c-a293-e8087db0634c'
    }
}
// old axios

// export const GetTodolists = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists',settings)
//
//            .then( (res) =>{
//                setState(res.data)
//            })
//
//     }, [])
//     return <div> {JSON.stringify(state)}</div>
// }
//
//
// export const CreateTodolist = () => {
//
//     const [state, setState] = useState<any>(null)
//     let title = 'Good morning'
//     useEffect(() => {
//         axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',{title:'Good morning'},settings)
//             .then( (res) =>{
//                 setState(res.data)
//             })
//     }, [])
//     return <div> {JSON.stringify(state)}</div>
// }

// new axios

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
