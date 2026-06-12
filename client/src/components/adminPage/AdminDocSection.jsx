import { useState } from 'react';
import axios from 'axios';
import { api } from '../../API/APIService';
import { FaTrashAlt, FaEdit, FaUpload } from 'react-icons/fa';
import { useNotify } from '../notifications/NotificationContext';
import { useLang } from '../../context/LanguageContext';
import useDocuments from '../../hooks/useDocuments';
import useAdminAuth from '../../hooks/useAdminAuth.jsx';
import useClientSearch from '../../hooks/useClientSearch';

function AdminDocSection({ endpoint, title, icon, accept }) {
    const { clientSearch, selectedClient, results, showDropdown, setShowDropdown, handleSearch, selectClient, clearClient } = useClientSearch();
    const { docs, setDocs, byYear, years } = useDocuments(endpoint, selectedClient);
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

    const handleDelete = (id) => {
        requireAuth(async () => {
            await api.delete(`${endpoint}/doc`, id);
            setDocs(prev => prev.filter(d => d.id !== id));
            notify(t.confirm.docDeleted, 'success');
        });
    };

    const openEdit = (doc) => {
        setEditDoc(doc);
        setEditTitle(doc.title);
        setEditYear(doc.year);
        setEditFile(null);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        requireAuth(async () => {
            const formData = new FormData();
            formData.append('title', editTitle);
            formData.append('year', editYear);
            if (editFile) formData.append('file', editFile);
            await axios.put(`${import.meta.env.VITE_API_URL}/${endpoint}/doc/${editDoc.id}`, formData, { withCredentials: true });
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
                <div className="admin-client-search-wrapper">
                    <input
                        type="text"
                        className="admin-client-search-input"
                        placeholder={t.confirm.selectClient}
                        value={clientSearch}
                        onChange={e => handleSearch(e.target.value)}
                        onFocus={() => results.length > 0 && setShowDropdown(true)}
                        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                    />
                    {clientSearch && <button className="admin-client-search-clear" onClick={clearClient}>✕</button>}
                    {showDropdown && results.length > 0 && (
                        <ul className="admin-client-search-dropdown">
                            {results.map(c => (
                                <li key={c.id} onMouseDown={() => selectClient(c)}>{c.full_name}</li>
                            ))}
                        </ul>
                    )}
                </div>
                {selectedClient && (
                    <button className="admin-reports-add-btn" onClick={() => setShowForm(v => !v)}>
                        {showForm ? t.confirm.cancel : t.confirm.add}
                    </button>
                )}
            </div>

            {showForm && (
                <form className="admin-reports-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder={t.confirm.titlePlaceholder} required value={docTitle} onChange={e => setDocTitle(e.target.value)} />
                    <input type="number" placeholder={t.confirm.yearPlaceholder} required value={year} onChange={e => setYear(e.target.value)} />
                    <label className="admin-file-label">
                        <FaUpload style={{ marginLeft: '0.4rem' }} />
                        {file ? t.confirm.fileChosen : t.confirm.chooseFile}
                        <input type="file" accept={accept} required onChange={e => setFile(e.target.files[0])} />
                    </label>
                    <button type="submit" className="admin-reports-save-btn">{t.confirm.save}</button>
                </form>
            )}

            {selectedClient && years.length === 0 && <p className="agreements-empty">{t.confirm.noDocs}</p>}

            {years.map(y => (
                <div key={y} className="agreements-year-group">
                    <div className="agreements-year-badge">{y}</div>
                    <ul className="agreements-list">
                        {byYear[y].map(d => (
                            <li key={d.id} className="agreements-item">
                                <a href={d.file_url} target="_blank" rel="noreferrer">{icon} {d.title}</a>
                                <div className="admin-doc-actions">
                                    <button className="admin-edit-btn" onClick={() => openEdit(d)} title={t.confirm.editTooltip} aria-label={`${t.confirm.editTooltip} ${d.title}`}><FaEdit aria-hidden="true" /></button>
                                    <button className="admin-reports-del-btn" onClick={() => handleDelete(d.id)} title={t.confirm.deleteTooltip} aria-label={`${t.confirm.deleteTooltip} ${d.title}`}><FaTrashAlt aria-hidden="true" /></button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            {editDoc && (
                <div className="admin-modal-overlay" onClick={() => setEditDoc(null)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()}>
                        <button className="admin-modal-close" onClick={() => setEditDoc(null)}>✕</button>
                        <h3>{t.confirm.updateDoc}</h3>
                        <form className="admin-reports-form" onSubmit={handleUpdate}>
                            <input type="text" placeholder={t.confirm.titlePlaceholder} required value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                            <input type="number" placeholder={t.confirm.yearPlaceholder} required value={editYear} onChange={e => setEditYear(e.target.value)} />
                            <label className="admin-file-label">
                                <FaUpload style={{ marginLeft: '0.4rem' }} />
                                {editFile ? t.confirm.fileChosen : t.confirm.chooseFile}
                                <input type="file" accept={accept} onChange={e => setEditFile(e.target.files[0])} />
                            </label>
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
