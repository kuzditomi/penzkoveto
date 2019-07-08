import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../app.reducer';
import AddNewForm from './AddForm';
import { IRecord } from '../../Models/record';
import { addNewRecord } from './addnew.actions';
import { ICategory } from '../../Models/category';
import { loadCategories } from '../../categories.actions';
import { hasValue } from '../../Shared/functions';
import { withRouter, RouteComponentProps } from "react-router-dom";

type AddNewPageProps = RouteComponentProps & {
    addNewState: Loading<boolean>,
    onAddNew(record: Partial<IRecord>): void;
    categories: Loading<ICategory[]>;

    loadCategories(): void;
}

const AddNewPage: React.FC<AddNewPageProps> = ({ addNewState, onAddNew, categories, loadCategories, history }) => {
    useEffect(() => {
        if (!hasValue(categories)) {
            loadCategories();
        }

        if(addNewState === true){
            history.push('/list');
        }
    });

    const categoryList = categories === 'loading' || categories === undefined ? [] : categories;

    return (
        <AddNewForm addNew={onAddNew} categories={categoryList}></AddNewForm>
    );
}

const mapStateToProps = (store: AppState) => {
    return {
        addNewState: store.addNew,
        categories: store.categories
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    onAddNew: (record: Partial<IRecord>) => {
        dispatch(addNewRecord(record));
    },
    loadCategories: () => {
        dispatch(loadCategories());
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddNewPage));
