import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme, Drawer, IconButton, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import PieChartIcon from '@material-ui/icons/PieChart';

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
    list: {
        textDecoration: 'none'
    }
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
            <List className={classes.list}>
                <ListItem button component={Link} to="/">
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/add-new">
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Record" />
                </ListItem>
                <ListItem button component={Link} to="/list">
                    <ListItemIcon>
                        <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary="List" />
                </ListItem>
                <ListItem button component={Link} to="/statistics">
                    <ListItemIcon>
                        <PieChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Statistics" />
                </ListItem>
            </List>
        </Drawer>
    );
}

export default Menu;
