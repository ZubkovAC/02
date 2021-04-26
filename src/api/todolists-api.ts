import axios from 'axios'


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        'API-KEY': 'b3721dee-f7d9-448c-a293-e8087db0634c'
    }
})

export type TodolistResponseType= {
    addedDate: string
    id: string
    order: number
    title: string
}
type ResponseType < T = {} > ={
    data: T
    fieldsErrors: []
    messages: Array<string>
    resultCode: number
}


export const todolistAPI = {
    getTodolists(){
        return instance.get<TodolistResponseType[]>(`/todo-lists/`)
    },
    createTodolist(title:string){
        return instance.post<ResponseType<{ item: TodolistResponseType}>>(`/todo-lists/`,{title:title})
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title:title})
    },
    deleteTodolist(todolistId:string){
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    }
}
