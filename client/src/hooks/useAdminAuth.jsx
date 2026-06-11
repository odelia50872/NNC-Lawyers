import { useState } from 'react';
import { api } from '../API/APIService';
import { useLang } from '../context/LanguageContext';

function useAdminAuth() {
    const [pendingFn, setPendingFn] = useState(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const { t } = useLang();

    const requireAuth = (fn) => setPendingFn(() => fn);

    const cancel = () => { setPendingFn(null); setPassword(''); setError(false); };

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
                <input
                    type="password"
                    className={`admin-client-password-input${error ? ' error' : ''}`}
                    placeholder={t.adminAddClient.adminPasswordLabel}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(false); }}
                    autoFocus
                />
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
