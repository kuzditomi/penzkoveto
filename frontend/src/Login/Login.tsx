import React, { useState, FormEvent } from 'react';
import { connect } from 'react-redux';
import { login } from './login.action';
import "./login.scss";

type LoginProps = {
    login(username: string, password: string): void;
}

const Login: React.FC<LoginProps> = ({ login }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function onLogin(evt: FormEvent) {
        login(username, password);

        evt.preventDefault();
    }

    return (
        <div className="login">
            <form onSubmit={onLogin}>
                <h1>Login</h1>
                <div className="input-group">
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(evt) => setUsername(evt.target.value)}></input>
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(evt) => setPassword(evt.target.value)}></input>
                </div>
                <button className="primary" type="submit">log in</button>
            </form>
        </div>
    );
}

const mapDispatchToProps = (dispatch: any) => ({
    login: (username: string, password: string) => {
        dispatch(login(username, password))
    }
});

export default connect(null, mapDispatchToProps)(Login);
