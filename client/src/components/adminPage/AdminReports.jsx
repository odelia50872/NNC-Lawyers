import { useEffect, useState } from 'react';
import axios from 'axios';
import { api } from '../../API/APIService';

function AdminReports() {
    const [clients, setClients] = useState([]);
    const [reports, setReports] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    const [title, setTitle] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());
    const [file, setFile] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        api.get('clients').then(res => setClients(res.data.filter(c => c.role === 'client')));
    }, []);

    useEffect(() => {
        if (!selectedClient) return setReports([]);
        api.get(`financial-reports/${selectedClient}`).then(res => setReports(res.data));
    }, [selectedClient]);

    const byYear = reports.reduce((acc, r) => {
        acc[r.year] = acc[r.year] || [];
        acc[r.year].push(r);
        return acc;
    }, {});
    const years = Object.keys(byYear).sort((a, b) => b - a);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('client_id', selectedClient);
        formData.append('title', title);
        formData.append('year', year);
        formData.append('file', file);
        await axios.post(`${import.meta.env.VITE_API_URL}/financial-reports`, formData, { withCredentials: true });
        const res = await api.get(`financial-reports/${selectedClient}`);
        setReports(res.data);
        setTitle('');
        setYear(new Date().getFullYear());
        setFile(null);
        setShowForm(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('למחוק דוח זה?')) return;
        await api.delete('financial-reports', id);
        setReports(prev => prev.filter(r => r.id !== id));
    };

    return (
        <div className="admin-reports">
            <div className="admin-reports-header">
                <h2>דוחות כספיים</h2>
                <select value={selectedClient} onChange={e => setSelectedClient(e.target.value)} className="admin-reports-select">
                    <option value="">בחר לקוח...</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.full_name}</option>)}
                </select>
                {selectedClient && (
                    <button className="admin-reports-add-btn" onClick={() => setShowForm(v => !v)}>
                        {showForm ? 'ביטול' : '+ הוסף דוח'}
                    </button>
                )}
            </div>

            {showForm && (
                <form className="admin-reports-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="שם הדוח" required value={title} onChange={e => setTitle(e.target.value)} />
                    <input type="number" placeholder="שנה" required value={year} onChange={e => setYear(e.target.value)} />
                    <input type="file" accept=".xlsx,.xls,.pdf" required onChange={e => setFile(e.target.files[0])} />
                    <button type="submit" className="admin-reports-save-btn">שמור</button>
                </form>
            )}

            {selectedClient && years.length === 0 && <p className="agreements-empty">אין דוחות ללקוח זה</p>}

            {years.map(year => (
                <div key={year} className="agreements-year-group">
                    <div className="agreements-year-badge">{year}</div>
                    <ul className="agreements-list">
                        {byYear[year].map(r => (
                            <li key={r.id} className="agreements-item">
                                <a href={r.file_url} target="_blank" rel="noreferrer">
                                    📊 {r.title}
                                </a>
                                <button className="admin-reports-del-btn" onClick={() => handleDelete(r.id)}>🗑</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default AdminReports;
