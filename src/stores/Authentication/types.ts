export enum  LoginType  {
    start = 'LOGIN-START',
    success= 'LOGIN-SUCCESS',
    error ="LOGIN-ERROR"
}
export enum LogoutType  {
    start = 'LOGOUT-START',
    success= 'LOGOUT-SUCCESS',
    error ="LOGOUT-ERROR"
}

export interface AuthState {
    loading: boolean;
    error?: string;
    username: string,
    token: string,
    hubId: string,
    roles: Array<string>,
    ssoId: string
}

export interface UserData {
    username:string
    hubId: string
    token: string
    email:string
    roles: Array<string>
    ssoId: string
}
export interface Login {
    type: LoginType.start; payload: { authorcode: string}
}
export interface LoginError {
    type: LoginType.error; payload: { message: string} 
}
export interface LoginSuccess {
    type: LoginType.success; payload: { data: UserData} 
}

export interface Logout {
    type: LogoutType.start; payload: { authorcode: string}
}
export interface LogoutError {
    type: LogoutType.error; payload: { message: string} 
}
export interface LogoutSuccess {
    type: LogoutType.success; payload: { data: UserData} 
}

export type AuthAction   = Login | LoginError | LoginSuccess | Logout | LogoutError | LogoutSuccess