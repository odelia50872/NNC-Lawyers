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
                    );
                })}
            </div>
        </div>
    );
}

export default PracticeAreas;
