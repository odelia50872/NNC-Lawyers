import { createContext, useContext, useState } from 'react';
import translations from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLangState] = useState(() => localStorage.getItem('lang') || 'he');
    const [fading, setFading] = useState(false);
    const t = translations[lang];
    const dir = lang === 'he' ? 'rtl' : 'ltr';

    const setLang = (newLang) => {
        if (newLang === lang) return;
        setFading(true);
        setTimeout(() => {
            setLangState(newLang);
            localStorage.setItem('lang', newLang);
            setFading(false);
        }, 250);
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
            <div dir={dir} style={{ transition: 'opacity 0.25s ease', opacity: fading ? 0 : 1 }}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
}

export function useLang() {
    return useContext(LanguageContext);
}
