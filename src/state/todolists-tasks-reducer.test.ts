import {TasksType, TodolistsType} from "../App";
import {tasksReducer} from "./tasks-reducer";
import {AddTodolistsAC, todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";

test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: Array<TodolistsType> = [];

    let todolistID3=v1()
    const action = AddTodolistsAC(todolistID3,"new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistID3);
    expect(idFromTodolists).toBe(action.todolistID3);
});
