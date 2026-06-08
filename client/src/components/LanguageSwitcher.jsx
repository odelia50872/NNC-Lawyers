import { useState, useRef } from 'react';
import { useLang } from '../context/LanguageContext';
import '../styles/LanguageSwitcher.css';

const LANGS = {
    he: { label: '🇮🇱 HE', next: 'fr' },
    fr: { label: '🇫🇷 FR', next: 'he' },
};

function LanguageSwitcher() {
    const { lang, setLang } = useLang();
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);

    return (
        <div
            className="lang-switcher"
            ref={wrapperRef}
            onBlur={(e) => {
                if (!wrapperRef.current.contains(e.relatedTarget)) setOpen(false);
            }}
            tabIndex={-1}
        >
            <button className="lang-current" onClick={() => setOpen(o => !o)}>
                {LANGS[lang].label} ▾
            </button>
            {open && (
                <div className="lang-dropdown">
                    <button
                        className="lang-dropdown-item"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            setLang(LANGS[lang].next);
                            setOpen(false);
                        }}
                    >
                        {LANGS[LANGS[lang].next].label}
                    </button>
                </div>
            )}
        </div>
    );
}

export default LanguageSwitcher;
