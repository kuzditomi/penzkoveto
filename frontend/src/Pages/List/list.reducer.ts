import { AppState } from "../../app.reducer";
import { IRecord } from "../../models/record";
import { listAction, ACTION_LOAD_LIST_START, ACTION_LOAD_LIST_SUCCESS } from "./list.actions";

export function listReducer(state: AppState, action: listAction): Loading<IRecord[]> {
    switch(action.type){
        case ACTION_LOAD_LIST_START:
            return "loading";
        case ACTION_LOAD_LIST_SUCCESS:
            return action.list
    }

    return state.list;
}

export function defaultListState(): Loading<IRecord[]> {
    return undefined;
}