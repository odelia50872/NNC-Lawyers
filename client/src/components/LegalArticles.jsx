import { useState, useEffect } from 'react';
import { api } from '../API/APIService';
import { useLang } from '../context/LanguageContext';
import { useNotify } from './notifications/NotificationContext';
import '../styles/LegalArticle.css';

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
        return <div className="legal-article-empty">{t.legalArticles.empty}</div>;

    return (
        <div className="legal-article-page">
            <h2 className="legal-article-title">{t.legalArticles.title}</h2>
            <ul className="legal-article-list">
                {articles.map(a => {
                    const title   = lang === 'fr' ? a.title_fr   : a.title_he;
                    const content = lang === 'fr' ? a.content_fr : a.content_he;
                    const isOpen  = expanded === a.id;
                    return (
                        <li key={a.id} className={`legal-article-item${isOpen ? ' open' : ''}`}>
                            <div className="legal-article-item-header" onClick={() => setExpanded(isOpen ? null : a.id)}>
                                <h3 className="legal-article-item-title">{title}</h3>
                                <button className="legal-article-expand-btn" type="button">
                                    {isOpen ? (
                                        <span className="legal-article-expand-icon">−</span>
                                    ) : (
                                        <span className="legal-article-expand-icon">+</span>
                                    )}
                                </button>
                            </div>
                            {isOpen && (
                                <div className="legal-article-content">
                                    <p>{content}</p>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default LegalArticles;
