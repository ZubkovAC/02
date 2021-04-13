import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API-13'
}

const settings = {
    withCredentials:true,
    headers: {
        'API-KEY': 'b3721dee-f7d9-448c-a293-e8087db0634c'
    }
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists',settings)

           .then( (res) =>{
               setState(res.data)
           })

    }, [])
    return <div> {JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)
    let title = 'Good morning'
    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',{title:'Good morning'},settings)
            .then( (res) =>{
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}


export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null)
        let todolistID = '65374317-7cc9-4b50-b25f-25c38ab37c1b'
        useEffect(() => {
            axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`,settings)
                .then( (res) =>{
                    setState(res.data)
                })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}


export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    let todolistID = '3d0eaad5-4a4f-4b25-83cd-eb981467e86a'
    let title = 'RikitiTavi'
    useEffect(() => {
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`,{title:'RikitiTavi'},settings)
            .then( (res) =>{
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
