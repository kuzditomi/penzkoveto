import { Action } from "redux";
import api, { tokenStorageKey } from "./api";
import { IUserInfo } from "./app.reducer";

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
        const storedToken = localStorage.getItem(tokenStorageKey);
        if (storedToken) {
            api.get('account/me')
                .then((response) => {
                    if (response.status === 200) {
                        return response.data;
                    }

                    throw response.status;
                })
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