import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuth } from '../../features/user';
import { selectUser } from '../../entities';

export const ProtectedRoute = ({ children, roles = [] }) => {
    const isAuth = useSelector(selectIsAuth);
    const user = useSelector(selectUser);

    if (!isAuth) {
        return <Navigate to="/registration" replace />;
    }

    if (!user) {
        return <Navigate to="/registration" replace />;
    }

    if (user.role === 'admin') {
        return children;
    }

    if (!roles.includes(user.role)) {
        return <Navigate to="/profile" replace />;
    }

    return children;
};
