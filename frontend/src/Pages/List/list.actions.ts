import { Action } from "redux";
import { IRecord } from "../../Models/record";
import { Repository } from "../../Shared/Repository/Repository";

export const ACTION_LOAD_LIST_START = 'LIST_LOAD_START';
export const ACTION_LOAD_LIST_SUCCESS = 'LIST_LOAD_SUCCESS';

export interface IActionListLoadStart extends Action {
    type: 'LIST_LOAD_START',
}

export interface IActionListLoadSuccess extends Action {
    type: 'LIST_LOAD_SUCCESS',
    list: IRecord[]
}

export type listAction = IActionListLoadStart | IActionListLoadSuccess;

export function dispatchListLoad(): IActionListLoadStart {
    return {
        type: ACTION_LOAD_LIST_START
    };
}

export function dispatchListSuccess(list: IRecord[]): IActionListLoadSuccess {
    return {
        type: ACTION_LOAD_LIST_SUCCESS,
        list
    };
}

export function loadList() {
    return (dispatch: any) => {
        dispatch(dispatchListLoad());

        Repository.Instance.GetItems()
            .then((json: IRecord[]) => {
                dispatch(dispatchListSuccess(json))
            })
            // .catch(() => {
            //     dispatch(dispatchTokenFailed());
            // });
    }
}