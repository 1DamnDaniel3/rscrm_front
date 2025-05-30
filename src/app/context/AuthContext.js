import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { checkAuth } from '../../features'
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../features/user";
import { selectUser } from "../../entities";
import { Loader } from "../../shared";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
    const [isInitialized, setIsInitialized] = useState(false);
    const isAuth = useSelector(selectIsAuth);
    const user = useSelector(selectUser);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLogout = useCallback(() => dispatch(logout()), [dispatch]);

    useEffect(() => {

        const checkingAuth = async () => {
            try {
                await dispatch(checkAuth()).unwrap();
            } catch (error) {
                console.log(error);
                await userLogout();
                navigate('/registration')
            } finally {
                setIsInitialized(true);
            }
        };
        checkingAuth();
    }, [dispatch, navigate, userLogout]);


    const value = { isAuthenticated: isAuth, user }

    if (!isInitialized) {
        return <Loader />;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Хук для удобного использования контекста
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};