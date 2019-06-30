import React, { useEffect } from 'react';
import { Container, makeStyles, Theme, Typography, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { AppState } from '../../app.reducer';
import { IRecord } from '../../Models/record';
import { loadList } from './list.actions';
import ItemList from './ItemList';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

type ListPageProps = {
    items: Loading<IRecord[]>,

    loadList(): void;
}

const ListPage: React.FC<ListPageProps> = ({ items, loadList }) => {
    const classes = useStyles();

    useEffect(() => {
        if (items === undefined) {
            loadList();
        }
    });

    let content;
    if (items === "loading") {
        content = <CircularProgress />
    } else if (items !== undefined) {
        content = <ItemList items={items}></ItemList>
    }

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Typography variant="h3">Uncategorized items</Typography>
            { content }
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