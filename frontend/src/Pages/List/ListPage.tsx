import React, { useEffect, useState } from 'react';
import { Container, makeStyles, Theme, Typography, CircularProgress, Fab } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../../app.reducer';
import { IRecord } from '../../Models/record';
import { loadList } from './list.actions';
import ItemList from './ItemList';

import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    margin: {
        margin: theme.spacing(1),
    }
}));

type ListPageProps = {
    items: Loading<IRecord[]>,

    loadList(): void;
}

const ListPage: React.FC<ListPageProps> = ({ items, loadList }) => {
    const classes = useStyles();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (loaded) {
            return;
        }

        setLoaded(true);

        if (items === 'loading') {
            return;
        }

        loadList();
    }, [loaded, items, loadList]);

    let content;
    if (items === "loading") {
        content = <CircularProgress />
    } else if (items !== undefined) {
        content = (
            <React.Fragment>
                <Fab component={Link} to="/add-new" color="primary" size="small" variant="extended">
                    <AddIcon /> ADD
                </Fab>
                <Fab color="secondary" size="small" variant="extended" className={classes.margin} onClick={() => { loadList() }}>
                    <RefreshIcon /> RELOAD
                </Fab>
                <ItemList items={items}></ItemList>
            </React.Fragment>
        )
    }

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Typography variant="h3">Recorded items</Typography>
            {content}
        </Container>
    );
}

const mapStateToProps = (store: AppState) => {
    return {
        items: store.list
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    loadList: () => {
        dispatch(loadList());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
