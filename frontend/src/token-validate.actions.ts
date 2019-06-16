import { Action } from "redux";

export const tokenStorageKey = 'auth_token';

export const ACTION_TOKEN_VALIDATE_SUCCESS = 'TOKEN_VALIDATE_SUCCESS';
export const ACTION_TOKEN_VALIDATE_ERROR = 'TOKEN_VALIDATE_ERROR';

export interface IActionTokenValidateSuccess extends Action {
    type: 'TOKEN_VALIDATE_SUCCESS',
    token: string
}

export interface IActionTokenValidateError extends Action {
    type: 'TOKEN_VALIDATE_ERROR'
}

export type tokenValidateActions = IActionTokenValidateSuccess | IActionTokenValidateError;

export function dispatchTokenFailed(): IActionTokenValidateError {
    return {
        type: ACTION_TOKEN_VALIDATE_ERROR
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
            fetch('https://localhost:5001/api/account/me', {
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            })
                .then((response) => {
                    if(response.status === 200){
                        return response.json();
                    }
                    
                    throw response.status;
                })
                .then((userData) => {
                    dispatch(dispatchTokenSuccess(storedToken));
                    // dispatch(dispatchUserData(userdata));
                })
                .catch(() => {
                    dispatch(dispatchTokenFailed());
                });
        } else {
            dispatch(dispatchTokenFailed());
        }
    };
}