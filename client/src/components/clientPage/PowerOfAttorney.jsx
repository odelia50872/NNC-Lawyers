import DocumentList from './DocumentList';
import { useLang } from '../../context/LanguageContext';

function PowerOfAttorney() {
    const { t } = useLang();
    return <DocumentList endpoint="power-of-attorney" emptyText={t.powerOfAttorney?.empty || 'אין יפויי כח'} icon="📋" />;
}

export default PowerOfAttorney;
