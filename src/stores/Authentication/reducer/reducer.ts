import { AuthAction, AuthState, LoginType, LogoutType } from "../types";


const defaultState: AuthState = {
    loading: false,
    error: '',
    username: '',
    token: '',
    hubId: '',
    roles: [],
    ssoId: ""
};
const authentication = (state: AuthState = defaultState, action: AuthAction):AuthState =>  {
    switch (action.type) {
        case LoginType.start:
            // const n= action.payload.data
            return {
                ...state,
                error: '',
                loading: true
            };
        case LoginType.success:
            return {
                ...state,
                roles: action.payload.data.roles,
                token: action.payload.data.token,
                hubId: action.payload.data.hubId,
                username: action.payload.data.username,
                ssoId: action.payload.data.ssoId,
                loading: false
            };
        case LoginType.error:
            return {
                ...state,
                error: action.payload.message,
                loading: false
            };
        case  LogoutType.start:
            return state;
        default:
            return state;
    }
}

export default authentication;