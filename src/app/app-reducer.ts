import {SetIsLogged, setIsLogged} from "../features/Login/auth-reducer";
import {ThunkDispatch} from "redux-thunk";
import {authAPI} from "../api/authAPI";

const initialState: InitialAppStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialAppStateType = initialState, action: ActionsAppType): InitialAppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/AUTH-STATUS':
            return {...state, isInitialized: action.isInitialized}
        default:
            return {...state}
    }
}

//AC

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/AUTH-STATUS', isInitialized} as const)


//TC
export const initializeAppTC = () => (dispatch: ThunkDispatch<InitialAppStateType, unknown, ActionsAppType | SetIsLogged>) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLogged(true));
            }
        })
        .finally(()=>dispatch(setIsInitializedAC(true)))
}

// Types
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetIsInitializedAC = ReturnType<typeof setIsInitializedAC>

type ActionsAppType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetIsInitializedAC

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialAppStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}