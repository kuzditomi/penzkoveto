import { Action } from "redux";
import { isLoggedInReducer, defaultIsLoggedInState } from "./Login/login.reducer";

export interface AppState {
    isLoggedIn: Loading<boolean>
}

export function appReducer(state: AppState = defaultState(), action: Action) {
    return {
        isLoggedIn: isLoggedInReducer(state, action)
    };
}

export function defaultState(): AppState {
    return {
        isLoggedIn: defaultIsLoggedInState()
    };
}