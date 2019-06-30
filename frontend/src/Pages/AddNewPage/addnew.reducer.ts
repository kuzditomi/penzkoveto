import { AppState } from "../../app.reducer";
import { addNewAction, ACTION_ADD_NEW_START, ACTION_ADD_NEW_SUCCESS } from "./addnew.actions";

export function addnewReducer(state: AppState, action: addNewAction): Loading<boolean> {
    switch(action.type){
        case ACTION_ADD_NEW_START:
             return "loading";
        case ACTION_ADD_NEW_SUCCESS:
            return true;
    }

    return state.addNew;
}

export function defaultAddnewState(): Loading<boolean> {
    return undefined;
}