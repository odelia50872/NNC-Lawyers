import { createContext, useContext, useState, useCallback } from 'react';
import './Notification.css';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    const notify = useCallback((message, type = 'info') => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, fading: true } : n));
            setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 500);
        }, 2500);
    }, []);

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}
            <NotificationContainer notifications={notifications} />
        </NotificationContext.Provider>
    );
}

function NotificationContainer({ notifications }) {
    if (!notifications.length) return null;
    return (
        <div className="notification-container">
            {notifications.map(n => (
                <div key={n.id} className={`notification notification--${n.type}${n.fading ? ' fading' : ''}`}>
                    {n.message}
                </div>
            ))}
        </div>
    );
}

export const useNotify = () => {
    const ctx = useContext(NotificationContext);
    return ctx?.notify ?? (() => {});
};
