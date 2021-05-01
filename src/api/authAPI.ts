import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'b3721dee-f7d9-448c-a293-e8087db0634c'
    }
})



export const authAPI = {
    login(data:LoginParamsType ) {
        return instance.post<AuthApiType<{userId: number}>>(`auth/login`,data)
    },
    me(){
        return instance.get<AuthApiType>(`auth/me`)
    },
    logout(){
        return instance.delete<AuthApiType<AuthApiMeType>>(`auth/login`)
    }
}

// Types
export type LoginParamsType={
    email:string
    password:string
    rememberMe?:boolean
    captcha?:string
}
export type AuthApiType <D={}>= {
    data: D
    fieldsErrors: []
    messages: []
    resultCode: number
}
export type AuthApiMeType = {
    email: string
    id: number
    login: string
}
