import DocumentList from './DocumentList';
import { useLang } from '../../context/LanguageContext';

function IdentityDocuments() {
    const { t } = useLang();
    return (
        <div className="agreements-container">
            <div className="agreements-year-group">
                <div className="agreements-year-badge">{t.identityDocuments.title}</div>
                <DocumentList endpoint="identity-documents" emptyText={t.identityDocuments.empty} icon="🪪" groupByYear={false} hideTitle={true} />
            </div>
        </div>
    );
}

export default IdentityDocuments;
