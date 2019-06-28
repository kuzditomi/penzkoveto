import React from 'react';
import { Container, makeStyles, Theme, Typography } from '@material-ui/core';
import { IRecord } from '../../models/record';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

type ItemsListProps = {
    items: IRecord[]
}

const ItemList: React.FC<ItemsListProps> = ({items}) => {
    const classes = useStyles();
    
    return (
        <pre>{items[0].name}</pre>
    );
}

export default ItemList;
