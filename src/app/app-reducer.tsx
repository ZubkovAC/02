

const initialState ={
    status:'loading' as RequestStatusType,
    error:'ERROR'  as null | string
}

export type InitialAppStateType = typeof initialState


export const appReducer = (state:InitialAppStateType = initialState, action: ActionAppType):InitialAppStateType=>{
    switch (action.type) {
        case "APP/SET-STATUS":{
            return {...state,status:action.status}
        }
        case "APP/SET-ERROR":{
            return {...state,error: action.error}
        }
        default:
            return state
    }
}


// AC

export const setAppStatusAC = (status:RequestStatusType) => ( { type:'APP/SET-STATUS', status}as const)
export const setAppErrorAC = (error:string | null ) => ( { type:'APP/SET-ERROR', error}as const)





// Type

export type ActionAppType =
    SetAppStatusAC |
    SetAppErrorAC

export type SetAppStatusAC = ReturnType<typeof setAppStatusAC>
export type SetAppErrorAC = ReturnType<typeof setAppErrorAC>


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'