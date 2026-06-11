import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../API/APIService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('auth/me')
            .then(res => {
                if (res.data.error === 'TOKEN_EXPIRED') {
                    const lang = document.documentElement.lang || 'he';
                    const translations = { he: 'פג תוקף החיבור, אנא התחבר מחדש', fr: 'Votre session a expiré, veuillez vous reconnecter' };
                    sessionStorage.setItem('authMsg', translations[lang]);
                }
                setUser(res.data.user);
            })
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
