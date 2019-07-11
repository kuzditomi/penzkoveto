import React from 'react';

type DateProps = {
    date: string
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const DisplayDate: React.FC<DateProps> = ({ date }) => {
    const dateObject = new Date(date);
    const formattedDate = `${(months[dateObject.getMonth() + 1])} ${dateObject.getDay() + 1}.`;

    return (<>{formattedDate}</>);
}

export default DisplayDate;
