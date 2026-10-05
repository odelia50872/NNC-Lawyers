import DocumentList from './DocumentList';
import { useLang } from '../../context/LanguageContext';

function Miscellaneous() {
    const { t } = useLang();
    return <DocumentList endpoint="miscellaneous" emptyText={t.miscellaneous?.empty || 'אין מסמכים'} icon="📁" />;
}

export default Miscellaneous;
