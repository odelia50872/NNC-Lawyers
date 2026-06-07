import { useEffect, useState } from 'react';
import { api } from '../../API/APIService';
import AdminDocSection from '../../components/admin/AdminDocSection';
import '../../styles/AdminDashboard.css';

function AdminDashboard() {
    const [clients, setClients] = useState([]);
    const [activeTab, setActiveTab] = useState('reports');

    useEffect(() => {
        api.get('clients').then(res => setClients(res.data.filter(c => c.role === 'client')));
    }, []);

    const tabs = [
        { key: 'reports',   label: 'דוחות כספיים' },
        { key: 'agreements',label: 'הסכמי שכירות' },
        { key: 'insurance', label: 'פוליסות ביטוח' },
        { key: 'identity',  label: 'תעודות זהות' },
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
                {activeTab === 'reports'    && <AdminDocSection clients={clients} endpoint="financial-reports"  title="דוחות כספיים"   icon="📊" accept=".xlsx,.xls,.pdf" />}
                {activeTab === 'agreements' && <AdminDocSection clients={clients} endpoint="rental-agreements"  title="הסכמי שכירות"  icon="📄" accept=".pdf" />}
                {activeTab === 'insurance'  && <AdminDocSection clients={clients} endpoint="insurance-policies" title="פוליסות ביטוח"  icon="🛡️" accept=".pdf" />}
                {activeTab === 'identity'   && <AdminDocSection clients={clients} endpoint="identity-documents" title="תעודות זהות"    icon="🪪" accept=".pdf" />}
            </div>
        </div>
    );
}

export default AdminDashboard;
