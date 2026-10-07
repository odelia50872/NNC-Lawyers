import { useState } from 'react';
import AdminDocSection from '../../components/adminPage/AdminDocSection';
import AdminAddClient from '../../components/adminPage/AdminAddClient';
import AdminLegalArticle from '../../components/adminPage/AdminLegalArticle';
import { useLang } from '../../context/LanguageContext';
import useTabsNav from '../../hooks/useTabsNav';
import { FaUsers, FaFolderOpen } from 'react-icons/fa';
import '../../styles/AdminDashboard.css';

function AdminDashboard() {
    const { t, lang } = useLang();


    const mainTabs = [
        { key: 'clients', label: t.adminAddClient.manageClients, icon: <FaUsers /> },
        { key: 'docs',    label: t.adminAddClient.manageDocs,    icon: <FaFolderOpen /> },
        { key: 'legal', label: t.adminAddClient.manageLegal, icon: <FaFolderOpen /> },
    ];

    const docTabs = [
        { key: 'reports',    label: t.dashboard.reports },
        { key: 'agreements', label: t.dashboard.agreements },
        { key: 'insurance',  label: t.dashboard.insurance },
        { key: 'identity',   label: t.dashboard.identity },
        { key: 'poa',        label: t.dashboard.poa || 'יפוי כח' },
        { key: 'photos',     label: t.dashboard.photos || 'תמונות' },
        { key: 'misc',       label: t.dashboard.misc || 'שונות' },
    ];

    const { activeTab: mainTab, setActiveTab: setMainTab } = useTabsNav(mainTabs);
    const { activeTab: docTab, setActiveTab: setDocTab } = useTabsNav(docTabs);

    return (
        <div className="admin-dashboard">
            <h1>{t.adminAddClient.controlPanel}</h1>

            <div className="admin-main-tabs">
                {mainTabs.map(tab => (
                    <button
                        key={tab.key}
                        className={`admin-main-tab${mainTab === tab.key ? ' active' : ''}`}
                        onClick={() => setMainTab(tab.key)}
                    >
                        <span className="admin-main-tab-icon">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {mainTab === 'clients' && (
                <div className="admin-section">
                    <div className="admin-section-content">
                        <AdminAddClient />
                    </div>
                </div>
            )}

            {mainTab === 'docs' && (
                <div className="admin-section">
                    <div className="dashboard-tabs" style={lang === 'fr' ? { direction: 'ltr' } : {}}>
                        {docTabs.map(tab => (
                            <button
                                key={tab.key}
                                className={`dashboard-tab${docTab === tab.key ? ' active' : ''}`}
                                onClick={() => setDocTab(tab.key)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="admin-section-content">
                        {docTab === 'reports'    && <AdminDocSection endpoint="financial-reports"   title={t.dashboard.reports}    icon="📊" accept=".xlsx,.xls,.pdf" />}
                        {docTab === 'agreements' && <AdminDocSection endpoint="rental-agreements"   title={t.dashboard.agreements} icon="📄" accept=".pdf" />}
                        {docTab === 'insurance'  && <AdminDocSection endpoint="insurance-policies"  title={t.dashboard.insurance}  icon="🛡️" accept=".pdf" />}
                        {docTab === 'identity'   && <AdminDocSection endpoint="identity-documents"  title={t.dashboard.identity}   icon="🪪" accept=".pdf" />}
                        {docTab === 'poa'        && <AdminDocSection endpoint="power-of-attorney"   title={t.dashboard.poa || 'יפוי כח'}   icon="📋" accept=".pdf,.png,.jpg,.jpeg" />}
                        {docTab === 'photos'     && <AdminDocSection endpoint="photos"              title={t.dashboard.photos || 'תמונות'}  icon="🖼️" accept=".pdf,.png,.jpg,.jpeg" />}
                        {docTab === 'misc'       && <AdminDocSection endpoint="miscellaneous"       title={t.dashboard.misc || 'שונות'}     icon="📁" accept=".pdf,.xlsx,.xls,.png,.jpg,.jpeg" />}
                    </div>
                </div>
            )}
            {mainTab === 'legal' && (<AdminLegalArticle />)}
        </div>
    );
}

export default AdminDashboard;
