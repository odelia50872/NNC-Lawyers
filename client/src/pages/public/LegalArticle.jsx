import { useState, useEffect } from 'react';
import { api } from '../../API/APIService';
import { useLang } from '../../context/LanguageContext';
import { useNotify } from '../../components/notifications/NotificationContext';
import '../../styles/LegalArticle.css';

function LegalArticle() {
    const [articles, setArticles] = useState([]);
    const [expanded, setExpanded] = useState(null);
    const { t, lang } = useLang();
    const notify = useNotify();

    useEffect(() => {
        api.get('legal-articles')
            .then(res => setArticles(res.data))
            .catch(() => notify(t.legalArticles.fetchError, 'error'));
    }, []);

    return (
        <div className="legal-article-page">
            <div className="legal-article-header">
                <h1 className="legal-article-title">{t.legalArticles.title}</h1>
            </div>

            {articles.length === 0 ? (
                <p className="legal-article-empty">{t.legalArticles.empty}</p>
            ) : (
                <ul className="legal-article-list">
                    {articles.map(a => {
                        const title   = lang === 'fr' ? a.title_fr   : a.title_he;
                        const content = lang === 'fr' ? a.content_fr : a.content_he;
                        const isOpen  = expanded === a.id;
                        return (
                            <li key={a.id} className={`legal-article-item${isOpen ? ' open' : ''}`}>
                                <button
                                    className="legal-article-item-header"
                                    onClick={() => setExpanded(isOpen ? null : a.id)}
                                    aria-expanded={isOpen}
                                >
                                    <span className="legal-article-item-title">{title}</span>
                                    <span className="legal-article-expand-btn" aria-hidden="true">
                                        <span className="legal-article-expand-icon">
                                            {isOpen ? '−' : '+'}
                                        </span>
                                    </span>
                                </button>
                                {isOpen && (
                                    <div className="legal-article-content">
                                        <p>{content}</p>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default LegalArticle;
