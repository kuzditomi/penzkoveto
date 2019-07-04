import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme, TextField, Paper, MenuItem } from '@material-ui/core';
import Downshift from 'downshift';

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
}));

export interface IAutocompleteSuggestion {
    name: string;
    value: number;
}

type AutocompleteProps = {
    label: string,
    suggestions: IAutocompleteSuggestion[] | (() => IAutocompleteSuggestion[]);
}

const Autocomplete: React.FC<AutocompleteProps> = (props: AutocompleteProps) => {
    const classes = useStyles();

    const getSuggestions = (): IAutocompleteSuggestion[] => {
        if (typeof props.suggestions === 'function') {
            return props.suggestions();
        }

        return props.suggestions;
    }

    const renderInput = (onFocus: any, onBlur: any) => (
        <TextField
            fullWidth
            label={props.label}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );

    const renderSuggestion = (suggestion: IAutocompleteSuggestion) => (
        <MenuItem
            key={suggestion.name}
            // selected={isHighlighted}
            component="div"
        // style={{
        //     fontWeight: isSelected ? 500 : 400,
        // }}
        >
            {suggestion.name}
        </MenuItem>
    )

    const renderDropdown = (isOpen: boolean) => {
        return isOpen ? (
            <Paper className={classes.paper} square>
                {
                    getSuggestions().map(s => renderSuggestion(s))
                }
            </Paper>
        ) : null
    }

    return (
        <Downshift id="downshift-options">
            {
                ({
                    clearSelection,
                    getInputProps,
                    getItemProps,
                    getLabelProps,
                    getMenuProps,
                    highlightedIndex,
                    inputValue,
                    isOpen,
                    openMenu,
                    selectedItem,
                }) => {
                    const { onFocus, onBlur } = getInputProps({
                        onFocus: openMenu,
                        placeholder: 'With the clear & show empty options',
                    });

                    return (
                        <div className={classes.container}>
                            {renderInput(onFocus, onBlur)}
                            {renderDropdown(isOpen)}
                        </div>
                    )
                }
            }
        </Downshift>
    );
}

export default Autocomplete;
