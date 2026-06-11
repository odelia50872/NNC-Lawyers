import { useEffect, useState, useRef, useCallback } from 'react';
import { api } from '../../API/APIService';
import { useNotify } from '../notifications/NotificationContext';
import { useLang } from '../../context/LanguageContext';
import { FaTrashAlt, FaUserPlus } from 'react-icons/fa';
import generatePassword from 'generate-password-browser';
import useAdminAuth from '../../hooks/useAdminAuth.jsx';
import '../../styles/AdminAddClient.css';

function AdminAddClient({ onClientChange = () => {} }) {
    const [clients, setClients] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const listRef = useRef(null);
    const LIMIT = 5;
    const [form, setForm] = useState({ full_name: '', email: '', emailLang: 'he' });
    const notify = useNotify();
    const { t } = useLang();
    const { requireAuth, PasswordModal } = useAdminAuth();

    const fetchClients = useCallback(async (reset = false) => {
        const currentOffset = reset ? 0 : offset;
        setLoadingMore(true);
        try {
            const res = await api.get('clients/paginated', { limit: LIMIT, offset: currentOffset });
            const { clients: newClients, total } = res.data;
            setClients(prev => reset ? newClients : [...prev, ...newClients]);
            setOffset(currentOffset + newClients.length);
            setHasMore(currentOffset + newClients.length < total);
        } finally {
            setLoadingMore(false);
        }
    }, [offset]);

    useEffect(() => { fetchClients(true); }, []);

    useEffect(() => {
        const el = listRef.current;
        if (!el) return;
        const handleScroll = () => {
            if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10 && hasMore && !loadingMore)
                fetchClients();
        };
        el.addEventListener('scroll', handleScroll);
        return () => el.removeEventListener('scroll', handleScroll);
    }, [hasMore, loadingMore, fetchClients]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        requireAuth(async () => {
            const password = generatePassword.generate({ length: 8, numbers: true, symbols: true, uppercase: true, strict: true });
            await api.post('clients', { ...form, password });
            await api.post('contact/welcome', { name: form.full_name, email: form.email, password, lang: form.emailLang });
            await fetchClients(true);
            onClientChange();
            setForm({ full_name: '', email: '', emailLang: 'he' });
            notify(t.adminAddClient.success, 'success');
        });
    };

    const handleDelete = (id) => {
        requireAuth(async () => {
            await api.delete('clients', id);
            await fetchClients(true);
            onClientChange();
            notify(t.adminAddClient.deleteSuccess, 'success');
        });
    };

    return (
        <div className="admin-client-section">
            <div className="admin-client-form-card">
                <div className="admin-client-form-header">
                    <FaUserPlus className="admin-client-icon" />
                    <h2>{t.adminAddClient.title}</h2>
                </div>
                <form className="admin-client-form" onSubmit={handleSubmit}>
                    <input type="text" name="full_name" placeholder={t.adminAddClient.fullName} required value={form.full_name} onChange={handleChange} />
                    <input type="email" name="email" placeholder={t.adminAddClient.email} required value={form.email} onChange={handleChange} />
                    <select name="emailLang" value={form.emailLang} onChange={handleChange} className="admin-client-lang-select">
                        <option value="he">{t.adminAddClient.emailLangHe}</option>
                        <option value="fr">{t.adminAddClient.emailLangFr}</option>
                    </select>
                    <button type="submit" className="admin-client-submit-btn">{t.adminAddClient.submit}</button>
                </form>
            </div>

            <div className="admin-client-list-card">
                <h3>{t.adminAddClient.existing}</h3>
                <ul className="admin-client-list" ref={listRef}>
                    {clients.map(c => (
                        <li key={c.id} className="admin-client-item">
                            <div className="admin-client-info">
                                <span className="admin-client-name">{c.full_name}</span>
                                <span className="admin-client-email">{c.email}</span>
                            </div>
                            <button className="admin-reports-del-btn" onClick={() => handleDelete(c.id)} title={t.confirm.deleteTooltip}>
                                <FaTrashAlt />
                            </button>
                        </li>
                    ))}
                    {loadingMore && <li className="admin-client-loading">...</li>}
                </ul>
            </div>

            {PasswordModal}
        </div>
    );
}

export default AdminAddClient;
