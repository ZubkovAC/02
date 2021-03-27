
export type StateType = {
    name:string
    age:number
    childrenCount:number
}


 export const userReducer = (state:StateType,action:ActionType):StateType=>{
    switch (action.type) {
        case "INC-AGE":
            return {
                ...state,
                age:state.age+1}
        case "INC-CHILDREN":
            return {
                ...state,
                childrenCount:state.childrenCount+1}
        case "CHANGE-NAME":
            return {
                ...state,
                name:action.newName
            }
        default:
            throw new Error("I don't understand this type")                 // only for UniTest reducer
    }
 }


 export const incAge = ()=>({type:'INC-AGE'}as const)
 export const incChildrenCount = ()=>({type:'INC-CHILDREN'}as const)
export const changeName = (newName:string) => ({type:'CHANGE-NAME',newName}as const)

export type IncAge = ReturnType<typeof incAge>
export type IncChildrenCount = ReturnType<typeof incChildrenCount>
export type ChangeName = ReturnType<typeof changeName>
export type ActionType = IncAge | IncChildrenCount | ChangeName