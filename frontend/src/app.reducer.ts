import { Action } from "redux";
import { userReducer, defaultUserState } from "./Pages/Login/login.reducer";
import { IRecord } from "./Models/record";
import { listReducer, defaultListState } from "./Pages/List/list.reducer";
import { addnewReducer, defaultAddnewState } from "./Pages/AddNewPage/addnew.reducer";
import { ICategory } from "./Models/category";
import { categoriesReducer, defaultCategoriesState } from "./categories.reducer";
import { IStatistics } from "./Models/statistics";
import { statisticsReducer, defaultStatisticsState } from "./Pages/Statistics/statistics.reducer";

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
    addNew: Loading<boolean>;
    categories: Loading<ICategory[]>;
    statistics: Loading<IStatistics>;
}

export function appReducer(state: AppState = defaultState(), action: Action) {
    return {
        user: userReducer(state, action),
        list: listReducer(state, action),
        addNew: addnewReducer(state, action),
        categories: categoriesReducer(state, action),
        statistics: statisticsReducer(state, action),
    };
}

export function defaultState(): AppState {
    return {
        user: defaultUserState(),
        list: defaultListState(),
        addNew: defaultAddnewState(),
        categories: defaultCategoriesState(),
        statistics: defaultStatisticsState(),
    };
}