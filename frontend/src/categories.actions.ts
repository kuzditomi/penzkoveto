import { Action } from "redux";
import { ICategory } from "./Models/category";
import api from "./api";

export const ACTION_LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const ACTION_LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS';

export interface IActionLoadCategoriesStart extends Action {
    type: 'LOAD_CATEGORIES',
}

export interface IActionLoadCategoriesSuccess extends Action {
    type: 'LOAD_CATEGORIES_SUCCESS',
    categories: ICategory[]
}

export type categoriesAction = IActionLoadCategoriesStart | IActionLoadCategoriesSuccess;

export function dispatchLoadCategoriesStart(): IActionLoadCategoriesStart {
    return {
        type: ACTION_LOAD_CATEGORIES,
    };
}

export function dispatchLoadCategoriesSuccess(categories: ICategory[]): IActionLoadCategoriesSuccess {
    return {
        type: ACTION_LOAD_CATEGORIES_SUCCESS,
        categories
    };
}

export function loadCategories() {
    return (dispatch: any) => {
        dispatch(dispatchLoadCategoriesStart());

        api.get('categories')
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                }

                throw response.status;
            })
            .then((categories: ICategory[]) => {
                dispatch(dispatchLoadCategoriesSuccess(categories))
            });
        // .catch(() => {
        //     dispatch(dispatchTokenFailed());
        // });
    }
}