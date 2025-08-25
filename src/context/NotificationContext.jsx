import React, { createContext, useState, useContext, useCallback } from 'react';
import NotificationContainer from '../components/NotificationContainer';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const removeNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    const addNotification = useCallback((message, type = 'info') => {
        const id = Date.now() + Math.random();
        setNotifications(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            removeNotification(id);
        }, 5000);
    }, [removeNotification]);

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            {children}
            <NotificationContainer notifications={notifications} onRemove={removeNotification} />
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
