import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuth } from '../../features/user';
import { selectUser } from '../../entities';

export const ProtectedRoute = ({ children, roles = [] }) => {
    const isAuth = useSelector(selectIsAuth);
    const user = useSelector(selectUser);
    if (user == null) {
     console.warn('user undefined. do not loaded to redux');
    }

    if (!isAuth) { // no auth - quit
        console.error("Not authorized")
        return <Navigate to="/registration" replace />;
    }
    
    if (!user) { // no user - quit
        console.error("user not found")
        return <Navigate to="/registration" replace />;
    }

    if (!user.roles) { // user with no roles - quit
        console.error("user roles not found")
        return <Navigate to="/registration" replace />;
    }

    if (user.roles.includes('owner')) {
        return children;
    }

    // if user have required role in roles - pass him
    const hasAccess = user.roles?.some(role => roles.includes(role));

    if (!hasAccess) {
        console.error("Отказано в доступе");
        alert("Отказано в доступе")
        return <Navigate to="/profile" replace />;
    }


    

    return children;
};
