import { useState } from 'react';
import { useLang } from '../../context/LanguageContext';
import '../../styles/Team.css';

const MaleAvatar = () => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="team-avatar">
        <circle cx="50" cy="50" r="50" fill="#1f2937"/>
        <circle cx="50" cy="38" r="18" fill="#c9a84c"/>
        <ellipse cx="50" cy="85" rx="28" ry="20" fill="#c9a84c"/>
    </svg>
);

const FemaleAvatar = () => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="team-avatar">
        <circle cx="50" cy="50" r="50" fill="#1f2937"/>
        <circle cx="50" cy="38" r="18" fill="#e0c068"/>
        <ellipse cx="50" cy="85" rx="28" ry="20" fill="#e0c068"/>
        <path d="M32 38 Q50 20 68 38" fill="#c9a84c"/>
    </svg>
);

function Team() {
    const { t, lang } = useLang();
    const [selected, setSelected] = useState(null);

    return (
        <div className="team-page">
            <div className="team-header">
                <h1>{t.team.title}</h1>
            </div>
            <div className="team-grid">
                {t.team.members.map((member, i) => (
                    <div
                        className={`team-card${member.bio ? ' team-card--clickable' : ''}`}
                        key={i}
                        onClick={() => member.bio && setSelected(member)}
                    >
                        <div className="team-avatar-wrapper">
                            {member.gender === 'female' ? <FemaleAvatar /> : <MaleAvatar />}
                        </div>
                        <h3>{member.name}</h3>
                        <p className="team-role">{member.role}</p>
                        {member.bio && <span className="team-card-more">{lang === 'fr' ? 'En savoir plus' : 'קרא עוד'}</span>}
                    </div>
                ))}
            </div>

            {selected && (
                <div className="team-modal-overlay" onClick={() => setSelected(null)}>
                    <div className="team-modal" onClick={e => e.stopPropagation()}>
                        <div className="team-modal-header">
                            <button className="team-modal-close" onClick={() => setSelected(null)}>✕</button>
                            <div className="team-modal-avatar">
                                {selected.gender === 'female' ? <FemaleAvatar /> : <MaleAvatar />}
                            </div>
                            <h2>{selected.name}</h2>
                            <p className="team-modal-role">{selected.role}</p>
                        </div>
                        <div className={`team-modal-body team-modal-body--${lang}`}>
                            {selected.bio.split('\n\n').map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Team;
