import { dispatchTokenFailed, loadUser, tokenStorageKey } from "../token-validate.actions";

export function login(username: string, password: string) {
    return (dispatch: any) => {
        const loginData = JSON.stringify({
            UserName: username,
            Password: password
        });

        fetch('https://localhost:5001/api/account/login', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: loginData
        })
            .then((response) => {
                if(response.status === 200){
                    return response.json();
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