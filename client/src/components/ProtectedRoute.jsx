import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';

function ProtectedRoute({ allowedRoles }) {
    const { user } = useAuth();
    const { t } = useLang();
    const navigate = useNavigate();
    const isAllowed = user && (!allowedRoles || allowedRoles.includes(user.role));

    useEffect(() => {
        if (!isAllowed) {
            navigate('/login', { replace: true, state: { message: t.unauthorized } });
        }
    }, [user]);

    if (!isAllowed) return null;

    return <Outlet />;
}

export default ProtectedRoute;
