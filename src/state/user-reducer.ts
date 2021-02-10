
type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}
type ActionType2 = {
    type: string
    [key: string]: any
    name:string
}

export const userReducer = (state:StateType, action:ActionType | ActionType2):StateType =>{
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {
                ...state,
                age : state.age += 1
            }

        case 'INCREMENT-CHILDREN-COUNT':
            return {
                ...state,
                childrenCount : state.childrenCount += 1
            }

        case 'CHANGE-NAME':
            return {
                ...state,
                name : action.name
            }

        default:
            throw new Error("I don't understand this type")
    }
}