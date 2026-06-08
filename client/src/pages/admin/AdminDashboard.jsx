import { useEffect, useState } from 'react';
import { api } from '../../API/APIService';
import AdminDocSection from '../../components/adminPage/AdminDocSection';
import { useLang } from '../../context/LanguageContext';
import '../../styles/AdminDashboard.css';

function AdminDashboard() {
    const [clients, setClients] = useState([]);
    const [activeTab, setActiveTab] = useState('reports');
    const { t } = useLang();

    useEffect(() => {
        api.get('clients').then(res => setClients(res.data.filter(c => c.role === 'client')));
    }, []);

    const tabs = [
        { key: 'reports', label: t.dashboard.reports },
        { key: 'agreements', label: t.dashboard.agreements },
        { key: 'insurance', label: t.dashboard.insurance },
        { key: 'identity', label: t.dashboard.identity },
    ];

    return (
        <div className="admin-dashboard">
            <h1>לוח בקרה - ניהול</h1>
            <div className="dashboard-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        className={`dashboard-tab${activeTab === tab.key ? ' active' : ''}`}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div style={{ marginTop: '1.5rem' }}>
                {activeTab === 'reports' && <AdminDocSection clients={clients} endpoint="financial-reports" title={t.dashboard.reports} icon="📊" accept=".xlsx,.xls,.pdf" />}
                {activeTab === 'agreements' && <AdminDocSection clients={clients} endpoint="rental-agreements" title={t.dashboard.agreements} icon="📄" accept=".pdf" />}
                {activeTab === 'insurance' && <AdminDocSection clients={clients} endpoint="insurance-policies" title={t.dashboard.insurance} icon="🛡️" accept=".pdf" />}
                {activeTab === 'identity' && <AdminDocSection clients={clients} endpoint="identity-documents" title={t.dashboard.identity} icon="🪪" accept=".pdf" />}
            </div>
        </div>
    );
}

export default AdminDashboard;
