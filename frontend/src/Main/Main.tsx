import React, { useState } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { BrowserRouter, Route } from 'react-router-dom';
import { AppState } from '../app.reducer';
import Login from '../Login/Login';
import Home from '../Home/Home';
import { CssBaseline, Container, AppBar, Theme, Toolbar, IconButton, Typography, Badge, Drawer, Divider, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Menu, { drawerWidth } from '../Menu/Menu';

const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
}));

type MainProps = {
    isLoggedIn: Loading<boolean>
}

const Main: React.FC<MainProps> = ({ isLoggedIn }) => {
    const classes = useStyles();
    const [isOpen, setOpen] = useState(true);
    const handleMenuToggle = () => {
        setOpen(!isOpen);
    };

    const pages = (
        <React.Fragment>
            <AppBar position="absolute" className={clsx(classes.appBar, isOpen && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={() => setOpen(!isOpen)}
                        className={clsx(classes.menuButton, isOpen && classes.menuButtonHidden)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap>
                        Pénzkövető 2.0
                    </Typography>
                </Toolbar>
            </AppBar>
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