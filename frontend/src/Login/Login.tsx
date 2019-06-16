import React, { useState, FormEvent } from 'react';
import { connect } from 'react-redux';
import { login } from './login.action';

type LoginProps = {
    login(username: string, password: string): void;
}

const Login: React.FC<LoginProps> = ({login}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function onLogin(evt: FormEvent) {
        login(username, password);

        evt.preventDefault();
    }

    return (
        <form onSubmit={onLogin}>
            <h1>Login</h1>
            <div>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(evt) => setUsername(evt.target.value)}></input>
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(evt) => setPassword(evt.target.value)}></input>
                </label>
            </div>
            <input type="submit" value="log in"></input>
        </form>
    );
}

const mapDispatchToProps = (dispatch: any) => ({
    login: (username: string, password: string) => {
        dispatch(login(username, password))
    }
});

export default connect(null, mapDispatchToProps)(Login);
