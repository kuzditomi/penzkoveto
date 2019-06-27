import { Action } from "redux";
import { userReducer, defaultUserState } from "./Login/login.reducer";

export interface IUserData{
    isLoggedIn: Loading<boolean>;
    error: string | undefined;
}

export interface AppState {
    user: IUserData;
}

export function appReducer(state: AppState = defaultState(), action: Action) {
    return {
        user: userReducer(state, action)
    };
}

export function defaultState(): AppState {
    return {
        user: defaultUserState()
    };
}