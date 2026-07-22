import { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../../API/APIService';
import { FaTrashAlt, FaEdit, FaUpload, FaSearch } from 'react-icons/fa';
import '../../styles/AdminAddClient.css';
import { useNotify } from '../notifications/NotificationContext';
import { useLang } from '../../context/LanguageContext';
import useDocuments from '../../hooks/useDocuments';
import useAdminAuth from '../../hooks/useAdminAuth.jsx';
import useClientSearch from '../../hooks/useClientSearch';

function AdminDocSection({ endpoint, title, icon, accept, allowDelete = false }) {
    const { clientSearch, selectedClient, results, handleSearch, selectClient, clearClient, loadAll } = useClientSearch();
    const { docs, setDocs, byYear, years, loading } = useDocuments(endpoint, selectedClient);

    const [docTitle, setDocTitle] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());
    const [file, setFile] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editDoc, setEditDoc] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editYear, setEditYear] = useState('');
    const [editFile, setEditFile] = useState(null);

    const notify = useNotify();
    const { t } = useLang();
    const { requireAuth, PasswordModal } = useAdminAuth();

    useEffect(() => { loadAll(); }, [loadAll]);

    const handleSubmit = (e) => {
        e.preventDefault();
        requireAuth(async () => {
            const formData = new FormData();
            formData.append('client_id', selectedClient);
            formData.append('title', docTitle);
            formData.append('year', year);
            formData.append('file', file);
            await axios.post(`${import.meta.env.VITE_API_URL}/${endpoint}`, formData, { withCredentials: true });
            const res = await api.get(`${endpoint}/${selectedClient}`);
            setDocs(res.data);
            setDocTitle('');
            setYear(new Date().getFullYear());
            setFile(null);
            setShowForm(false);
            notify(t.confirm.docAdded, 'success');
        });
    };

    const handleDeleteDoc = (e, id) => {
        e.stopPropagation();
        requireAuth(async () => {
            await api.delete(`${endpoint}/doc/${id}`);
            setDocs(prev => prev.filter(d => d.id !== id));
            notify(t.confirm.docDeleted, 'success');
        });
    };

    const handleUpdateDoc = (e) => {
        e.preventDefault();
        requireAuth(async () => {
            const formData = new FormData();
            formData.append('title', editTitle);
            formData.append('year', editYear);
            if (editFile) formData.append('file', editFile);
            await axios.put(
                `${import.meta.env.VITE_API_URL}/${endpoint}/doc/${editDoc.id}`,
                formData,
                { withCredentials: true }
            );
            const res = await api.get(`${endpoint}/${selectedClient}`);
            setDocs(res.data);
            setEditDoc(null);
            notify(t.confirm.docUpdated, 'success');
        });
    };

    return (
        <div className="admin-reports">
            <div className="admin-reports-header">
                <h2>{title}</h2>
                <button className="admin-reports-add-btn" onClick={() => setShowForm(v => !v)}>
                    {showForm ? t.confirm.cancel : t.confirm.add}
                </button>
                <div className="admin-client-search-wrapper">
                    <div className="admin-client-search-container">
                        <FaSearch className="admin-client-search-icon" />
                        <input
                            type="text"
                            className="admin-client-search-input"
                            placeholder={t.confirm.selectClient}
                            value={clientSearch}
                            onChange={e => handleSearch(e.target.value)}
                        />
                        {clientSearch && <button className="admin-client-search-clear" onClick={clearClient}>✕</button>}
                    </div>
                </div>
            </div>

            {!selectedClient && !loading && years.length === 0 && (
                <p className="agreements-empty">{t.confirm.noDocsGlobal}</p>
            )}

            {selectedClient && (
                <div className="admin-client-actions-section" style={{ marginBottom: '1.5rem' }}>
                    {showForm && (
                        <form className="admin-reports-form" onSubmit={handleSubmit}>
                            <input type="text" placeholder={t.confirm.titlePlaceholder} required value={docTitle} onChange={e => setDocTitle(e.target.value)} />
                            <input type="number" placeholder={t.confirm.yearPlaceholder} required value={year} onChange={e => setYear(e.target.value)} />
                            <label className="admin-file-label">
                                <FaUpload style={{ marginLeft: '0.4rem' }} /> {file ? t.confirm.fileChosen : t.confirm.chooseFile}
                                <input type="file" accept={accept} required onChange={e => setFile(e.target.files[0])} />
                            </label>
                            <button type="submit" className="admin-reports-save-btn">{t.confirm.save}</button>
                        </form>
                    )}

                    {!loading && years.length === 0 && !showForm && (
                        <p className="agreements-empty">{t.confirm.noDocs}</p>
                    )}

                    {years.map(y => (
                        <div key={y} className="agreements-year-group">
                            <div className="agreements-year-badge">{y}</div>
                            <ul className="agreements-list">
                                {byYear[y].map(d => (
                                    <li key={d.id} className="agreements-item">
                                        <a href={d.file_url} target="_blank" rel="noreferrer">{icon} {d.title}</a>
                                        <div className="admin-doc-actions">
                                            <button className="admin-edit-btn" onClick={() => { setEditDoc(d); setEditTitle(d.title); setEditYear(d.year); }}><FaEdit /></button>
                                            <button className="admin-reports-del-btn" onClick={(e) => handleDeleteDoc(e, d.id)}><FaTrashAlt /></button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            <div className="admin-clients-list-container">
                {results.map(c => (
                    <div
                        key={c.id}
                        className={`admin-client-item ${selectedClient === c.id ? 'active' : ''}`}
                        onClick={() => selectClient(c)}
                    >
                        <div className="admin-client-info">
                            <span className="admin-client-name">{c.full_name}</span>
                            <span className="admin-client-email">{c.email}</span>
                        </div>
                        {allowDelete && (
                            <button className="admin-client-delete-btn" onClick={(e) => handleDeleteDoc(e, c.id)}>
                                <FaTrashAlt />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {editDoc && (
                <div className="admin-modal-overlay" onClick={() => setEditDoc(null)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()}>
                        <h3>{t.confirm.updateDoc}</h3>
                        <form className="admin-reports-form" onSubmit={handleUpdateDoc}>
                            <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                            <input type="number" value={editYear} onChange={e => setEditYear(e.target.value)} />
                            <button type="submit" className="admin-reports-save-btn">{t.confirm.update}</button>
                        </form>
                    </div>
                </div>
            )}
            {PasswordModal}
        </div>
    );
}

export default AdminDocSection;