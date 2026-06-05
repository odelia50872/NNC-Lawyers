import { useState, useEffect } from 'react';
import { useLang } from '../../context/LanguageContext';
import { api } from '../../API/APIService';
import '../../styles/Contact.css';

function Contact() {
    const { t, lang } = useLang();
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (!status) return;
        const timer = setTimeout(() => setStatus(null), 3000);
        return () => clearTimeout(timer);
    }, [status]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('contact', { ...form, lang });
            setStatus('success');
            setForm({ name: '', email: '', phone: '', message: '' });
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="contact-page">
            <div className="contact-header">
                <h1>{t.contact.title}</h1>
                <p className="contact-subtitle">{t.contact.subtitle}</p>
            </div>

            <div className="contact-layout">
                <div className="contact-info-card">
                    <h3>{t.contact.directContact}</h3>
                    <ul className="contact-info-list">
                        {t.contact.contacts.map((c, i) => (
                            <li key={i}>
                                <span className="contact-info-name">{c.name}</span>
                                <span className="contact-info-phone">{c.phone}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="contact-card">
                    {status === 'success' && <div className="contact-alert success">{t.contact.success}</div>}
                    {status === 'error' && <div className="contact-alert error">{t.contact.error}</div>}

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>{t.contact.name}</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>{t.contact.phone}</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>{t.contact.email}</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>{t.contact.message}</label>
                            <textarea
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
        </div>
    );
}

export default Contact;
