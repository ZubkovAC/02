import {TodolistsType, TasksStateType} from "../App";
import {v1} from 'uuid';
import {AddTodolistsActionType, RemoveTodolistActionType} from "./todolists-reducer";


export const inicialStateTask: TasksStateType  = {}
export type InicialStateTask = typeof inicialStateTask

export const tasksReducer = (state: InicialStateTask = inicialStateTask, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "ADD-TASKS":
            let newTasks = {id: v1(), title: action.newTitle, isDone: false}
            return {
                ...state,
                [action.todolistID]: [newTasks, ...state[action.todolistID]]
            }

        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.id)
            }
        case "CHANGE-TASKS-STATUS":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.idTask ? {
                    ...t,
                    isDone: action.newIsDone
                } : t)
            }

        case "CHANGE-TASKS-TITLE":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.id ? {
                    ...t,
                    title: action.newtitle
                } : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistID3]: []
            }
        case "REMOVE-TODOLIST":
            let CopyState = {...state}
            delete CopyState[action.id]
            return CopyState
        default:
            return state
    }
}


export const addTasksAC = (newTitle: string, todolistID: string) =>
    ({type: 'ADD-TASKS', newTitle, todolistID} as const)
export const removeTaskAC = (id: string, todolistID: string) =>
    ({type: 'REMOVE-TASK', id, todolistID} as const)
export const changeTaskStatusAC = (idTask: string, newIsDone: boolean, todolistID: string) =>
    ({type: 'CHANGE-TASKS-STATUS', idTask, newIsDone, todolistID} as const)
export const newTitleTaskAC = (newtitle: string, todolistID: string, id: string) =>
    ({type: 'CHANGE-TASKS-TITLE', newtitle, todolistID, id} as const)

type ActionsType =
    AddTasksType
    | RemoveTaskType
    | ChangeTaskStatusType
    | NewTitleTaskType
    | AddTodolistsActionType
    | RemoveTodolistActionType

export type AddTasksType = ReturnType<typeof addTasksAC>
export type RemoveTaskType = ReturnType<typeof removeTaskAC>
export type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
export type NewTitleTaskType = ReturnType<typeof newTitleTaskAC>


