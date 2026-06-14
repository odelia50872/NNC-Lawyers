import { useState } from 'react';
import { useLang } from '../../context/LanguageContext';
import { FaUsers, FaBuilding, FaBriefcase, FaFileSignature, FaStamp, FaGlobe, FaHome } from 'react-icons/fa';
import '../../styles/PracticeAreas.css';

const ICONS = [FaUsers, FaBuilding, FaBriefcase, FaFileSignature, FaStamp, FaGlobe, FaHome];

function PracticeAreas() {
    const { t, lang } = useLang();
    const [selected, setSelected] = useState(null);
    const readMore = lang === 'fr' ? 'En savoir plus' : 'קרא עוד';
    const closeLabel = lang === 'fr' ? 'Fermer' : 'סגור';

    return (
        <div className="practice-page">
            <div className="practice-header">
                <h1>{t.practiceAreas.title}</h1>
                <p className="practice-subtitle">{t.practiceAreas.subtitle}</p>
            </div>
            <div className="practice-grid">
                {t.practiceAreas.items.map((item, i) => {
                    const Icon = ICONS[i] || FaBriefcase;
                    return (
                        <div className="practice-card" key={i}>
                            <div className="practice-icon"><Icon /></div>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                            {item.bio && (
                                <button
                                    className="practice-read-more"
                                    onClick={() => setSelected(item)}
                                    aria-label={`${item.title} - ${readMore}`}
                                >
                                    {readMore}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {selected && (
                <div
                    className="team-modal-overlay"
                    onClick={() => setSelected(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label={selected.title}
                >
                    <div className="team-modal" onClick={e => e.stopPropagation()}>
                        <div className="team-modal-header">
                            <button className="team-modal-close" onClick={() => setSelected(null)} aria-label={closeLabel}>✕</button>
                            <h2>{selected.title}</h2>
                        </div>
                        <div
                            className={`team-modal-body team-modal-body--${lang}`}
                            style={{ direction: lang === 'fr' ? 'ltr' : 'rtl', textAlign: lang === 'fr' ? 'left' : 'right' }}
                        >
                            {selected.bio.split('\n').map((para, i) => para.trim() && <p key={i}>{para}</p>)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PracticeAreas;
