import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../API/APIService';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LanguageContext';
import { useNotify } from '../../components/notifications/NotificationContext';
import useSlug from '../../hooks/useSlug';
import '../../styles/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login, user, loading } = useAuth();
    const navigate = useNavigate();
    const { t } = useLang();
    const location = useLocation();
    const notify = useNotify();

    const slug = useSlug(user?.full_name);

    useEffect(() => {
        if (location.state?.message) notify(location.state.message, 'error');
        const msg = sessionStorage.getItem('authMsg');
        if (msg) {
            notify(msg, 'error');
            sessionStorage.removeItem('authMsg');
        }
    }, []);

    useEffect(() => {
        if (!loading && user) {
            const path = user.role === 'admin' ? '/nnc/admin' : `/nnc/${slug}/dashboard`;
            navigate(path, { replace: true });
        }
    }, [user, loading]);

    const validate = () => {
        if (!email) { notify(t.login.emailRequired, 'error'); return false; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { notify(t.login.emailInvalid, 'error'); return false; }
        if (!password) { notify(t.login.passwordRequired, 'error'); return false; }
        if (password.length < 6) { notify(t.login.passwordShort, 'error'); return false; }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            const response = await api.post('auth/login', { email, password });
            login(response.data.user);
        } catch (err) {
            const errCode = err.response?.data?.error;
            notify(errCode === 'INVALID_CREDENTIALS' ? t.login.invalidCredentials : t.login.failed, 'error');
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>{t.login.title}</h2>
                <form className="login-form" onSubmit={handleLogin}>
                    <label htmlFor="email">{t.login.email}:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">{t.login.password}:</label>
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="button" className="toggle-password" onClick={() => setShowPassword(p => !p)}>
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                                    <line x1="1" y1="1" x2="23" y2="23"/>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                            )}
                        </button>
                    </div>

                    <button type="submit">{t.login.submit}</button>
                </form>
            </div>
        </div>
    );
}
export default Login;
