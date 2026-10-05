import DocumentList from './DocumentList';
import { useLang } from '../../context/LanguageContext';

function Photos() {
    const { t } = useLang();
    return <DocumentList endpoint="photos" emptyText={t.photos?.empty || 'אין תמונות'} icon="🖼️" />;
}

export default Photos;
