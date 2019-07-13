import { Action } from "redux";
import { IUserInfo } from "./app.reducer";
import { Repository } from './Shared/Repository/Repository';

export const ACTION_TOKEN_VALIDATE_SUCCESS = 'TOKEN_VALIDATE_SUCCESS';
export const ACTION_TOKEN_VALIDATE_ERROR = 'TOKEN_VALIDATE_ERROR';
export const ACTION_USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';

export interface IActionTokenValidateSuccess extends Action {
    type: 'TOKEN_VALIDATE_SUCCESS',
    token: string
}

export interface IActionTokenValidateError extends Action {
    type: 'TOKEN_VALIDATE_ERROR',
    error?: string
}

export interface IActionUserInfoSuccess extends Action {
    type: 'USER_INFO_SUCCESS',
    userInfo: IUserInfo
}


export type tokenValidateActions = IActionTokenValidateSuccess | IActionTokenValidateError | IActionUserInfoSuccess;

export function dispatchTokenFailed(error?: string): IActionTokenValidateError {
    return {
        type: ACTION_TOKEN_VALIDATE_ERROR,
        error
    };
}

export function dispatchTokenSuccess(token: string): IActionTokenValidateSuccess {
    return {
        type: ACTION_TOKEN_VALIDATE_SUCCESS,
        token
    };
}

function dispatchUserInfo(userInfo: IUserInfo): IActionUserInfoSuccess {
    return {
        type: ACTION_USER_INFO_SUCCESS,
        userInfo
    };
}

export function loadUser() {
    return (dispatch: any) => {
        
        const storedToken = Repository.Instance.GetToken();
        if (storedToken) {
            Repository.Instance.GetUserInfo()
                .then((userinfo: IUserInfo) => {
                    dispatch(dispatchTokenSuccess(storedToken));
                    dispatch(dispatchUserInfo(userinfo));
                })
                .catch((error) => {
                    dispatch(dispatchTokenFailed(error));
                });
        } else {
            dispatch(dispatchTokenFailed(undefined));
        }
    };
}