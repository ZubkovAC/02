import axios from "axios";


const instance = axios.create({
    baseURL:"https://social-network.samuraijs.com/api/1.1",
    withCredentials:true,
    headers:{
        'API-KEY': 'b3721dee-f7d9-448c-a293-e8087db0634c'
    }
})

export type Task ={
    id:string,
    title: string,
    description: null,
    todoListId: string,
    order: number
}

export type ResonceTasks< T = []>  = {
    items:T
    fieldsErrors: []
    messages: []
    resultCode: number
    __proto__: Object
}

export const TasksAPI ={
    getTasks(todolistId:string){
        return instance.get<ResonceTasks<Task[]>>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId:string,title:string){
        return instance.post(`/todo-lists/${todolistId}/tasks`,{title})
    },
    updateTask(todolistId:string,taskId:string,title:string){
        return instance.put<ResonceTasks<Task>>(`/todo-lists/${todolistId}/tasks/${taskId}`,{title})
    },
    deleteTask(todolistId:string,taskId:string){
        return instance.delete<ResonceTasks<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`,)
    },
}