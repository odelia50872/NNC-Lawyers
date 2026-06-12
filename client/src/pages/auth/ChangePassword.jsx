import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../API/APIService';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LanguageContext';
import { useNotify } from '../../components/notifications/NotificationContext';
import '../../styles/Login.css';

function ChangePassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const { t } = useLang();
    const notify = useNotify();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword.length < 6) {
            notify(t.login.passwordShort, 'error');
            return;
        }
        if (newPassword !== confirm) {
            notify(t.changePassword.mismatch, 'error');
            return;
        }
        setLoading(true);
        try {
            const res = await api.post('auth/change-password', { newPassword });
            login(res.data.user);
            notify(t.changePassword.success, 'success');
            navigate('/nnc/login', { replace: true });
        } catch {
            notify(t.changePassword.error, 'error');
        } finally {
            setLoading(false);
        }
    };

    const EyeIcon = ({ show }) => show ? (
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
    );

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>{t.changePassword.title}</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <p className="forgot-desc">{t.changePassword.desc}</p>

                    <label>{t.changePassword.newPassword}:</label>
                    <div className="password-wrapper">
                        <input
                            type={showNew ? 'text' : 'password'}
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            required
                        />
                        <button type="button" className="toggle-password" onClick={() => setShowNew(p => !p)}>
                            <EyeIcon show={showNew} />
                        </button>
                    </div>

                    <label>{t.changePassword.confirmPassword}:</label>
                    <div className="password-wrapper">
                        <input
                            type={showConfirm ? 'text' : 'password'}
                            value={confirm}
                            onChange={e => setConfirm(e.target.value)}
                            required
                        />
                        <button type="button" className="toggle-password" onClick={() => setShowConfirm(p => !p)}>
                            <EyeIcon show={showConfirm} />
                        </button>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? '...' : t.changePassword.submit}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;
