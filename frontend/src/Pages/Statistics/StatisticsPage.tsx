import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../app.reducer';
import { Container, Typography, makeStyles, Theme, CircularProgress } from '@material-ui/core';
import { loadStatistics } from './statistics.actions';
import StatisticsTable from './StatisticsTable';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    }
}));

type StatisticsPageProps = {
    statistics: Loading<any>;
    loadStatistics: () => void;
}

const StatisticsPage: React.FC<StatisticsPageProps> = ({ statistics, loadStatistics }) => {
    const classes = useStyles();

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (loaded) {
            return;
        }

        setLoaded(true);

        if (statistics === 'loading') {
            return;
        }

        loadStatistics();
    }, [loaded, statistics, loadStatistics]);

    let content;
    if (statistics === "loading") {
        content = <CircularProgress />
    } else if (statistics !== undefined) {
        content = (<StatisticsTable statistics={statistics}></StatisticsTable>)
    }

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Typography variant="h3">Statistics</Typography>
            {content}
        </Container>
    );
}


const mapStateToProps = (store: AppState) => {
    return {
        statistics: store.statistics
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    loadStatistics: () => {
        dispatch(loadStatistics());
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(StatisticsPage);