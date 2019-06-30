import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../app.reducer';
import AddNewForm from './AddForm';
import { IRecord } from '../../Models/record';
import { addNewRecord } from './addnew.actions';

type AddNewPageProps = {
    onAddNew(record: Partial<IRecord>): void;
}

const AddNewPage: React.FC<AddNewPageProps> = ({onAddNew}) => {
    return (
        <AddNewForm addNew={onAddNew}></AddNewForm>
    );
}

const mapStateToProps = (store: AppState) => {
    return {
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    onAddNew: (record: Partial<IRecord>) => {
        dispatch(addNewRecord(record));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPage);
