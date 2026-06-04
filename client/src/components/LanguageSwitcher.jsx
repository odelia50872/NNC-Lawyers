import { useLang } from '../context/LanguageContext';
import '../styles/LanguageSwitcher.css';

function LanguageSwitcher() {
    const { lang, setLang } = useLang();

    return (
        <div className="lang-switcher">
            <button
                className={`lang-option ${lang === 'he' ? 'active' : ''}`}
                onClick={() => setLang('he')}
            >
                🇮🇱 HE
            </button>
            <span className="lang-divider">|</span>
            <button
                className={`lang-option ${lang === 'fr' ? 'active' : ''}`}
                onClick={() => setLang('fr')}
            >
                🇫🇷 FR
            </button>
        </div>
    );
}

export default LanguageSwitcher;
