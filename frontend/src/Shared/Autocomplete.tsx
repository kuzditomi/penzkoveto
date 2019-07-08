import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme, TextField, Paper, MenuItem } from '@material-ui/core';
import Downshift from 'downshift';
import { MenuItemProps } from '@material-ui/core/MenuItem';

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
    value: number;
}

type AutocompleteProps = {
    label: string,
    suggestions: IAutocompleteSuggestion[] | ((input: string) => IAutocompleteSuggestion[]);
}

interface RenderSuggestionProps {
    highlightedIndex: number | null;
    index: number;
    itemProps: MenuItemProps<'div', { button?: never }>;
    selectedItem: IAutocompleteSuggestion['label'];
    suggestion: IAutocompleteSuggestion;
}

const Autocomplete: React.FC<AutocompleteProps> = (props: AutocompleteProps) => {
    const classes = useStyles();

    const getSuggestions = (input: string): IAutocompleteSuggestion[] => {
        if (typeof props.suggestions === 'function') {
            return props.suggestions(input);
        }

        return props.suggestions;
    }

    const renderInput = (inputProps: any) => {
        const { InputProps, classes, ref, ...other } = inputProps;

        return (<TextField
            fullWidth
            InputProps={{
                inputRef: ref,
                ...InputProps
            }}
            {...other}
        />);
    };

    function renderSuggestion(suggestionProps: RenderSuggestionProps) {
        const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
        const isHighlighted = highlightedIndex === index;
        const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

        return (
            <MenuItem
                {...itemProps}
                key={suggestion.label}
                selected={isHighlighted}
                component="div"
                style={{
                    fontWeight: isSelected ? 500 : 400,
                }}
            >
                {suggestion.label}
            </MenuItem>
        );
    }

    return (
        <Downshift id="downshift-options">
            {({
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
                const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
                    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                        if (event.target.value === '') {
                            clearSelection();
                        }
                    },
                    onFocus: openMenu,
                    placeholder: props.label,
                });

                return (
                    <div className={classes.container}>
                        {renderInput({
                            fullWidth: true,
                            classes,
                            label: !inputValue ? undefined : props.label,
                            InputLabelProps: getLabelProps({ shrink: true } as any),
                            InputProps: { onBlur, onChange, onFocus },
                            inputProps,
                        })}
                        <div {...getMenuProps()}>
                            {isOpen ? (
                                <Paper className={classes.paper} square>
                                    {getSuggestions(inputValue!).map((suggestion, index) =>
                                        renderSuggestion({
                                            suggestion,
                                            index,
                                            itemProps: getItemProps({ item: suggestion.label }),
                                            highlightedIndex,
                                            selectedItem,
                                        }),
                                    )}
                                </Paper>
                            ) : null}
                        </div>
                    </div>
                );
            }}
        </Downshift>
    );
}

export default Autocomplete;
