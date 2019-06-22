import React from 'react';
import { AppState } from '../app.reducer';
import { connect } from 'react-redux';
import { logout } from '../Login/login.action';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    main: {
        // marginTop: theme.spacing(8),
        display: 'flex',
        alignItems: 'center',
    }
}));

type MainProps = {
    isLoggedIn: Loading<boolean>;
    logout(): void;
}

const Menu: React.FC<MainProps> = ({ isLoggedIn, logout }) => {
    const classes = useStyles();

    function onLogout() {
        logout();
    }

    if (isLoggedIn !== true)
        return null;

    return (
        <aside className={classes.main}>
            <ul>
                <li>Hello!</li>
                <li><button onClick={() => onLogout()}>Logout</button></li>
            </ul>
        </aside>
    );
}

const mapStateToProps = (store: AppState) => ({
    isLoggedIn: store.isLoggedIn
});

const mapDispatchToProps = (dispatch: any) => ({
    logout: () => {
        dispatch(logout())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);