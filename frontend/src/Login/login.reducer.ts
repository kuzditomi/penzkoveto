import { AppState, IUserData } from './../app.reducer';
import { tokenValidateActions, ACTION_TOKEN_VALIDATE_ERROR } from '../token-validate.actions';
import { ACTION_TOKEN_VALIDATE_SUCCESS } from './../token-validate.actions';
import { tokenStorageKey } from '../api';

export function userReducer(state: AppState, action: tokenValidateActions): IUserData {
    switch (action.type) {
        case ACTION_TOKEN_VALIDATE_SUCCESS:
            localStorage.setItem(tokenStorageKey, action.token);

            return {
                ...state.user,
                isLoggedIn: true,
                error: undefined,
            };
        case ACTION_TOKEN_VALIDATE_ERROR:
            return {
                ...state.user,
                isLoggedIn: false,
                error: action.error
            }
    }

    return state.user;
}

export function defaultUserState(): IUserData {
    return {
        isLoggedIn: 'loading',
        error: undefined
    };
}
