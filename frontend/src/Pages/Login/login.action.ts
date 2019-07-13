import { dispatchTokenFailed, loadUser } from "../../token-validate.actions";
import { Repository } from './../../Shared/Repository/Repository';

export interface LoginData {
    UserName: string;
    Password: string;
}

export function login(username: string, password: string) {
    return (dispatch: any) => {
        Repository.Instance.Login({
            UserName: username,
            Password: password
        })
            .then((token: string) => {
                Repository.Instance.SaveToken(token);
                dispatch(loadUser());
            })
            .catch(() => {
                dispatch(dispatchTokenFailed());
            });
    }
}

export function logout() {
    return (dispatch: any) => {
        Repository.Instance.RemoveToken();
        dispatch(dispatchTokenFailed());
    }
}