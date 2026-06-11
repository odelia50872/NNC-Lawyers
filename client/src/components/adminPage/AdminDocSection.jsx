import { useState } from 'react';
import axios from 'axios';
import { api } from '../../API/APIService';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useNotify } from '../notifications/NotificationContext';
import { useLang } from '../../context/LanguageContext';
import useDocuments from '../../hooks/useDocuments';

function AdminDocSection({ clients, endpoint, title, icon, accept }) {
    const [selectedClient, setSelectedClient] = useState('');
    const { docs, setDocs, byYear, years } = useDocuments(endpoint, selectedClient);
    const [docTitle, setDocTitle] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());
    const [file, setFile] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editDoc, setEditDoc] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editYear, setEditYear] = useState('');
    const [editFile, setEditFile] = useState(null);
    const [pendingAction, setPendingAction] = useState(null);
    const notify = useNotify();
    const { t } = useLang();

    const confirmAction = (label, fn) => setPendingAction({ label, fn });

    const executeAction = async () => {
        await pendingAction.fn();
        setPendingAction(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        confirmAction(t.confirm.addDoc, async () => {
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
            notify('המסמך נוסף בהצלחה', 'success');
        });
    };

    const handleDelete = (id) => {
        confirmAction(t.confirm.deleteDoc, async () => {
            await api.delete(`${endpoint}/doc`, id);
            setDocs(prev => prev.filter(d => d.id !== id));
            notify('המסמך נמחק בהצלחה', 'success');
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
        confirmAction(t.confirm.saveChanges, async () => {
            const formData = new FormData();
            formData.append('title', editTitle);
            formData.append('year', editYear);
            if (editFile) formData.append('file', editFile);
            await axios.put(`${import.meta.env.VITE_API_URL}/${endpoint}/doc/${editDoc.id}`, formData, { withCredentials: true });
            const res = await api.get(`${endpoint}/${selectedClient}`);
            setDocs(res.data);
            setEditDoc(null);
            notify('המסמך עודכן בהצלחה', 'success');
        });
    };

    return (
        <div className="admin-reports">
            <div className="admin-reports-header">
                <h2>{title}</h2>
                <select value={selectedClient} onChange={e => setSelectedClient(e.target.value)} className="admin-reports-select">
                    <option value="">בחר לקוח...</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.full_name}</option>)}
                </select>
                {selectedClient && (
                    <button className="admin-reports-add-btn" onClick={() => setShowForm(v => !v)}>
                        {showForm ? 'ביטול' : '+ הוסף'}
                    </button>
                )}
            </div>

            {showForm && (
                <form className="admin-reports-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="כותרת" required value={docTitle} onChange={e => setDocTitle(e.target.value)} />
                    <input type="number" placeholder="שנה" required value={year} onChange={e => setYear(e.target.value)} />
                    <input type="file" accept={accept} required onChange={e => setFile(e.target.files[0])} />
                    <button type="submit" className="admin-reports-save-btn">שמור</button>
                </form>
            )}

            {selectedClient && years.length === 0 && <p className="agreements-empty">אין מסמכים ללקוח זה</p>}

            {years.map(y => (
                <div key={y} className="agreements-year-group">
                    <div className="agreements-year-badge">{y}</div>
                    <ul className="agreements-list">
                        {byYear[y].map(d => (
                            <li key={d.id} className="agreements-item">
                                <a href={d.file_url} target="_blank" rel="noreferrer">{icon} {d.title}</a>
                                <div className="admin-doc-actions">
                                    <button className="admin-edit-btn" onClick={() => openEdit(d)} title="עדכן"><FaEdit /></button>
                                    <button className="admin-reports-del-btn" onClick={() => handleDelete(d.id)} title="מחק"><FaTrashAlt /></button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            {pendingAction && (
                <div className="admin-modal-overlay confirm" onClick={() => setPendingAction(null)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()}>
                        <button className="admin-modal-close" onClick={() => setPendingAction(null)}>✕</button>
                        <h3>{pendingAction.label}</h3>
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                            <button className="admin-reports-add-btn" onClick={() => setPendingAction(null)}>{t.confirm.cancel}</button>
                            <button className="admin-reports-save-btn" onClick={executeAction}>{t.confirm.approve}</button>
                        </div>
                    </div>
                </div>
            )}

            {editDoc && (
                <div className="admin-modal-overlay" onClick={() => setEditDoc(null)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()}>
                        <button className="admin-modal-close" onClick={() => setEditDoc(null)}>✕</button>
                        <h3>{t.confirm.updateDoc}</h3>
                        <form className="admin-reports-form" onSubmit={handleUpdate}>
                            <input type="text" placeholder="כותרת" required value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                            <input type="number" placeholder="שנה" required value={editYear} onChange={e => setEditYear(e.target.value)} />
                            <input type="file" accept={accept} onChange={e => setEditFile(e.target.files[0])} />
                            <button type="submit" className="admin-reports-save-btn">עדכן</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminDocSection;
