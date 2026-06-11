import { useState, useEffect } from 'react';
import { api } from '../../API/APIService';
import { useLang } from '../../context/LanguageContext';
import { useNotify } from '../notifications/NotificationContext';
import useAdminAuth from '../../hooks/useAdminAuth.jsx';
import { FaTrashAlt, FaEdit, FaPlus, FaTimes } from 'react-icons/fa';

const EMPTY_FORM = { title_he: '', content_he: '', title_fr: '', content_fr: '' };

function AdminLegalArticle() {
    const [articles, setArticles] = useState([]);
    const [form, setForm] = useState(EMPTY_FORM);
    const [editArticle, setEditArticle] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const { t, lang } = useLang();
    const notify = useNotify();
    const { requireAuth, PasswordModal } = useAdminAuth();

    const fetchArticles = async () => {
        try {
            const res = await api.get('legal-articles');
            setArticles(res.data);
        } catch {
            notify(t.legalArticles.fetchError, 'error');
        }
    };

    useEffect(() => { fetchArticles(); }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const closeForm = () => { setShowForm(false); setEditArticle(null); setForm(EMPTY_FORM); };

    const handleSubmit = (e) => {
        e.preventDefault();
        requireAuth(async () => {
            try {
                await api.post('legal-articles', form);
                await fetchArticles();
                closeForm();
                notify(t.legalArticles.added, 'success');
            } catch {
                notify(t.legalArticles.error, 'error');
            }
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        requireAuth(async () => {
            try {
                await api.put('legal-articles', editArticle.id, form);
                await fetchArticles();
                closeForm();
                notify(t.legalArticles.updated, 'success');
            } catch {
                notify(t.legalArticles.error, 'error');
            }
        });
    };

    const handleDelete = (id) => {
        requireAuth(async () => {
            try {
                await api.delete('legal-articles', id);
                await fetchArticles();
                notify(t.legalArticles.deleted, 'success');
            } catch {
                notify(t.legalArticles.error, 'error');
            }
        });
    };

    const openEdit = (article) => {
        setEditArticle(article);
        setForm({
            title_he: article.title_he,
            content_he: article.content_he,
            title_fr: article.title_fr,
            content_fr: article.content_fr,
        });
        setShowForm(true);
    };

    return (
        <div className="legal-admin-wrap">
            <div className="legal-admin-header">
                <h2 className="legal-admin-title">{t.legalArticles.title}</h2>
                <button className="legal-admin-add-btn" onClick={() => showForm && !editArticle ? closeForm() : (setEditArticle(null), setForm(EMPTY_FORM), setShowForm(true))}>
                    {showForm && !editArticle ? <><FaTimes /> {t.confirm.cancel}</> : <><FaPlus /> {t.confirm.add}</>}
                </button>
            </div>

            {(showForm || editArticle) && (
                <form className="legal-admin-form" onSubmit={editArticle ? handleUpdate : handleSubmit}>
                    <div className="legal-admin-form-title">
                        {editArticle ? t.confirm.update : t.confirm.add} — {t.legalArticles.title}
                    </div>
                    <div className="legal-admin-form-grid">
                        <div className="legal-admin-field">
                            <label>{t.legalArticles.titleHe}</label>
                            <input name="title_he" required value={form.title_he} onChange={handleChange} />
                        </div>
                        <div className="legal-admin-field">
                            <label>{t.legalArticles.titleFr}</label>
                            <input name="title_fr" required value={form.title_fr} onChange={handleChange} />
                        </div>
                        <div className="legal-admin-field legal-admin-field--full">
                            <label>{t.legalArticles.contentHe}</label>
                            <textarea name="content_he" required value={form.content_he} onChange={handleChange} rows={4} />
                        </div>
                        <div className="legal-admin-field legal-admin-field--full">
                            <label>{t.legalArticles.contentFr}</label>
                            <textarea name="content_fr" required value={form.content_fr} onChange={handleChange} rows={4} />
                        </div>
                    </div>
                    <div className="legal-admin-form-actions">
                        <button type="submit" className="legal-admin-save-btn">
                            {editArticle ? t.confirm.update : t.confirm.save}
                        </button>
                        <button type="button" className="legal-admin-cancel-btn" onClick={closeForm}>
                            {t.confirm.cancel}
                        </button>
                    </div>
                </form>
            )}

            {articles.length === 0 ? (
                <p className="agreements-empty">{t.legalArticles.empty}</p>
            ) : (
                <ul className="legal-admin-list">
                    {articles.map(a => (
                        <li key={a.id} className="legal-admin-item">
                            <span className="legal-admin-item-title">{lang === 'fr' ? a.title_fr : a.title_he}</span>
                            <div className="admin-doc-actions">
                                <button className="admin-edit-btn" onClick={() => openEdit(a)} title={t.confirm.editTooltip}><FaEdit /></button>
                                <button className="admin-reports-del-btn" onClick={() => handleDelete(a.id)} title={t.confirm.deleteTooltip}><FaTrashAlt /></button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {PasswordModal}
        </div>
    );
}

export default AdminLegalArticle;
