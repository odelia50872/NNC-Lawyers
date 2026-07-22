import { useEffect, useState, useRef, useCallback } from 'react';
import { api } from '../../API/APIService';
import { useNotify } from '../notifications/NotificationContext';
import { useLang } from '../../context/LanguageContext';
import { FaTrashAlt, FaUserPlus, FaSearch } from 'react-icons/fa';
import useAdminAuth from '../../hooks/useAdminAuth.jsx';
import '../../styles/AdminAddClient.css';

function AdminAddClient({ onClientChange = () => { } }) {
    const [clients, setClients] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const listRef = useRef(null);
    const searchTimeout = useRef(null);
    const offsetRef = useRef(0);
    const hasMoreRef = useRef(true);
    const loadingRef = useRef(false);
    const isSearchingRef = useRef(false);
    const LIMIT = 5;
    const [form, setForm] = useState({ full_name: '', email: '', emailLang: 'he' });
    const notify = useNotify();
    const { t } = useLang();
    const { requireAuth, PasswordModal } = useAdminAuth();

    const fetchClients = useCallback(async (reset = false, query = '') => {
        if (loadingRef.current) return;
        if (!reset && !hasMoreRef.current) return;
        loadingRef.current = true;
        setLoadingMore(true);
        try {
            if (query.trim()) {
                const res = await api.get('clients/search', { q: query });
                const sortedData = [...res.data].sort((a, b) => a.full_name.localeCompare(b.full_name));
                setClients(sortedData);
                hasMoreRef.current = false;
                offsetRef.current = 0;
                isSearchingRef.current = true;
                setIsSearching(true);
            } else {
                const currentOffset = reset ? 0 : offsetRef.current;
                const res = await api.get('clients/paginated', { limit: LIMIT, offset: currentOffset });
                const { clients: newClients, total } = res.data;
                const sortedData = [...newClients].sort((a, b) => a.full_name.localeCompare(b.full_name));
                setClients(prev => {
                    const updatedList = reset ? sortedData : [...prev, ...sortedData];
                    return reset ? updatedList : updatedList.sort((a, b) => a.full_name.localeCompare(b.full_name));
                }); offsetRef.current = currentOffset + newClients.length;
                hasMoreRef.current = offsetRef.current < total;
                isSearchingRef.current = false;
                setIsSearching(false);
            }
        } finally {
            loadingRef.current = false;
            setLoadingMore(false);
        }
    }, []);

    useEffect(() => { fetchClients(true); }, []);

    useEffect(() => {
        const el = listRef.current;
        if (!el) return;
        const handleScroll = () => {
            if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10 && !isSearchingRef.current)
                fetchClients();
        };
        el.addEventListener('scroll', handleScroll);
        return () => el.removeEventListener('scroll', handleScroll);
    }, [fetchClients]);

    useEffect(() => {
        const el = listRef.current;
        if (!el) return;
        if (el.scrollHeight <= el.clientHeight && hasMoreRef.current && !loadingRef.current && !isSearchingRef.current)
            fetchClients();
    });

    const handleSearchInput = (value) => {
        setSearchQuery(value);
        clearTimeout(searchTimeout.current);

        if (!value.trim()) {
            fetchClients(true);
            return;
        }

        searchTimeout.current = setTimeout(() => {
            fetchClients(true, value);
        }, 300);
    };

    const clearSearch = () => {
        setSearchQuery('');
        fetchClients(true);
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        requireAuth(async () => {
            try {
                await api.post('clients', { ...form });
                if (searchQuery.trim()) {
                    await fetchClients(true, searchQuery);
                } else {
                    await fetchClients(true);
                }
                onClientChange();
                setForm({ full_name: '', email: '', emailLang: 'he' });
                notify(t.adminAddClient.success, 'success');
            } catch (error) {
                if (error.response?.status === 409 && error.response?.data?.error === 'EMAIL_ALREADY_EXISTS') {
                    notify(t.adminAddClient.emailExists, 'error');
                } else {
                    notify(t.adminAddClient.error, 'error');
                }
            }
        });
    };

    const handleDelete = (id) => {
        requireAuth(async () => {
            await api.delete(`clients/${id}`);
            if (searchQuery.trim()) {
                await fetchClients(true, searchQuery);
            } else {
                await fetchClients(true);
            }
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
                <div className="admin-client-list-header">
                    <h3>{t.adminAddClient.existing}</h3>
                    <div className="admin-client-search-wrapper">
                        <div className="admin-client-search-container">
                            <FaSearch className="admin-client-search-icon" />
                            <input
                                type="text"
                                className="admin-client-search-input"
                                placeholder={t.adminAddClient.searchPlaceholder || 'חיפוש לקוח...'}
                                value={searchQuery}
                                onChange={e => handleSearchInput(e.target.value)}
                            />
                            {searchQuery && (
                                <button className="admin-client-search-clear" onClick={clearSearch}>✕</button>
                            )}
                        </div>
                    </div>
                </div>
                <ul className="admin-client-list" ref={listRef}>
                    {clients.map(c => (
                        <li key={c.id} className="admin-client-item">
                            <div className="admin-client-info">
                                <span className="admin-client-name">{c.full_name}</span>
                                <span className="admin-client-email">{c.email}</span>
                            </div>
                            <button className="admin-reports-del-btn" onClick={() => handleDelete(c.id)} title={t.confirm.deleteTooltip} aria-label={`${t.confirm.deleteTooltip} ${c.full_name}`}>
                                <FaTrashAlt aria-hidden="true" />
                            </button>
                        </li>
                    ))}
                    {loadingMore && <li className="admin-client-loading">...</li>}
                    {clients.length === 0 && !loadingMore && (
                        <li className="admin-client-no-results">
                            {searchQuery ? t.adminAddClient.noResults : t.adminAddClient.noClients}
                        </li>
                    )}
                </ul>
            </div>

            {PasswordModal}
        </div>
    );
}

export default AdminAddClient;
