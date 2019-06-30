import React from 'react';
import { makeStyles, Theme, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { IRecord } from '../../Models/record';
import DisplayDateTime from '../../Shared/DisplayDateTime';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        // width: '50%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
}));

type ItemsListProps = {
    items: IRecord[]
}

const ItemList: React.FC<ItemsListProps> = ({ items }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(item => (
                        <TableRow key={item.id}>
                            <TableCell component="th">
                                {item.id}
                            </TableCell>
                            <TableCell>{item.type}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.cost}</TableCell>
                            <TableCell><DisplayDateTime dateTime={item.date}/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

export default ItemList;
