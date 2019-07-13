import React, { useEffect } from 'react';
import { makeStyles, Theme, Paper, Grid } from '@material-ui/core';
import { IStatistics } from '../../Models/statistics';
import * as d3 from "d3";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
}));

type StatisticsChartProps = {
    statistics: IStatistics
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({ statistics }) => {
    const classes = useStyles();

    useEffect(() => {
        const chart = d3.select('#stat-chart');

        const pie = d3.pie()
        //     .value(d => d.value)
        // var data_ready = pie(d3.entries(data))
    });

    const data = { a: 9, b: 20, c: 30, d: 8, e: 12 }


    return (
        <Grid item xs={12} sm={6}>
            <Paper className={classes.root}>
                <svg id="stat-chart" className="container"></svg>
            </Paper>
        </Grid>
    );
}

export default StatisticsChart;
