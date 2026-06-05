import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../API/APIService';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LanguageContext';
import '../../styles/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        }
    };

    return (
        <div className="login-container">
            {popup && <div className={`login-popup${popupFading ? ' fading' : ''}`}>{popup}</div>}
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
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">{t.login.submit}</button>
            </form>
        </div>
    );
}
export default Login;
