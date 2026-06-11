import { useState, useEffect } from 'react';
import { api } from '../API/APIService';
import { useLang } from '../context/LanguageContext';
import { useNotify } from './notifications/NotificationContext';

function LegalArticles() {
    const [articles, setArticles] = useState([]);
    const [expanded, setExpanded] = useState(null);
    const { t, lang } = useLang();
    const notify = useNotify();

    useEffect(() => {
        api.get('legal-articles')
            .then(res => setArticles(res.data))
            .catch(() => notify(t.legalArticles.fetchError, 'error'));
    }, []);

    if (articles.length === 0)
        return <p className="agreements-empty">{t.legalArticles.empty}</p>;

    return (
        <ul className="client-articles-list">
            {articles.map(a => {
                const title   = lang === 'fr' ? a.title_fr   : a.title_he;
                const content = lang === 'fr' ? a.content_fr : a.content_he;
                const isOpen  = expanded === a.id;
                return (
                    <li key={a.id} className={`client-articles-item${isOpen ? ' open' : ''}`}>
                        <div className="client-articles-header" onClick={() => setExpanded(isOpen ? null : a.id)}>
                            <span className="client-articles-item-title">{title}</span>
                            <span className="client-articles-chevron">{isOpen ? '▲' : '▼'}</span>
                        </div>
                        {isOpen && (
                            <div className="client-articles-content">
                                <p>{content}</p>
                            </div>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}

export default LegalArticles;
