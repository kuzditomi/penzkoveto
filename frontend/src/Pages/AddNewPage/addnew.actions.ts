import { Action } from "redux";
import api from "../../api";
import { INewRecord } from "../../Models/new-record";

export const ACTION_ADD_NEW = 'ADD_NEW';
export const ACTION_ADD_NEW_START = 'ADD_NEW_START';
export const ACTION_ADD_NEW_SUCCESS = 'ADD_NEW_SUCCESS';

export interface IActionAddNew extends Action {
    type: 'ADD_NEW',
}

export interface IActionAddNewStart extends Action {
    type: 'ADD_NEW_START',
}

export interface IActionAddNewSuccess extends Action {
    type: 'ADD_NEW_SUCCESS',
}

export type addNewAction = IActionAddNew | IActionAddNewStart | IActionAddNewSuccess;

export function dispatchAddNew(): IActionAddNew {
    return {
        type: ACTION_ADD_NEW,
    };
}

export function dispatchAddNewStart(): IActionAddNewStart {
    return {
        type: ACTION_ADD_NEW_START,
    };
}

export function dispatchAddNewSuccess(): IActionAddNewSuccess {
    return {
        type: ACTION_ADD_NEW_SUCCESS,
    };
}

export function addNewRecord(record: INewRecord) {
    return (dispatch: any) => {
        dispatch(dispatchAddNewStart());

        api.post('items', {
            Name: record.name,
            Cost: record.cost,
            Type: record.type,
            CategoryId: record.categoryId
        })
            .then((response) => {
                if (response.status === 200) {
                    return;
                }

                throw response.status;
            })
            .then(() => {
                dispatch(dispatchAddNewSuccess());
                // window.location.replace('/list');
            })
        // .catch(() => {
        //     dispatch(dispatchTokenFailed());
        // });
    }
}