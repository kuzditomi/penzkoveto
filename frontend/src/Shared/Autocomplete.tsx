import React from 'react';
import Downshift from 'downshift';
import { TextField, makeStyles, Theme, Paper, MenuItem } from '@material-ui/core';
import { IAutocompleteSuggestion } from './Autocomplete';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    chip: {
        margin: theme.spacing(0.5, 0.25),
    },
}));

export interface IAutocompleteSuggestion {
    label: string;
    key: number;
    value?: any;
}

type AutocompleteProps = {
    getSuggestions: (input: string | null) => IAutocompleteSuggestion[],
    onSelect: (selection: IAutocompleteSuggestion)=>void ;
    required?: boolean;
}

const Autocomplete: React.FC<AutocompleteProps> = (props: AutocompleteProps) => {
    const classes = useStyles();

    return (
        <Downshift
            onChange={selection => props.onSelect(selection)}
            itemToString={item => (item ? item.label : '')}
        >
            {({
                getItemProps,
                getInputProps,
                isOpen,
                openMenu,
                inputValue
            }) => (
                    <div className={classes.container}>
                        <TextField required={props.required} label="Category" fullWidth {...getInputProps()} onFocus={() => openMenu()} onClick={() => openMenu()}></TextField>
                        {
                            isOpen ?
                                <Paper className={classes.paper} square>{
                                    props.getSuggestions(inputValue).map((item, index) => (
                                        <MenuItem {...getItemProps({
                                            key: item.key,
                                            index,
                                            item
                                        })}>{item.label}</MenuItem>
                                    ))
                                }</Paper>
                                : null
                        }
                    </div>
                )}
        </Downshift>
    );
}

export default Autocomplete;
