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

    return (
        <header className="header">
            <div className="header-inner">
                <Link to="/nnc" className="header-logo">
                    <img src={logo} alt="NNC-Law" className="header-logo-img" />
                    <span style={{ direction: 'ltr', unicodeBidi: 'bidi-override' }}>⋂⋂C-LAW</span>
                </Link>
                <nav className="header-nav">
                    <div className="header-nav-links">
                        <NavLink to="/nnc/about" className={({ isActive }) => isActive ? 'active' : ''}>{t.nav.about}</NavLink>
                        <NavLink to="/nnc/team" className={({ isActive }) => isActive ? 'active' : ''}>{t.nav.team}</NavLink>
                        <NavLink to="/nnc/practice-areas" className={({ isActive }) => isActive ? 'active' : ''}>{t.nav.practiceAreas}</NavLink>
                        <NavLink to="/nnc/contact" className={({ isActive }) => isActive ? 'active' : ''}>{t.nav.contact}</NavLink>
                        <NavLink to="/nnc/legal-article" className={({ isActive }) => isActive ? 'active' : ''}>{t.nav.legalArticle}</NavLink>
                    </div>
                    <div className="header-nav-buttons">
                        {user ? (
                            <>
                                <NavLink to={dashboardPath} className="header-login-btn">
                                    {user.full_name || t.nav.dashboard}
                                </NavLink>
                                <button className="header-logout-btn" onClick={() => logout(navigate)}>
                                    {t.nav.logout}
                                </button>
                            </>
                        ) : (
                            <NavLink to="/nnc/login" className="header-login-btn">{t.nav.login}</NavLink>
                        )}
                        <LanguageSwitcher />
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
