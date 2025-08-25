import React from 'react';
import Notification from '../Notification';
import './_notification-container.scss';

const NotificationContainer = ({ notifications, onRemove }) => {
    return (
        <div className="notification-container">
            {notifications.map(notification => (
                <Notification 
                    key={notification.id} 
                    notification={notification} 
                    onRemove={onRemove} 
                />
            ))}
        </div>
    );
};

export default NotificationContainer;
