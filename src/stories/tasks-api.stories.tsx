import React, {useEffect, useState} from 'react'
import {TasksAPI} from "../api/tasks-api";

export default {
    title: 'API-13/TASKS'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>('6f565eaa-cae0-4010-9588-f070d4bc5b19')


    const todolistId = (e: any) => {
        setTodolistID(e)
    }

    const getTasks = () => {
        TasksAPI.getTasks(todolistID)
            .then((res) => {

                setState(res.data.items.map(t => t.title))
            })
    }

    useEffect(() => {
    }, [])
    return <div>
        <div>
            <input type="text" value={todolistID} onChange={e => todolistId(e.currentTarget.value)}/>
        </div>
        <button onClick={getTasks}>GetTasks</button>

        <div>
            {JSON.stringify(state)}
        </div>
    </div>
}


export const CreateTask = () => {

    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [todolistID, setTodolistID] = useState<string>('')

    const createTitle = (e: any) => {
        setTaskTitle(e)
    }
    const todolistId = (e: any) => {
        setTodolistID(e)
    }
    const createTask = () => {
        TasksAPI.createTask(todolistID, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }


    return <div>
        <div>
            <h3>taskTitle:</h3><input type="text" value={taskTitle} onChange={e => createTitle(e.currentTarget.value)}/>
        </div>
        <div>
            <h3>todolistID:</h3> <input type="text" value={todolistID}
                                        onChange={e => todolistId(e.currentTarget.value)}/>
        </div>

        <button onClick={createTask}>create</button>


        {JSON.stringify(state)}</div>
}

export const UpdateTask = () => {

    const [state, setState] = useState<any>(null)

    let todolistId = '6f565eaa-cae0-4010-9588-f070d4bc5b19'
    let taskId = '80a92882-d56e-4eff-8fc9-2362d36d6472'
    let title = 'Foly-Voley'
    useEffect(() => {
        TasksAPI.updateTask(todolistId, taskId, title)
            .then((res) => {
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
        TasksAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                debugger
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
