import {TasksStateType} from "../App";
import {
    addTasksAC,
    changeTaskStatusAC,
    removeTaskAC,
    tasksReducer,
    newTitleTaskAC,
} from "./tasks-reducer";
import {  RemoveTodolistAC} from "./todolists-reducer";

let startState:TasksStateType

beforeEach( () =>{
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    };
})


test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");


    const endState = tasksReducer(startState, removeTaskAC("2", "todolistId2"))

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "3", title: "tea", isDone: false}
        ]
    });
})


test('correct task should be added to correct array', () => {


    const action = addTasksAC("juce", "todolistId2");


    const endState = tasksReducer(startState, addTasksAC("juce", "todolistId2"))

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][1].title).toBe("bread");
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].isDone).toBe( false);
})


test('status of specified task should be changed', () => {


    const action = changeTaskStatusAC("2", false, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].isDone).toBe(false);
});


test('title of specified task should be changed', () => {


    const action = newTitleTaskAC("MUMO", "todolistId2","3" );

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][2].title).toBe("MUMO");

});

test('property with todolistId should be deleted', () => {


    const action   = RemoveTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

