import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme, IconButton, AppBar, Toolbar, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { drawerWidth } from '../Menu/Menu';
import MenuIcon from '@material-ui/icons/Menu';

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

type HeaderProps = {
    isOpen: boolean;
    onToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ isOpen, onToggle }) => {
    const classes = useStyles();

    return (
        <AppBar position="absolute" className={clsx(classes.appBar, isOpen && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={() => onToggle()}
                    className={clsx(classes.menuButton, isOpen && classes.menuButtonHidden)}>
                    <MenuIcon />
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap>
                    Pénzkövető 2.0
            </Typography>
            </Toolbar>
        </AppBar>
    );
}


export default Header;