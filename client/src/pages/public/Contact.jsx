import { useState } from 'react';
import { FaPhone } from 'react-icons/fa';
import { useLang } from '../../context/LanguageContext';
import { api } from '../../API/APIService';
import { useNotify } from '../../components/notifications/NotificationContext';
import '../../styles/Contact.css';

function Contact() {
    const { t, lang } = useLang();
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const notify = useNotify();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('contact', { ...form, lang });
            notify(t.contact.success, 'success');
            setForm({ name: '', email: '', phone: '', message: '' });
        } catch {
            notify(t.contact.error, 'error');
        }
    };

    return (
        <main id="main-content" className="contact-page" role="main" aria-label={t.contact.title}>
            <div className="contact-header">
                <h1>{t.contact.title}</h1>
                <p className="contact-subtitle">{t.contact.subtitle}</p>
            </div>

            <div className="contact-layout">
                <div className="contact-info-card">
                    <h2>{t.contact.directContact}</h2>
                    <ul className="contact-info-list">
                        {t.contact.contacts.map((c, i) => (
                            <li key={i}>
                                <span className="contact-info-name">{c.name}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="contact-info-phone">
                        <div className="contact-phone-icon"><FaPhone /></div>
                        <span>{t.contact.contacts[0].phone}</span>
                    </div>
                </div>

                <div className="contact-card">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="contact-name">{t.contact.name}</label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    autoComplete="name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact-phone">{t.contact.phone}</label>
                                <input
                                    id="contact-phone"
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    autoComplete="tel"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact-email">{t.contact.email}</label>
                            <input
                                id="contact-email"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact-message">{t.contact.message}</label>
                            <textarea
                                id="contact-message"
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                rows="6"
                                required
                            />
                        </div>

                        <button type="submit" className="contact-submit">
                            {t.contact.send}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Contact;