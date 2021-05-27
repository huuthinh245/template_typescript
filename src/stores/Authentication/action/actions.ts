import { Login, LoginError, LoginSuccess, LoginType, LogoutType, UserData } from "../types"


const login = ({ authorcode = "" }: { authorcode: string }):Login => ({
    type: LoginType.start,
    payload: {
      authorcode: authorcode
    }
})

const loginSuccess = ( userInfo: UserData): LoginSuccess => ({
    type: LoginType.success,
    payload: {
      data: userInfo
    }
})

const loginError = (message: string = ''): LoginError => ({
    type: LoginType.error,
    payload: {
        message: message
    }
})

const logout = ({ authorcode}: { authorcode: string }) => ({
    type: LogoutType.start,
    payload: {
      authorCode: authorcode
    }
})

const logoutSuccess = ( userInfo: UserData) => ({
    type: LogoutType.success,
    payload: {
      data: userInfo
    }
})

const logoutError = (message: String) => ({
    type: LogoutType.error,
    payload: {
        message: message
    }
})


const  actions = {
    login,
    loginSuccess,
    loginError,
    logout,
    logoutSuccess,
    logoutError
}


export { actions };