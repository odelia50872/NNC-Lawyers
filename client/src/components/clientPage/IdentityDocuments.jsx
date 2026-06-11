import DocumentList from './DocumentList';
import { useLang } from '../../context/LanguageContext';

function IdentityDocuments() {
    const { t } = useLang();
    return <DocumentList endpoint="identity-documents" emptyText={t.identityDocuments.empty} icon="🪪" groupByYear={false} title={t.identityDocuments.title} />;
}

export default IdentityDocuments;
