import { useEffect, useRef } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotify } from './notifications/NotificationContext';
import { useLang } from '../context/LanguageContext';

function ProtectedRoute({ allowedRoles }) {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const notify = useNotify();
    const { t } = useLang();
    const wasLoggedIn = useRef(false);

    const isAllowed = user && (!allowedRoles || allowedRoles.includes(user.role));

    useEffect(() => {
        if (user) wasLoggedIn.current = true;
    }, [user]);

    useEffect(() => {
        if (!loading && !isAllowed && location.pathname !== '/nnc/login') {
            if (!wasLoggedIn.current) {
                notify(t.unauthorized, 'error');
            }
            navigate('/nnc/login', { replace: true });
        }
    }, [loading, isAllowed, navigate, location.pathname]);

    if (loading || !isAllowed) {
        return null;
    }

    return <Outlet />;
}

export default ProtectedRoute;