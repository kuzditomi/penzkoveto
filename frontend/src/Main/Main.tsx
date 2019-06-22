import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AppState } from '../app.reducer';
import Login from '../Login/Login';
import Home from '../Home/Home';
import { connect } from 'react-redux';
import { CssBaseline, Container } from '@material-ui/core';

type MainProps = {
    isLoggedIn: Loading<boolean>
}

const Main: React.FC<MainProps> = ({ isLoggedIn }) => {
    const page = (
        <BrowserRouter>
            <Route exact path="/" component={isLoggedIn === true ? Home : Login} />
        </BrowserRouter>
    );

    const loader = (
        <p>Loading...</p>
    );

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {/* <Topbar /> */}
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