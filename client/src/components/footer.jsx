import { FaPhone, FaFax, FaEnvelope, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { SiWaze } from 'react-icons/si';
import { useLang } from '../context/LanguageContext';
import '../styles/Footer.css';

const phoneIsrael = '02-6437311';
const phoneFrance = '\u200E+33 177505913';
const fax = '02-6439798';
const email = 'nnc@nnc-law.com';
const wazeAddress = 'רחוב קדיש לוז 6, ירושלים';
const gMapsAddress = 'רחוב קדיש לוז 8, ירושלים';


const WAZE_URL = `https://waze.com/ul?q=${encodeURIComponent(wazeAddress)}&navigate=yes`;
const GMAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(gMapsAddress)}`;
const GMAIL_URL = `https://mail.google.com/mail/?view=cm&to=${email}`;

function Footer() {
    const { t } = useLang();
    return (
        <footer className="footer">
            <div className="footer-content">

                <div className="footer-section">
                    <h3 style={{ direction: 'ltr', unicodeBidi: 'bidi-override' }}>⋂⋂C LAW</h3>
                    <p>{t.footer.firmName}</p>
                    <p>{t.footer.address}</p>
                    <div className="footer-nav-links">
                        <a href={WAZE_URL} target="_blank" rel="noreferrer" className="waze-link">
                            <SiWaze /> Waze
                        </a>
                        <a href={GMAPS_URL} target="_blank" rel="noreferrer" className="gmaps-link">
                            <FaMapMarkerAlt /> Google Maps
                        </a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>{t.footer.contact}</h4>
                    <p><FaPhone /> {t.footer.israel}: {phoneIsrael}</p>
                    <p><FaPhone /> {t.footer.france}: {phoneFrance}</p>
                    <p><FaFax /> {t.footer.fax}: {fax}</p>
                    <p>
                        <FaEnvelope />
                        <a href={GMAIL_URL} target="_blank" rel="noreferrer">{email}</a>
                    </p>
                </div>

                <div className="footer-section">
                    <h4><FaClock /> {t.footer.hours}</h4>
                    <p>{t.footer.sun}</p>
                    <p>{t.footer.monThu}</p>
                    <p>{t.footer.fri}</p>
                    <p>{t.footer.sat}</p>
                </div>

            </div>
            <p className="footer-bottom">
                &copy; {new Date().getFullYear()} NNC LAW. {t.footer.rights}.
            </p>
        </footer>
    );
}

export default Footer;
