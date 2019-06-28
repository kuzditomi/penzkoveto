import React from 'react';

type DateProps = {
    date: string
}

const DisplayDate: React.FC<DateProps> = ({ date }) => {
    const dateObject = new Date(date);

    const formattedDate = `${dateObject.getFullYear()}.${(dateObject.getMonth() + 1).toString().padStart(2, '0')}.${dateObject.getDay().toString().padStart(2, '0')}.`;

    return (<>{formattedDate}</>);
}

export default DisplayDate;
