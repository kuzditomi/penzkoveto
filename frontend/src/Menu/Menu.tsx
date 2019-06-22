import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme, Drawer, IconButton, Divider, List } from '@material-ui/core';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

export const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
}));

type MainProps = {
    isOpen: boolean;
    onToggle: () => void;
}

const Menu: React.FC<MainProps> = ({ isOpen, onToggle }) => {
    const classes = useStyles();

    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !isOpen && classes.drawerPaperClose),
            }}
            open={isOpen}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={() => onToggle()}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
        </Drawer>
    );
}


export default Menu;