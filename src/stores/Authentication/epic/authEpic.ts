import { map, mergeMap, catchError } from 'rxjs/operators'
import { of } from 'rxjs'

import {ActionsObservable, combineEpics, ofType} from 'redux-observable'
import _ from 'lodash';

import { actions } from '../action/actions';
import GHNAPI from '../api';
import { Login, LoginType } from "../types";

const loginUserT62Epic= (action$: ActionsObservable<any>)=>
    action$.pipe(
        ofType<Login>(LoginType.start),
        map(action => action.payload),
        mergeMap(({ authorcode }) => 
            GHNAPI.loginApi(authorcode).pipe(
                map( ({data}) => {
                    const response = data;
                    switch (response.status) {
                        case 'OK':{
                            const { userInfo, session = '', hubId = [] } = response.data[0]
                            if(userInfo.hasOwnProperty('roles')){
                                let roles = userInfo.roles
                                let isDriverPermission = true
                                const { 
                                    profile = {
                                        email: '',
                                        fullname: '',
                                        phone:'',
                                    },
                                    ssoId = ''
                                } = userInfo
                                if(isDriverPermission) {
                                    return actions.loginSuccess({ 
                                        email: profile.email,
                                        hubId: "2294", 
                                        token: session ?? '', 
                                        username: profile.fullname,
                                        roles: roles?.[0]?.permissionList ?? [],
                                        ssoId: ssoId
                                })
                                } else return actions.loginError('Bạn không có quyền thao tác')

                            } else return actions.loginError('Bạn không có quyền thao tác');}
                        case 'NOT_FOUND':
                            return actions.loginError('SERVICE NOT FOUND')
                        default:
                            return actions.loginError(response.message);
                    }
                }),
                catchError(error => 
                    of(actions.loginError(error.message))
                )
            )
        )
    )

// const logoutUserAlertEpic = action$ =>{
//     return action$.pipe(
//         ofType(LOGOUT_USER),
//         filter(action => action.payload.message !== undefined),
//         tap(action => {
//             EventEmitter.emit(Constants.EmitCode.ShowToast);
//             EventEmitter.emit(Constants.EmitCode.UpdateDataToast,{isSuccess: true, content: action.payload.message});
//         }),
//         ignoreElements()
//     )
// }

// const logoutUser = action$ =>
//     action$.pipe(
//         ofType(LOGOUT_USERT62),
//         mergeMap(() => {
//           return of(logoutUserT62('Đăng xuất thành công'))
//             // return GHNAPI.logout().pipe(
//             //     map(() => {
//             //         return logoutUserT62('Đăng xuất thành công')
//             //     }),
//             //     catchError(error => of(logoutUserFail(error.message)))
//             // )
//         })
//     )

// const autoReloadEpic = (action$, state$) =>
//     action$.pipe(
//         ofType(LOGIN_USER_SUCCESS),
//         mergeMap(() => {
//             let reset = false 
//             if(state$.value && state$.value.auth.userId !== state$.value.pd.userId) {
//                 reset = true
//             }

//             return of(pdListFetch({all: reset, reset}))
//         })
//     )

export default combineEpics(
    loginUserT62Epic,
    // autoReloadEpic,
    // // logoutUserAlertEpic,
    // logoutUser
);
