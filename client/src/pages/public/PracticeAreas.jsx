import { useLang } from '../../context/LanguageContext';
import { FaUsers, FaBuilding, FaBriefcase, FaFileSignature, FaStamp, FaGlobe, FaHome } from 'react-icons/fa';
import '../../styles/PracticeAreas.css';

const ICONS = [FaUsers, FaBuilding, FaBriefcase, FaFileSignature, FaStamp, FaGlobe, FaHome];

function PracticeAreas() {
    const { t } = useLang();

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
                        </div>
                         <div
                        className={`team-card${member.bio ? ' team-card--clickable' : ''}`}
                        key={i}
                        onClick={() => member.bio && setSelected(member)}
                        role={member.bio ? 'button' : undefined}
                        tabIndex={member.bio ? 0 : undefined}
                        onKeyDown={e => member.bio && e.key === 'Enter' && setSelected(member)}
                        aria-label={member.bio ? `${member.name} - ${readMore}` : undefined}
                    >
                        <div className="team-avatar-wrapper">
                            {member.gender === 'female' ? <FemaleAvatar /> : <MaleAvatar />}
                        </div>
                        <h3>{member.name}</h3>
                        <p className="team-role">{member.role}</p>
                        {member.bio && <span className="team-card-more">{readMore}</span>}
                    </div>
                    );
                })}
            </div>

            
        </div>
    );
}

export default PracticeAreas;
