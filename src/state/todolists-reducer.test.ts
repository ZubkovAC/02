import {
    ChangeTodolistsFiltersActionType,
    todolistsReducer,
    AddTodolistsAC,
    AddTodolistsActionType
} from './todolists-reducer';
import {v1} from 'uuid';
import {TasksStateType, TodolistsType} from '../App';
import {tasksReducer} from "./tasks-reducer";

let todolistId1 :string
let todolistId2 :string

let startState: Array<TodolistsType> = []

beforeEach(()=>{

    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, { type: 'REMOVE-TODOLIST', id: todolistId1})
    //const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    let todolistID5=v1()

    const endState = todolistsReducer(startState, { type: 'ADD-TODOLIST',todolistID3: todolistID5, title: newTodolistTitle})
    //const endState1 = todolistsReducer(startState,AddTodolistslistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe('all');
});


test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,                          // fix action 1
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todolistsReducer(startState, action);               // fix action 1
    //const endState1 = todolistsReducer(startState, ChangeTodolistsTitlestAC(todolistId2,newTodolistTitle))

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {

    let newFilter:  "all" | "completed" | "active" = "completed";

    const action :ChangeTodolistsFiltersActionType = {                               // fix action 2
        type: 'CHANGE-TODOLIST-FILTER' ,
        id: todolistId2,
        filter: newFilter
    };

    const endState = todolistsReducer(startState, action);                   // fix action 2
    //const endState1 = todolistsReducer(startState, ChangeTodolistsFiltersTitlestAC(todolistId2,newFilter));                   // fix action 2

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
    let todolistID5=v1()
    const action : AddTodolistsActionType = AddTodolistsAC(todolistID5,"new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
