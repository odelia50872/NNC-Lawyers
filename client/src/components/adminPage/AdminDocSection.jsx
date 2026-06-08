import { useEffect, useState } from 'react';
import axios from 'axios';
import { api } from '../../API/APIService';

function AdminDocSection({ clients, endpoint, title, icon, accept }) {
    const [docs, setDocs] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    const [docTitle, setDocTitle] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());
    const [file, setFile] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (!selectedClient) return setDocs([]);
        api.get(`${endpoint}/${selectedClient}`).then(res => setDocs(res.data));
    }, [selectedClient, endpoint]);

    const byYear = docs.reduce((acc, r) => {
        acc[r.year] = acc[r.year] || [];
        acc[r.year].push(r);
        return acc;
    }, {});
    const years = Object.keys(byYear).sort((a, b) => b - a);

    const handleSubmit = async (e) => {
        e.preventDefault();
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
    };

    const handleDelete = async (id) => {
        if (!confirm('למחוק?')) return;
        await api.delete(endpoint, id);
        setDocs(prev => prev.filter(d => d.id !== id));
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
                                <button className="admin-reports-del-btn" onClick={() => handleDelete(d.id)}>🗑</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default AdminDocSection;
