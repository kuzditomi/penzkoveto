import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../app.reducer';
import AddNewForm from './AddForm';
import { IRecord } from '../../Models/record';

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
        console.log(record);
        // dispatch(loadList());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPage);
