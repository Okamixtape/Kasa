import React from 'react';

import './_notification.scss';

const Notification = ({ notification, onRemove }) => {
    return (
        <div className={`notification notification--${notification.type}`}>
            <p>{notification.message}</p>
            <button onClick={() => onRemove(notification.id)} className="notification__close-btn">&times;</button>
        </div>
    );
};



export default Notification;
