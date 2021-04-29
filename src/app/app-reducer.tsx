

const initialState ={
    status:'loading' as RequestStatusType
}

export type InitialAppStateType = typeof initialState


export const appReducer = (state:InitialAppStateType = initialState, action: ActionAppType):InitialAppStateType=>{
    switch (action.type) {
        case "APP/SET-STATUS":{
            return {...state,status:action.status}
        }
        default:
            return state
    }
}


// AC
export const setAppStatusAC = (status:RequestStatusType) => ( { type:'APP/SET-STATUS', status}as const)





// Type


export type ActionAppType = SetAppStatusAC

export type SetAppStatusAC = ReturnType<typeof setAppStatusAC>


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'