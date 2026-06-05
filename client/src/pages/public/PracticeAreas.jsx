import { useLang } from '../../context/LanguageContext';
import '../../styles/PracticeAreas.css';

const ICONS = ['⚖️', '🏠', '🏢', '📋', '📜', '🌍'];

function PracticeAreas() {
    const { t } = useLang();

    return (
        <div className="practice-page">
            <h1>{t.practiceAreas.title}</h1>
            <p className="practice-subtitle">{t.practiceAreas.subtitle}</p>
            <div className="practice-grid">
                {t.practiceAreas.items.map((item, i) => (
                    <div className="practice-card" key={i}>
                        <div className="practice-icon">{ICONS[i]}</div>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PracticeAreas;
