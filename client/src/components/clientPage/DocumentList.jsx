import { useAuth } from '../../context/AuthContext';
import useDocuments from '../../hooks/useDocuments';
import '../../styles/RentalAgreements.css';

function DocumentList({ endpoint, emptyText, icon, groupByYear = true, title }) {
    const { user } = useAuth();
    const { docs, byYear, years } = useDocuments(endpoint, user?.id);

    const renderItem = doc => (
        <li key={doc.id} className="agreements-item">
            <a href={doc.file_url} target="_blank" rel="noreferrer">
                {icon} {doc.title}
            </a>
        </li>
    );

    return (
        <div className="agreements-container">
            {title && <h2 className="documents-title">{title}</h2>}
            {docs.length === 0 && <p className="agreements-empty">{emptyText}</p>}
            {groupByYear
                ? years.map(year => (
                      <div key={year} className="agreements-year-group">
                          <div className="agreements-year-badge">{year}</div>
                          <ul className="agreements-list">{byYear[year].map(renderItem)}</ul>
                      </div>
                  ))
                : <ul className="agreements-list">{docs.map(renderItem)}</ul>
            }
        </div>
    );
}

export default DocumentList;
