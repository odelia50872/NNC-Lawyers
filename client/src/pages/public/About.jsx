import { useLang } from '../../context/LanguageContext';
import '../../styles/About.css';

function About() {
    const { t } = useLang();
    const a = t.about;

    return (
        <main className="about-page" role="main" aria-label={a.title}>
            <div className="about-header">
                <h1>{a.title}</h1>
                <p className="about-subtitle">{a.subtitle}</p>
            </div>

            <div className="about-sections">
                <div className="about-section">
                    <h2>{a.section1Title}</h2>
                    <p>{a.section1}</p>
                </div>

                <div className="about-section">
                    <h2>{a.section2Title}</h2>
                    <p>{a.section2}</p>
                </div>

                <div className="about-section">
                    <h2>{a.section3Title}</h2>
                    <p>{a.section3}</p>
                </div>
            </div>
        </main>
    );
}

export default About;