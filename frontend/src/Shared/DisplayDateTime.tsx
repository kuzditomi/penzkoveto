import React from 'react';
import DisplayDate from './DisplayDate';
import DisplayTime from './DisplayTime';

type DateTimeProps = {
    dateTime: string
}

const DisplayDateTime: React.FC<DateTimeProps> = ({ dateTime }) => {
    return (
        <React.Fragment>
            <DisplayDate date={dateTime}></DisplayDate> <DisplayTime time={dateTime}></DisplayTime> 
        </React.Fragment>
    );
}

export default DisplayDateTime;
