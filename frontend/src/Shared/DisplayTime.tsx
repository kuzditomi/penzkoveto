import React from 'react';

type TimeProps = {
    time: string
}

const DisplayTime: React.FC<TimeProps> = ({ time }) => {
    const dateObject = new Date(time);

    const displayTime = `${dateObject.getHours().toString().padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')}`;

    return (<>{displayTime}</>);
}

export default DisplayTime;
