import { Action } from "redux";
import { userReducer, defaultUserState } from "./Pages/Login/login.reducer";
import { IRecord } from "./Models/record";
import { listReducer, defaultListState } from "./Pages/List/list.reducer";

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
    list: Loading<IRecord[]>;
}

export function appReducer(state: AppState = defaultState(), action: Action) {
    return {
        user: userReducer(state, action),
        list: listReducer(state, action)
    };
}

export function defaultState(): AppState {
    return {
        user: defaultUserState(),
        list: defaultListState()
    };
}