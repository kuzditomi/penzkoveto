import React, { useState, FormEvent } from 'react';

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");

    function login(evt: FormEvent) {
        const loginData = {
            UserName: username,
            Password: password,
        };

        fetch('https://localhost:44320/api/account/login', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
            .then(response => response.json())
            .then(data => {
                setToken(data.token);
            });

        evt.preventDefault();
    }

    return (
        <form onSubmit={login}>
            <label>
                Username:
                <input type="text" value={username} onChange={(evt) => setUsername(evt.target.value)}></input>
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(evt) => setPassword(evt.target.value)}></input>
            </label>
            <input type="submit" value="log in"></input>

            {token}
        </form>
    );
}

export default Login;
