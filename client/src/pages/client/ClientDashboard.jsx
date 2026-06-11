import { useLang } from '../../context/LanguageContext';
import useTabsNav from '../../hooks/useTabsNav';
import RentalAgreements from '../../components/clientPage/RentalAgreements';
import FinancialReports from '../../components/clientPage/FinancialReports';
import InsurancePolicy from '../../components/clientPage/InsurancePolicy';
import IdentityDocuments from '../../components/clientPage/IdentityDocuments';
import '../../styles/ClientDashboard.css';

function ClientDashboard() {
    const { t } = useLang();
    const tabs = [
        { key: 'reports',    label: t.dashboard.reports },
        { key: 'agreements', label: t.dashboard.agreements },
        { key: 'insurance',  label: t.dashboard.insurance },
        { key: 'identity',   label: t.dashboard.identity },
    ];
    const { activeTab, setActiveTab } = useTabsNav(tabs);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">{t.dashboard.title}</h1>
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
            <div className="dashboard-content">
                {activeTab === 'reports'    && <FinancialReports />}
                {activeTab === 'agreements' && <RentalAgreements />}
                {activeTab === 'insurance'  && <InsurancePolicy />}
                {activeTab === 'identity'   && <IdentityDocuments />}
            </div>
        </div>
    );
}

export default ClientDashboard;
