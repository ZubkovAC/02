import {Dispatch} from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {authAPI, LoginParamsType} from "../../api/authAPI";


const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialAuthStateType = initialState, action: ActionsAuthType): InitialAuthStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

// AC
export const setIsLogged = (value: boolean) => ({type: "login/SET-IS-LOGGED-IN", value} as const)
// TC
export const loginTC = (data:LoginParamsType) => (dispatch: Dispatch<ActionsAuthType>) => {
    dispatch(setAppStatusAC('loading'))
    return authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLogged(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })

}
export const logoutTC = () => (dispatch: Dispatch<ActionsAuthType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLogged(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


// Types
type InitialAuthStateType = typeof initialState

export type SetIsLogged = ReturnType<typeof setIsLogged>

export type ActionsAuthType =
    | SetIsLogged
    | SetAppStatusActionType
    | SetAppErrorActionType