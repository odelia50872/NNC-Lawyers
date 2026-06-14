import { useAuth } from '../../context/AuthContext';
import useDocuments from '../../hooks/useDocuments';
import { useLang } from '../../context/LanguageContext';
import '../../styles/RentalAgreements.css';

function IdentityDocuments() {
    const { t } = useLang();
    const { user } = useAuth();
    const { docs } = useDocuments('identity-documents', user?.id);

    if (docs.length === 0) {
        return <p className="agreements-empty">{t.identityDocuments.empty}</p>;
    }

    return (
        <div className="agreements-container">
            <div className="agreements-year-group">
                <div className="agreements-year-badge">{t.identityDocuments.title}</div>
                <ul className="agreements-list">
                    {docs.map(doc => (
                        <li key={doc.id} className="agreements-item">
                            <a href={doc.file_url} target="_blank" rel="noreferrer">
                                🪪 {doc.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default IdentityDocuments;
