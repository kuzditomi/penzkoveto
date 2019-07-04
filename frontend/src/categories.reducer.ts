import { ICategory } from "./Models/category";
import { AppState } from "./app.reducer";
import { categoriesAction, ACTION_LOAD_CATEGORIES, ACTION_LOAD_CATEGORIES_SUCCESS } from "./categories.actions";

export function categoriesReducer(state: AppState, action: categoriesAction): Loading<ICategory[]> {
    switch (action.type) {
        case ACTION_LOAD_CATEGORIES:
            return "loading";
        case ACTION_LOAD_CATEGORIES_SUCCESS:
            return action.categories
    }

    return state.categories;
}

export function defaultCategoriesState(): Loading<ICategory[]> {
    return undefined;
}