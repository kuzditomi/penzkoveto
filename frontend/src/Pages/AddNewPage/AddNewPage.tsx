import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../app.reducer';
import AddNewForm from './AddForm';
import { IRecord } from '../../Models/record';
import { addNewRecord, dispatchAddNew } from './addnew.actions';
import { ICategory } from '../../Models/category';
import { loadCategories } from '../../categories.actions';
import { hasValue } from '../../Shared/functions';
import { withRouter, RouteComponentProps } from "react-router-dom";

type AddNewPageProps = RouteComponentProps & {
    init: ()=> void;
    addNewState: Loading<boolean>,
    onAddNew(record: Partial<IRecord>): void;
    categories: Loading<ICategory[]>;
}

const AddNewPage: React.FC<AddNewPageProps> = ({ init, addNewState, onAddNew, categories, history }) => {
    const [initDone, setInit] = useState(false);

    useEffect(() => {
        if(!initDone){
            init();
            setInit(true);
            return;
        }

        if (addNewState === true) {
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
    init: () => {
        dispatch(dispatchAddNew());
        dispatch(loadCategories());
    },
    onAddNew: (record: Partial<IRecord>) => {
        dispatch(addNewRecord(record));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddNewPage));
