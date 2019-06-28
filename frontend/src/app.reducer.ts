import { Action } from "redux";
import { userReducer, defaultUserState } from "./Login/login.reducer";

export interface IUserInfo{
    id: string;
    userName: string;
}

export interface IUserData {
    userInfo?: IUserInfo;
    isLoggedIn: Loading<boolean>;
    error?: string;
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