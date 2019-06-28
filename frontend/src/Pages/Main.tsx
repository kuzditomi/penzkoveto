import React, { useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { AppState } from '../app.reducer';
import Login from '../Login/Login';
import Home from './Home/Home';
import { CssBaseline, makeStyles, Theme } from '@material-ui/core';

import Menu from '../Menu/Menu';
import Header from '../Header/Header';
import { logout } from '../Login/login.action';
import AddNewPage from './AddNewPage/AddNewPage';
import ListPage from './List/List';

const useStyles = makeStyles((theme: Theme) => ({
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    appBarSpacer: theme.mixins.toolbar,
}));

type MainProps = {
    isLoggedIn: Loading<boolean>,
    logout(): void
}

const Main: React.FC<MainProps> = ({ isLoggedIn, logout }) => {
    const [isOpen, setOpen] = useState(false);
    const handleMenuToggle = () => {
        setOpen(!isOpen);
    };

    const classes = useStyles();

    const pages = (
        <BrowserRouter>
            <Header isOpen={isOpen} onToggle={handleMenuToggle} onLogout={logout}></Header>
            <Menu isOpen={isOpen} onToggle={handleMenuToggle}></Menu>
            <div className={classes.content}>
                <div className={classes.appBarSpacer} />

                <Route exact path="/" component={isLoggedIn === true ? Home : Login} />
                <Route path="/add-new" component={AddNewPage} />
                <Route path="/list" component={ListPage} />
            </div>
        </BrowserRouter>
    );

    const page = (
        <React.Fragment>
            {isLoggedIn ? pages : <Login></Login>}
        </React.Fragment>
    );

    const loader = (
        <p>Loading...</p>
    );

    return (
        <React.Fragment>
            <CssBaseline />
            {isLoggedIn === 'loading' ? loader : page}
        </React.Fragment>
    );
}

const mapStateToProps = (store: AppState) => {
    return {
        isLoggedIn: store.user.isLoggedIn
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    logout: () => {
        dispatch(logout());
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Main);