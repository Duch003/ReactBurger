import * as actionTypes from './AuthActionTypes'
import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';
import axios from 'axios';

export const logInStart = () => {
    return action(actionTypes.AUTH_START, {});
}

export const logInSuccess = (authData: ILogInResponse) => {
    return action(actionTypes.AUTH_SUCCESS, {
        authData: authData
    });
}

export const logInFail = (error: IErrorResponse) => {
    return action(actionTypes.AUTH_FAIL, {
        error: error
    });
}

export const signUpStart = () => {
    return action(actionTypes.REGISTER_START, {});
}

export const signUpSuccess = (authData: ISignUpResponse) => {
    return action(actionTypes.REGISTER_SUCCESS, {
        authData: authData
    });
}

export const signUpFail = (error: IErrorResponse) => {
    return action(actionTypes.REGISTER_FAIL, {
        error: error
    });
}

export const setAuthRedirectPath = (path: string) => {
    return action(actionTypes.SET_AUTH_REDIRECT_PATH, {
        path: path
    });
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return action(actionTypes.LOGOUT, {});
}

export const authCheckState = () => {
    return (dispatch: Dispatch) => {
        const token = localStorage.getItem('token');
        if(token === '') {
            dispatch(logout());
        } else {
            let expiriationDate = new Date(localStorage.getItem('expirationDate') as string);
            if(expiriationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                const data: ILogInResponse = {
                    idToken: token as string,
                    email: '',
                    refreshToken: '',
                    expiresIn: expiriationDate.toString(),
                    localId: userId as string,
                    kind: '',
                    registered: true
                }
                dispatch(logInSuccess(data))
                checkLoginTimeout(`${(expiriationDate.getTime() - new Date().getTime())/1000}`);
            } else {
                dispatch(logout());
            }
        }
    }
}
/*interface ILogInResponse {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    kind: string,
    registered: boolean,
}*/

export const logIn = (email: string, password: string) => {
    return (dispatch: Dispatch) => {
        dispatch(logInStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post<ILogInResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBeO4DKl-YOiWVDZ54NQs80ki9drLUfR3A', authData)
        // const authData = {
        //     email: email,
        //     password: password,
        // }
        // authInstance.post<any>('login', authData)
            .then(response => {
                checkLoginTimeout(response.data.expiresIn);
                dispatch(logInSuccess(response.data));
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expirationDate', new Date(new Date().getTime() + (+response.data.expiresIn * 1000)).toString());
                localStorage.setItem('userId', response.data.localId);
            })
            .catch((error) => {
                dispatch(logInFail(error.response.data.error));
            })
        //AIzaSyBeO4DKl-YOiWVDZ54NQs80ki9drLUfR3A
    }
}

export const signUp = (email: string, password: string) => {
    return (dispatch: Dispatch) => {
        dispatch(signUpStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        // const authData = {
        //     email: email,
        //     password: password
        // }
        axios.post<ISignUpResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBeO4DKl-YOiWVDZ54NQs80ki9drLUfR3A', authData)
        //authInstance.post('signup', authData)
            .then(response => {
                dispatch(signUpSuccess(response.data));
            })
            .catch((error) => {
                dispatch(signUpFail(error.response.data.error));
            })
        //AIzaSyBeO4DKl-YOiWVDZ54NQs80ki9drLUfR3A
    }
}

export const checkLoginTimeout = (expiriationTime: string) => {
    return (dispatch: Dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, +expiriationTime)
    }
}

export type LogInSuccessAction = ReturnType<typeof logInSuccess>;
export type LogInFailAction = ReturnType<typeof logInFail> ;
export type LogInStartAction = ReturnType<typeof logInStart>;
export type SignUpSuccessAction = ReturnType<typeof signUpSuccess>;
export type SignUpFailAction = ReturnType<typeof signUpFail> ;
export type SignUpStartAction = ReturnType<typeof signUpStart>;
export type LogoutAction = ReturnType<typeof logout>;
export type SetAuthRedirectPath = ReturnType<typeof setAuthRedirectPath>;

export type AuthActions = LogInSuccessAction
    | LogInFailAction
    | LogInStartAction
    | SignUpSuccessAction
    | SignUpFailAction
    | SignUpStartAction
    | LogoutAction
    | SetAuthRedirectPath;

interface ISignUpResponse {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    kind: string
}

interface ILogInResponse {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    kind: string,
    registered: boolean,
}

interface IGetUserDataResponse {
    kind: string,
    users: IUsersArrayItem[]
}

interface IUsersArrayItem {
    localId: string	        
    email: string	        
    emailVerified: boolean	
    displayName:	string	    
    providerUserInfo: any[]	    
    photoUrl: string	    
    passwordHash: string	
    passwordUpdatedAt: number	
    validSince: string	
    disabled: boolean	
    lastLoginAt: string	
    createdAt: string	
    customAuth: boolean	
}

export interface IErrorResponse {
    code: number,
    errors: {
        mesaage: string,
        domain: string,
        reason: string
    }[],
    message: string
}
