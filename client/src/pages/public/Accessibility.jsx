import { useLang } from '../../context/LanguageContext';
import '../../styles/Accessibility.css';
   

function Accessibility() {
    const { t } = useLang();

    return (
        <main className="accessibility-page" role="main">
            <div className="accessibility-header">
                <h1>{t.accessibility.title}</h1>
                <p className="accessibility-updated">{t.accessibility.updated}</p>
            </div>
            <p className="accessibility-intro">{t.accessibility.intro}</p>
            <div className="accessibility-sections">
                {t.accessibility.sections.map((section, i) => (
                    <section key={i} className="accessibility-section">
                        <h2>{section.title}</h2>
                        <p>{section.text}</p>
                        <ul>
                            {section.items.map((item, j) => (
                                <li key={j}>{item}</li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </main>
    );
}

export default Accessibility;
