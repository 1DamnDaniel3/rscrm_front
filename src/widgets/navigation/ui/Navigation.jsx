// import s from './Navigation.module.css'
import { NavigationPanel } from '../../../shared'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../../entities'
import { logout } from '../../../features';
import { useNavigate } from 'react-router-dom';


const roleBasedLinks = {
    owner: [
        { name: 'Лиды', href: '/leads' },
        { name: 'Ученики', href: '/students' },
        { name: 'Клиенты', href: '/admin/schools' },
        { name: 'Расписание', href: '/schedule' },
        { name: 'Финансы', href: '/finances' },
        { name: 'Отчёты', href: '/reports' },
        { name: 'Профиль', href: '/profile' },
    ],
    manager: [
        { name: 'Лиды', href: '/leads' },
        { name: 'Клиенты', href: '/admin/schools' },
        { name: 'Профиль', href: '/profile' },


    ],
    admin: [
        { name: 'Школы', href: '/admin/schools' },
        { name: 'Профиль', href: '/profile' },



    ],
    receptionist: [
        { name: 'Ученики', href: '/students' },
        { name: 'Расписание', href: '/schedule' },
        { name: 'Профиль', href: '/profile' },


    ],
    teacher: [
        { name: 'Ученики', href: '/students' },
        { name: 'Расписание', href: '/schedule' },
        { name: 'Профиль', href: '/profile' },


    ],
    accountant: [
        { name: 'Финансы', href: '/finances' },
        { name: 'Профиль', href: '/profile' },

    ],
};

export const Navigation = () => {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/registration')
    }


    if (!user || !user.role) return null;
    const links = roleBasedLinks[user.role] || [];

    return <NavigationPanel links={links} onClick={handleLogout} text={"Выйти"} />;
}
