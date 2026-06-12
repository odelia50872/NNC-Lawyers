import { useLang } from '../../context/LanguageContext';
import '../../styles/Accessibility.css';

const content = {
    he: {
        title: 'הצהרת נגישות',
        updated: 'עדכון אחרון: יוני 2025',
        intro: 'משרד עורכי הדין NNC Law מחויב להנגיש את אתר האינטרנט שלו לאנשים עם מוגבלויות, בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013, ובהתאם לתקן הישראלי ת"י 5568 המבוסס על WCAG 2.0 ברמה AA.',
        sections: [
            {
                title: 'רמת הנגישות',
                text: 'האתר עומד ברמת נגישות AA של תקן WCAG 2.0, הכולל:',
                items: [
                    'תמיכה בקוראי מסך באמצעות תגיות ARIA ומבנה סמנטי תקין',
                    'ניווט מלא באמצעות מקלדת בלבד',
                    'טקסט חלופי (alt) על כל האלמנטים הוויזואליים המשמעותיים',
                    'מבנה כותרות היררכי ונגיש',
                    'ניגודיות צבעים עומדת בדרישות התקן',
                    'תמיכה בשינוי גודל טקסט עד 200% ללא אובדן תוכן',
                    'הצהרת שפה (lang) על כל הדפים',
                    'אתר מגיב (Responsive) לכל גדלי המסך',
                ],
            },
            {
                title: 'אמצעי הנגישות שיושמו',
                text: 'במסגרת עבודת הנגישות בוצעו ההתאמות הבאות:',
                items: [
                    'הוספת role ו-aria-label לכל רכיבי הניווט',
                    'כפתורים עם טקסט נגיש לקוראי מסך',
                    'תפריט ניווט ראשי עם תיאור מלא',
                    'דיאלוגים (modals) עם role="dialog" ו-aria-modal',
                    'אייקונים דקורטיביים מוגדרים כ-aria-hidden',
                    'תמיכה בניווט מקלדת בקארדים אינטראקטיביים',
                    'שפת הממשק מתעדכנת דינמית ב-HTML lang',
                ],
            },
            {
                title: 'מגבלות ידועות',
                text: 'אנו עובדים על שיפור מתמיד. להלן מגבלות ידועות:',
                items: [
                    'חלק מהמסמכים PDF עשויים שלא להיות נגישים במלואם',
                ],
            },
            {
                title: 'יצירת קשר בנושא נגישות',
                text: 'נתקלתם בבעיית נגישות? אנחנו כאן לעזור:',
                items: [
                    'אימייל: nnc@nnc-law.com',
                    'טלפון: 02-6437311',
                    'כתובת: קדיש לוז 8/58, ירושלים',
                ],
            },
        ],
    },
    fr: {
        title: 'Déclaration d\'accessibilité',
        updated: 'Dernière mise à jour : Juin 2025',
        intro: 'Le cabinet NNC Law s\'engage à rendre son site internet accessible aux personnes handicapées, conformément à la réglementation israélienne sur l\'égalité des droits des personnes handicapées et à la norme israélienne T"I 5568, basée sur WCAG 2.0 niveau AA.',
        sections: [
            {
                title: 'Niveau d\'accessibilité',
                text: 'Le site respecte le niveau AA de la norme WCAG 2.0, incluant :',
                items: [
                    'Support des lecteurs d\'écran via les attributs ARIA et une structure sémantique correcte',
                    'Navigation complète au clavier',
                    'Texte alternatif (alt) sur tous les éléments visuels significatifs',
                    'Structure hiérarchique des titres accessible',
                    'Contraste des couleurs conforme aux exigences',
                    'Support du redimensionnement du texte jusqu\'à 200% sans perte de contenu',
                    'Déclaration de langue (lang) sur toutes les pages',
                    'Site responsive pour toutes les tailles d\'écran',
                ],
            },
            {
                title: 'Mesures d\'accessibilité mises en œuvre',
                text: 'Les adaptations suivantes ont été réalisées :',
                items: [
                    'Ajout de role et aria-label sur tous les composants de navigation',
                    'Boutons avec texte accessible pour les lecteurs d\'écran',
                    'Menu de navigation principal avec description complète',
                    'Dialogues (modals) avec role="dialog" et aria-modal',
                    'Icônes décoratives définies comme aria-hidden',
                    'Navigation au clavier sur les cartes interactives',
                    'Langue de l\'interface mise à jour dynamiquement via HTML lang',
                ],
            },
            {
                title: 'Limitations connues',
                text: 'Nous travaillons à une amélioration continue. Limitations connues :',
                items: [
                    'Certains documents PDF peuvent ne pas être entièrement accessibles',
                ],
            },
            {
                title: 'Contact accessibilité',
                text: 'Vous avez rencontré un problème d\'accessibilité ? Nous sommes là pour vous aider :',
                items: [
                    'Email : nnc@nnc-law.com',
                    'Téléphone : 02-6437311',
                    'Adresse : 8/58 Kadish Luz, Jérusalem',
                ],
            },
        ],
    },
};

function Accessibility() {
    const { lang } = useLang();
    const c = content[lang] || content.he;

    return (
        <main className="accessibility-page" role="main">
            <div className="accessibility-header">
                <h1>{c.title}</h1>
                <p className="accessibility-updated">{c.updated}</p>
            </div>
            <p className="accessibility-intro">{c.intro}</p>
            <div className="accessibility-sections">
                {c.sections.map((section, i) => (
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
