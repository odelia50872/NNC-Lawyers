import DocumentList from './DocumentList';
import { useLang } from '../../context/LanguageContext';

function FinancialReports() {
    const { t } = useLang();
    return <DocumentList endpoint="financial-reports" emptyText={t.financialReports.empty} icon="📊" />;
}

export default FinancialReports;
