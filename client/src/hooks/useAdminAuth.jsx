import { useState } from 'react';
import { api } from '../API/APIService';
import { useLang } from '../context/LanguageContext';

function useAdminAuth() {
    const [pendingFn, setPendingFn] = useState(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useLang();

    const requireAuth = (fn) => setPendingFn(() => fn);

    const cancel = () => { setPendingFn(null); setPassword(''); setError(false); setShowPassword(false); };

    const confirm = async () => {
        try {
            await api.post('auth/verify-password', { password });
        } catch {
            setError(true);
            return;
        }
        await pendingFn();
        cancel();
    };

    const PasswordModal = pendingFn ? (
        <div className="admin-modal-overlay confirm" onClick={cancel}>
            <div className="admin-modal" onClick={e => e.stopPropagation()}>
                <button className="admin-modal-close" onClick={cancel}>✕</button>
                <h3>{t.adminAddClient.adminPasswordLabel}</h3>
                <div className="password-wrapper">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className={`admin-client-password-input${error ? ' error' : ''}`}
                        placeholder={t.adminAddClient.adminPasswordLabel}
                        value={password}
                        onChange={e => { setPassword(e.target.value); setError(false); }}
                        autoFocus
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
                {error && <span className="admin-client-password-error">{t.adminAddClient.adminPasswordError}</span>}
                <div className="admin-modal-actions">
                    <button className="admin-reports-add-btn" onClick={cancel}>{t.confirm.cancel}</button>
                    <button className="admin-reports-save-btn" onClick={confirm}>{t.confirm.approve}</button>
                </div>
            </div>
        </div>
    ) : null;

    return { requireAuth, PasswordModal };
}

export default useAdminAuth;
