import { Link, NavLink } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import logo from '../assets/small-logo.jpg';
import '../styles/Header.css';

function Header() {
    const { t } = useLang();

    return (
        <header className="header">
            <div className="header-inner">
                <Link to="/" className="header-logo">
                    <img src={logo} alt="NNC Law" className="header-logo-img" />
                    <span style={{ direction: 'ltr', unicodeBidi: 'bidi-override' }}>⋂⋂C LAW</span>
                </Link>
                <nav className="header-nav">
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>{t.nav.about}</NavLink>
                    <NavLink to="/team" className={({ isActive }) => isActive ? 'active' : ''}>{t.nav.team}</NavLink>
                    <NavLink to="/practice-areas" className={({ isActive }) => isActive ? 'active' : ''}>{t.nav.practiceAreas}</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>{t.nav.contact}</NavLink>
                    <NavLink to="/login" className="header-login-btn">{t.nav.login}</NavLink>
                    <LanguageSwitcher />
                </nav>
            </div>
        </header>
    );
}

export default Header;
