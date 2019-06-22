import { AppState } from './../app.reducer';
import { tokenValidateActions, ACTION_TOKEN_VALIDATE_ERROR } from '../token-validate.actions';
import { ACTION_TOKEN_VALIDATE_SUCCESS } from './../token-validate.actions';
import { tokenStorageKey } from '../api';

export function isLoggedInReducer(state: AppState, action: tokenValidateActions): Loading<boolean> {
    switch (action.type) {
        case ACTION_TOKEN_VALIDATE_SUCCESS:
            localStorage.setItem(tokenStorageKey, action.token);

            return true;
        case ACTION_TOKEN_VALIDATE_ERROR:
            return false;
    }

    return state.isLoggedIn;
}

export function defaultIsLoggedInState(): Loading<boolean> {
    return 'loading';
}
