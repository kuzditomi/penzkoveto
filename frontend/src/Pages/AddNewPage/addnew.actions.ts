import { Action } from "redux";
import api from "../../api";
import { IRecord } from "../../Models/record";

export const ACTION_ADD_NEW_START = 'ADD_NEW_START';
export const ACTION_ADD_NEW_SUCCESS = 'ADD_NEW_SUCCESS';

export interface IActionAddNewStart extends Action {
    type: 'ADD_NEW_START',
}

export interface IActionAddNewSuccess extends Action {
    type: 'ADD_NEW_SUCCESS',
}

export type addNewAction = IActionAddNewStart | IActionAddNewSuccess;

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

export function addNewRecord(record: Partial<IRecord>) {
    return (dispatch: any) => {
        dispatch(dispatchAddNewStart());

        api.post('items', {
            Name: record.name,
            Cost: record.cost,
            Type: 0
        })
            .then((response) => {
                if (response.status === 200) {
                    return;
                }

                throw response.status;
            })
            .then(() => {
                dispatch(dispatchAddNewSuccess())
            })
        // .catch(() => {
        //     dispatch(dispatchTokenFailed());
        // });
    }
}