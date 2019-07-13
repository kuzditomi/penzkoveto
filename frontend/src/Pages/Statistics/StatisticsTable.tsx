import React from 'react';
import { makeStyles, Theme, Paper, Table, TableHead, TableRow, TableCell, TableBody, Grid } from '@material-ui/core';
import { IStatistics } from '../../Models/statistics';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
}));

type StatisticsTableProps = {
    statistics: IStatistics
}

const StatisticsTable: React.FC<StatisticsTableProps> = ({ statistics }) => {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6}>
            <Paper className={classes.root}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Category</TableCell>
                            <TableCell align="right">Total amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {statistics.categoryStatistics.map(stat => (
                            <TableRow key={stat.category ? stat.category.id : -1}>
                                <TableCell component="th">
                                    {stat.category ? stat.category.name : 'Uncategorized'}
                                </TableCell>
                                <TableCell align="right">{stat.totalAmount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Grid>
    );
}

export default StatisticsTable;
