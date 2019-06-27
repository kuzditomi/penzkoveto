import { Action } from "redux";
import api, { tokenStorageKey } from "./api";

export const ACTION_TOKEN_VALIDATE_SUCCESS = 'TOKEN_VALIDATE_SUCCESS';
export const ACTION_TOKEN_VALIDATE_ERROR = 'TOKEN_VALIDATE_ERROR';

export interface IActionTokenValidateSuccess extends Action {
    type: 'TOKEN_VALIDATE_SUCCESS',
    token: string
}

export interface IActionTokenValidateError extends Action {
    type: 'TOKEN_VALIDATE_ERROR',
    error?: string
}

export type tokenValidateActions = IActionTokenValidateSuccess | IActionTokenValidateError;

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
                .then((userData) => {
                    dispatch(dispatchTokenSuccess(storedToken));
                    // dispatch(dispatchUserData(userdata));
                })
                .catch((error) => {
                    dispatch(dispatchTokenFailed(error));
                });
        } else {
            dispatch(dispatchTokenFailed(undefined));
        }
    };
}