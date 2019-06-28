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

type HomeProps = {
    userName?: string;
}

const HomePage: React.FC<HomeProps> = ({userName}) => {
    const classes = useStyles();

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Typography variant="h1">Hello {userName}!</Typography>
        </Container>
    );
}

const mapStateToProps = (store: AppState) => {
    return {
        userName: store.user.userInfo && store.user.userInfo.userName
    }
};

export default connect(mapStateToProps)(HomePage);
