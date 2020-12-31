import { createReducer } from 'typesafe-actions';
import { AuthActions, IErrorResponse, LogInFailAction, 
    LogInStartAction, LogInSuccessAction, 
    LogoutAction, 
    SetAuthRedirectPath, 
    SignUpFailAction, SignUpStartAction, 
    SignUpSuccessAction } from './AuthActionCreators';
import * as actions from './AuthActionTypes';

export interface IReduxAuthState {
    token: string,
    userId: string,
    error: IErrorResponse | null,
    loading: boolean,
    authRedirectPath: string
}

const initialState = () : IReduxAuthState =>  {
    const output = {
        token: '',
        userId: '',
        error: null,
        loading: false,
        authRedirectPath: '/'
    };
    return output;
}

const authStartHandler = (state: IReduxAuthState, action: LogInStartAction): IReduxAuthState => {
    return {
        ...state,
        error: null,
        loading: true
    };
}

const authSuccessHandler = (state: IReduxAuthState, action: LogInSuccessAction): IReduxAuthState => {
    return {
        ...state,
        loading: false,
        token: action.payload.authData.idToken,
        userId: action.payload.authData.localId,
        error: null
    };
}

const authFailHandler = (state: IReduxAuthState, action: LogInFailAction): IReduxAuthState => {
    return {
        ...state,
        error: action.payload.error,
        loading: false
    }
}

const setAuthRedirectPathHandler = (state: IReduxAuthState, action: SetAuthRedirectPath): IReduxAuthState => {
    return {
        ...state,
        authRedirectPath: action.payload.path,
    }
}

const registerStartHandler = (state: IReduxAuthState, action: SignUpStartAction): IReduxAuthState => {
    return state;
}

const registerSuccessHandler = (state: IReduxAuthState, action: SignUpSuccessAction): IReduxAuthState => {
    return state;
}

const registerFailHandler = (state: IReduxAuthState, action: SignUpFailAction): IReduxAuthState => {
    return state;
}

const logoutHandler = (state: IReduxAuthState, action: LogoutAction): IReduxAuthState => {
    return {
        ...state,
        token: '',
        userId: ''
    };
}

const authReducer = createReducer<IReduxAuthState, AuthActions>(initialState())
    .handleType(actions.AUTH_START, (state, action) => authStartHandler(state, action))
    .handleType(actions.AUTH_SUCCESS, (state, action) => authSuccessHandler(state, action))
    .handleType(actions.AUTH_FAIL, (state, action) => authFailHandler(state, action))
    .handleType(actions.REGISTER_START, (state, action) => registerStartHandler(state, action))
    .handleType(actions.REGISTER_SUCCESS, (state, action) => registerSuccessHandler(state, action))
    .handleType(actions.REGISTER_FAIL, (state, action) => registerFailHandler(state, action))
    .handleType(actions.LOGOUT, (state, action) => logoutHandler(state, action))
    .handleType(actions.SET_AUTH_REDIRECT_PATH, (state, action) => setAuthRedirectPathHandler(state, action));

export default authReducer;