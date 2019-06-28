import React from 'react';
import { Container, makeStyles, Theme, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { AppState } from '../../app.reducer';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

type ListPageProps = {
}

const ListPage: React.FC<ListPageProps> = () => {
    const classes = useStyles();

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Typography variant="h1">List!</Typography>
        </Container>
    );
}

const mapStateToProps = (store: AppState) => {
    return {
    }
};

export default connect(mapStateToProps)(ListPage);
