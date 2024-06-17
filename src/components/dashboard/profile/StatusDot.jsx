import React from 'react';

const StatusDot = ({ status }) => {
    const statusColors = {
        online: 'bg-green-500',
        offline: 'bg-gray-500',
        away: 'bg-yellow-500',
        busy: 'bg-red-500',
    };

    return (
        <span className={`absolute bottom-0 right-0 inline-block w-3 h-3 ${statusColors[status]} rounded-full`}></span>
    );
};

export default StatusDot;
