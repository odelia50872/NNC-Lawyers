import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../API/APIService';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LanguageContext';
import '../../styles/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const { t } = useLang();
    const location = useLocation();
    const [popup, setPopup] = useState(location.state?.message || null);
    const [popupFading, setPopupFading] = useState(false);

    const showPopup = (msg) => {
        setPopup(msg);
        setPopupFading(false);
    };

    useEffect(() => {
        if (popup) {
            const fade = setTimeout(() => setPopupFading(true), 2500);
            const hide = setTimeout(() => { setPopup(null); setPopupFading(false); }, 3000);
            return () => { clearTimeout(fade); clearTimeout(hide); };
        }
    }, [popup]);

    const validate = () => {
        if (!email) { showPopup(t.login.emailRequired); return false; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showPopup(t.login.emailInvalid); return false; }
        if (!password) { showPopup(t.login.passwordRequired); return false; }
        if (password.length < 6) { showPopup(t.login.passwordShort); return false; }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const valid = validate();
        if (!valid) return;
        try {
            const response = await api.post('auth/login', { email, password });
            const { user } = response.data;
            login(user);
            const path = user.role === 'admin' ? '/admin/dashboard' : '/client/dashboard';
            navigate(path, { replace: true });
        } catch (err) {
            showPopup(err.response?.data?.error || t.login.failed);
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div className="login-container">
            {popup && <div className={`login-popup${popupFading ? ' fading' : ''}`}>{popup}</div>}
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
