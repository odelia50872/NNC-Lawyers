import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ allowedRoles }) {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const isAllowed = user && (!allowedRoles || allowedRoles.includes(user.role));

    useEffect(() => {
        if (!loading && !isAllowed) {
            navigate('/login', { replace: true });
        }
    }, [loading, user]);

    if (loading) return null;
    if (!isAllowed) return null;

    return <Outlet />;
}

export default ProtectedRoute;
