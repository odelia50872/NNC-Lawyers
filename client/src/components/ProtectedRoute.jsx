import { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ allowedRoles }) {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const isAllowed = user && (!allowedRoles || allowedRoles.includes(user.role));

    useEffect(() => {
       if (!loading && !isAllowed && location.pathname !== '/login') {
            navigate('/login', {
                replace: true,
                state: { message: "אין לך הרשאה לגשת לעמוד זה" }
            });
        }
    }, [loading, isAllowed, navigate, location.pathname]);

    if (loading || !isAllowed) {
        return null;
    }

    return <Outlet />;
}

export default ProtectedRoute;