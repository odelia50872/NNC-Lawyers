import DocumentList from './DocumentList';
import { useLang } from '../../context/LanguageContext';

function InsurancePolicy() {
    const { t } = useLang();
    return <DocumentList endpoint="insurance-policies" emptyText={t.insurancePolicies.empty} icon="🛡️" />;
}

export default InsurancePolicy;
