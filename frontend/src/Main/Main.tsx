import React, { useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { AppState } from '../app.reducer';
import Login from '../Login/Login';
import Home from '../Home/Home';
import { CssBaseline, Container } from '@material-ui/core';

import Menu from '../Menu/Menu';
import Header from '../Header/Header';

type MainProps = {
    isLoggedIn: Loading<boolean>
}

const Main: React.FC<MainProps> = ({ isLoggedIn }) => {
    const [isOpen, setOpen] = useState(true);
    const handleMenuToggle = () => {
        setOpen(!isOpen);
    };

    const pages = (
        <React.Fragment>
            <Header isOpen={isOpen} onToggle={handleMenuToggle}></Header>
            <Menu isOpen={isOpen} onToggle={handleMenuToggle}></Menu>
            <BrowserRouter>
                <Route exact path="/" component={isLoggedIn === true ? Home : Login} />
            </BrowserRouter>
        </React.Fragment>
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
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {isLoggedIn === 'loading' ? loader : page}
        </Container>
    );
}

const mapStateToProps = (store: AppState) => {
    return {
        isLoggedIn: store.isLoggedIn
    }
};

export default connect(mapStateToProps, null)(Main);