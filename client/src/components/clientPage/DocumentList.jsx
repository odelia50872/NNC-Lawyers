import { useAuth } from '../../context/AuthContext';
import useDocuments from '../../hooks/useDocuments';
import '../../styles/RentalAgreements.css';

function DocumentList({ endpoint, emptyText, icon, groupByYear = true, title, hideTitle = false }) {
    const { user } = useAuth();
    const { docs, byYear, years } = useDocuments(endpoint, user?.id);

    const renderItem = doc => (
        <li key={doc.id} className="agreements-item">
            <a href={doc.file_url} target="_blank" rel="noreferrer">
                {icon} {doc.title}
            </a>
        </li>
    );

    const renderContent = () => {
        if (docs.length === 0) {
            return <p className="agreements-empty">{emptyText}</p>;
        }
        
        if (groupByYear) {
            return years.map(year => (
                <div key={year} className="agreements-year-group">
                    <div className="agreements-year-badge">{year}</div>
                    <ul className="agreements-list">{byYear[year].map(renderItem)}</ul>
                </div>
            ));
        }
        
        return <ul className="agreements-list">{docs.map(renderItem)}</ul>;
    };

    return (
        <div className={hideTitle ? '' : 'agreements-container'}>
            {title && !hideTitle && <h2 className="documents-title">{title}</h2>}
            {renderContent()}
        </div>
    );
}

export default DocumentList;
