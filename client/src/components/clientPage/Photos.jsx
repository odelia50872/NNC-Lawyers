import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import useDocuments from '../../hooks/useDocuments';
import { useLang } from '../../context/LanguageContext';
import '../../styles/RentalAgreements.css';

function Photos() {
    const { t } = useLang();
    const { user } = useAuth();
    const { docs, byYear, years } = useDocuments('photos', user?.id);
    const [lightbox, setLightbox] = useState(null); // { url, title }

    if (docs.length === 0) return <p className="agreements-empty">{t.photos?.empty || 'אין תמונות'}</p>;

    return (
        <div className="agreements-container">
            {years.map(year => (
                <div key={year} className="agreements-year-group">
                    <div className="agreements-year-badge">{year}</div>
                    <div className="photos-grid">
                        {byYear[year].map(doc => (
                            <div key={doc.id} className="photo-card" onClick={() => setLightbox(doc)}>
                                <img src={doc.file_url} alt={doc.title} className="photo-thumb" />
                                <span className="photo-title">{doc.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {lightbox && (
                <div className="photo-lightbox" onClick={() => setLightbox(null)}>
                    <div className="photo-lightbox-inner" onClick={e => e.stopPropagation()}>
                        <button className="photo-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
                        <img src={lightbox.file_url} alt={lightbox.title} />
                        <p>{lightbox.title}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Photos;
