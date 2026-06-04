import { createContext, useContext, useState } from 'react';
import translations from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState('he');
    const t = translations[lang];
    const dir = lang === 'he' ? 'rtl' : 'ltr';

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
            <div dir={dir}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
}

export function useLang() {
    return useContext(LanguageContext);
}
