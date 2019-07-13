import React, { useState, FormEvent } from 'react';
import { connect } from 'react-redux';
import { login } from './login.action';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/styles/makeStyles/makeStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Typography, TextField, Container } from '@material-ui/core';
import { isMobileApp } from '../../Shared/functions';

type LoginProps = {
    login(username: string, password: string): void;
}

const useStyles = makeStyles((theme: Theme) => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    login: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    paper: {

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    title: {
        textAlign: 'center',
    },
}));

const Login: React.FC<LoginProps> = ({ login }) => {
    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function onLogin(evt: FormEvent) {
        login(username, password);

        evt.preventDefault();
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.login}>
            <div className={classes.paper}>
                <Typography variant="h3" className={classes.title}>
                    Pénzkövető 2.0
                </Typography>
                <form className={classes.form} onSubmit={onLogin}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username} onChange={(evt) => setUsername(evt.target.value)}
                    />
                    {
                        isMobileApp() ? null :
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password} onChange={(evt) => setPassword(evt.target.value)}
                            />
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                </Button>
                </form>
            </div>
        </Container>
    );
}

const mapDispatchToProps = (dispatch: any) => ({
    login: (username: string, password: string) => {
        dispatch(login(username, password))
    }
});

export default connect(null, mapDispatchToProps)(Login);
