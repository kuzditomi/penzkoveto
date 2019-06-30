import { dispatchTokenFailed, loadUser } from "../../token-validate.actions";
import api, { tokenStorageKey } from "../../api";

export function login(username: string, password: string) {
    return (dispatch: any) => {
        api.post('account/login', {
            UserName: username,
            Password: password
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                }

                throw response.status;
            })
            .then((json: { token: string }) => {
                localStorage.setItem(tokenStorageKey, json.token);
                dispatch(loadUser());
            })
            .catch(() => {
                dispatch(dispatchTokenFailed());
            });
    }
}

export function logout() {
    return (dispatch: any) => {
        localStorage.removeItem(tokenStorageKey);
        dispatch(dispatchTokenFailed());
    }
}