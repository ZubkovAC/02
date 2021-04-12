import {Provider} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {combineReducers, createStore} from "redux";
import { tasksReducer } from "../../state/tasks-reducer";
import {todolistsReducer} from "../../state/todolists-reducer";
import { v1 } from "uuid";

export const DecoratorReducer = combineReducers({
    tasks:tasksReducer,
    todolists:todolistsReducer
})

export const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ],
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
}


export const DecoratorStore = createStore(DecoratorReducer, initialGlobalState as AppRootStateType);


export const withThemeProvider = (storyfn:any) => <Provider store={DecoratorStore}>{storyfn()}</Provider>

