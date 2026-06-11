import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../API/APIService';
import { useLang } from './LanguageContext';
import { useTokenManager } from '../hooks/useTokenManager';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { t } = useLang();
    const { updateActivity, scheduleTokenRefresh } = useTokenManager();

    useEffect(() => {
        api.get('auth/me')
            .then(res => {
                setUser(res.data.user);
                if (res.data.user) {
                    scheduleTokenRefresh();
                    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
                    const handleActivity = () => updateActivity();
                    events.forEach(event => document.addEventListener(event, handleActivity, true));
                    
                    return () => events.forEach(event => document.removeEventListener(event, handleActivity, true));
                }
            })
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, [scheduleTokenRefresh, updateActivity]);

    const login = (userData) => {
        setUser(userData);
        scheduleTokenRefresh();
        updateActivity();
    };

    const logout = (navigate) => {
        api.post('auth/logout').finally(() => {
            setUser(null);
            navigate('/nnc/login', { replace: true });
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
