import { createContext, useContext, useEffect, useState } from "react";
import { checkAuth } from '../../features'
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectIsAuth } from "../../features/user";
import { selectUser } from "../../entities";
import { Loader } from "../../shared";

export const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
    const [isInitialized, setIsInitialized] = useState(false);
    const isAuth = useSelector(selectIsAuth);
    const user = useSelector(selectUser);
    const dispatch = useDispatch()

    const userLogin = async (user) => dispatch(login(user, dispatch))
    const userLogout = async () => dispatch(logout())

    useEffect(() => {
        const checkingAuth = async () => {
            try {
                const response = dispatch(checkAuth());
                if (response.payload?.isAuthenticated) {
                    await userLogin(response.user);
                } else {
                    await userLogout();
                }

            } catch (error) {
                console.log(error)
                await userLogout();
            } finally {
                setIsInitialized(true);
            }
        };
        checkingAuth();
    }, [dispatch]);

    const value = { isAuthenticated: isAuth, user, userLogin, userLogout }

    if (!isInitialized) {
        return <Loader/>;
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