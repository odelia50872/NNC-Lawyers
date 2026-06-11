import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../API/APIService';
import{useLang} from './LanguageContext';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { t } = useLang();

    useEffect(() => {
        api.get('auth/me')
            .then(res => setUser(res.data.user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = (userData) => setUser(userData);

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
