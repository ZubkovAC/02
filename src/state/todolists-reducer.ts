import {TodolistsType} from "../App";
import {v1} from 'uuid';

type ActionsType = RemoveTodolistActionType
    | AddTodolistsActionType
    | ChangeTodolistsTitlesActionType
    | ChangeTodolistsFiltersActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistsActionType = {
    type: 'ADD-TODOLIST'
    title:string
}
export type ChangeTodolistsTitlesActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id:string
    title:string
}
export type ChangeTodolistsFiltersActionType= {
    type: 'CHANGE-TODOLIST-FILTER'
    id:string
    filter: "all" | "completed" | "active"
}

export const todolistsReducer = (state: TodolistsType[], action:ActionsType):TodolistsType[] =>{
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST':{
            let todolistID3=v1()
            let newTodolist:TodolistsType = {id:todolistID3, title:action.title, filter:'all'}
            return [...state,newTodolist]
            }
        case 'CHANGE-TODOLIST-TITLE':{
            let todolist = state.find(t=>t.id===action.id)
            if (todolist)
                todolist.title=action.title
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER':{
            let filterTask=  state.find(t=>t.id===action.id)
            if (filterTask)
                filterTask.filter=action.filter
            return [...state]
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodolistAC = (id: string) :RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST',id}
}
export const AddTodolistslistAC = (title:string):AddTodolistsActionType => {
    return {type: 'ADD-TODOLIST',title}
}
export const  ChangeTodolistsTitlestAC = (id:string,title:string):ChangeTodolistsTitlesActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE',id,title}
}
export const  ChangeTodolistsFiltersTitlestAC = (id:string,filter:"all" | "completed" | "active") :ChangeTodolistsFiltersActionType=> {
    return {type: 'CHANGE-TODOLIST-FILTER',id,filter}
}