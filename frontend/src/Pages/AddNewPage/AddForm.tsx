import React, { useState } from 'react';
import { makeStyles, Theme, Typography, Paper, Grid, TextField, Button } from '@material-ui/core';
import { IRecord } from '../../Models/record';

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
}));

type AddNewFormProps = {
    addNew(record: Partial<IRecord>): void;
}

const AddNewForm: React.FC<AddNewFormProps> = ({addNew}) => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');

    const recordNew = ()=>{
        const model: Partial<IRecord> = {
            name: name,
            cost: Number(cost),
            date: new Date().toUTCString()
        };

        addNew(model);
    };

    return (
        <Paper className={classes.paper}>
            <Typography component="h1" variant="h4">
                Record
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="name"
                        name="name"
                        label="Description"
                        fullWidth
                        value={name}
                        onChange={(evt)=>{setName(evt.target.value)}}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        type="number"
                        id="cost"
                        name="cost"
                        label="Cost"
                        fullWidth
                        value={cost}
                        onChange={(evt)=>{setCost(evt.target.value)}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={()=>recordNew()}>
                        Record
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default AddNewForm;
