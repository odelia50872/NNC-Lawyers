import { useLang } from '../../context/LanguageContext';
import useTabsNav from '../../hooks/useTabsNav';
import RentalAgreements from '../../components/clientPage/RentalAgreements';
import FinancialReports from '../../components/clientPage/FinancialReports';
import InsurancePolicy from '../../components/clientPage/InsurancePolicy';
import IdentityDocuments from '../../components/clientPage/IdentityDocuments';
import PowerOfAttorney from '../../components/clientPage/PowerOfAttorney';
import Photos from '../../components/clientPage/Photos';
import Miscellaneous from '../../components/clientPage/Miscellaneous';
import '../../styles/ClientDashboard.css';

function ClientDashboard() {
    const { t } = useLang();
    const tabs = [
        { key: 'reports',    label: t.dashboard.reports },
        { key: 'agreements', label: t.dashboard.agreements },
        { key: 'insurance',  label: t.dashboard.insurance },
        { key: 'identity',   label: t.dashboard.identity },
        { key: 'poa',        label: t.dashboard.poa || 'יפוי כח' },
        { key: 'photos',     label: t.dashboard.photos || 'תמונות' },
        { key: 'misc',       label: t.dashboard.misc || 'שונות' },
    ];
    const { activeTab, setActiveTab } = useTabsNav(tabs);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">{t.dashboard.title}</h1>
            <div className="dashboard-tabs" role="tablist" aria-label={t.dashboard.title}>
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        className={`dashboard-tab${activeTab === tab.key ? ' active' : ''}`}
                        onClick={() => setActiveTab(tab.key)}
                        role="tab"
                        aria-selected={activeTab === tab.key}
                        aria-controls={`tabpanel-${tab.key}`}
                        id={`tab-${tab.key}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="dashboard-content">
                {tabs.map(tab => (
                    <div
                        key={tab.key}
                        id={`tabpanel-${tab.key}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${tab.key}`}
                        hidden={activeTab !== tab.key}
                    >
                        {activeTab === tab.key && (
                            <>
                                {tab.key === 'reports'    && <FinancialReports />}
                                {tab.key === 'agreements' && <RentalAgreements />}
                                {tab.key === 'insurance'  && <InsurancePolicy />}
                                {tab.key === 'identity'   && <IdentityDocuments />}
                                {tab.key === 'poa'        && <PowerOfAttorney />}
                                {tab.key === 'photos'     && <Photos />}
                                {tab.key === 'misc'       && <Miscellaneous />}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ClientDashboard;
