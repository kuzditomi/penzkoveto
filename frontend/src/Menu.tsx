import React from 'react';
import { AppState } from './app.reducer';
import { connect } from 'react-redux';
import { logout } from './Login/login.action';

type MainProps = {
    isLoggedIn: Loading<boolean>;
    logout(): void;
}

const Menu: React.FC<MainProps> = ({ isLoggedIn, logout }) => {
    function onLogout() {
        logout();
    }

    if (isLoggedIn !== true)
        return null;

    return (
        <ul>
            <li>Hello!</li>
            <li><button onClick={() => onLogout()}>Logout</button></li>
        </ul>
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