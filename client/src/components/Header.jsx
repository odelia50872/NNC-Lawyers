import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import useSlug from '../hooks/useSlug';
import logo from '../assets/small-logo.jpg';
import '../styles/Header.css';

function Header() {
    const { t } = useLang();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const slug = useSlug(user?.full_name);
    const dashboardPath = user?.role === 'admin' ? '/nnc/admin' : `/nnc/${slug}/dashboard`;
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="header" role="banner">
            <div className="header-inner">
                <Link to="/nnc" className="header-logo" aria-label="NNC Law - דף הבית">
                    <img src={logo} alt="NNC Law logo" className="header-logo-img" />
                    <span style={{ direction: 'ltr', unicodeBidi: 'bidi-override' }}>⋂⋂C-LAW</span>
                </Link>
                <button
                    className={`header-hamburger${menuOpen ? ' open' : ''}`}
                    onClick={() => setMenuOpen(o => !o)}
                    aria-label="תפריט ניווט"
                    aria-expanded={menuOpen}
                >
                    <span /><span /><span />
                </button>
                <nav className={`header-nav${menuOpen ? ' mobile-open' : ''}`} aria-label={t.nav.about}>
                    <div className="header-nav-links">
                        <NavLink to="/nnc/about" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>{t.nav.about}</NavLink>
                        <NavLink to="/nnc/team" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>{t.nav.team}</NavLink>
                        <NavLink to="/nnc/practice-areas" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>{t.nav.practiceAreas}</NavLink>
                        <NavLink to="/nnc/contact" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>{t.nav.contact}</NavLink>
                        <NavLink to="/nnc/legal-article" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>{t.nav.legalArticle}</NavLink>
                    </div>
                    <div className="header-nav-buttons">
                        {user ? (
                            <>
                                <NavLink to={dashboardPath} className="header-login-btn" onClick={closeMenu}>
                                    {user.full_name || t.nav.dashboard}
                                </NavLink>
                                <button className="header-logout-btn" onClick={() => { logout(navigate); closeMenu(); }}>
                                    {t.nav.logout}
                                </button>
                            </>
                        ) : (
                            <NavLink to="/nnc/login" className="header-login-btn" onClick={closeMenu}>{t.nav.login}</NavLink>
                        )}
                        <LanguageSwitcher />
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
