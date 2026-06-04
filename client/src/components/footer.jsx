import { FaPhone, FaFax, FaEnvelope, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { SiWaze } from 'react-icons/si';
import { useLang } from '../context/LanguageContext';
import '../styles/Footer.css';

const WAZE_URL = 'https://waze.com/ul?q=קדיש+לוז+8+ירושלים';
const GMAPS_URL = 'https://www.google.com/maps/search/?api=1&query=קדיש+לוז+8+ירושלים';
const GMAIL_URL = 'https://mail.google.com/mail/?view=cm&to=office@nnc-law.co.il';

function Footer() {
    const { t } = useLang();
    return (
        <footer className="footer">
            <div className="footer-content">

                <div className="footer-section">
                    <h3>NNC Law</h3>
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
                    <p><FaPhone /> {t.footer.israel}: 02-6437311</p>
                    <p><FaPhone /> {t.footer.france}: +33-XXXXXXXXX</p>
                    <p><FaFax /> {t.footer.fax}: 02-6439798</p>
                    <p>
                        <FaEnvelope />
                        <a href={GMAIL_URL} target="_blank" rel="noreferrer">office@nnc-law.co.il</a>
                    </p>
                </div>

                <div className="footer-section">
                    <h4><FaClock /> {t.footer.hours}</h4>
                    <p>{t.footer.sunThu}</p>
                    <p>{t.footer.fri}</p>
                    <p>{t.footer.sat}</p>
                </div>

            </div>
            <p className="footer-bottom">
                &copy; {new Date().getFullYear()} NNC Law. {t.footer.rights}.
            </p>
        </footer>
    );
}

export default Footer;
