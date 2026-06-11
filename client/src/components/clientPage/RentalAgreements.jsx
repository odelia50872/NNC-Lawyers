import DocumentList from './DocumentList';
import { useLang } from '../../context/LanguageContext';

function RentalAgreements() {
    const { t } = useLang();
    return <DocumentList endpoint="rental-agreements" emptyText={t.rentalAgreements.empty} icon="📄" />;
}

export default RentalAgreements;
