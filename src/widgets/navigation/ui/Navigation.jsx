// import s from './Navigation.module.css'
import { NavigationPanel } from '../../../shared'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../../entities'
import { logout } from '../../../features';
import { useNavigate } from 'react-router-dom';
import lead from '../../../shared/assets/icons/bell.svg';
import student from '../../../shared/assets/icons/baby.svg'
import client from '../../../shared/assets/icons/clientsIcon.svg'
import schedule from '../../../shared/assets/icons/scheduleIcon.svg'
import finance from '../../../shared/assets/icons/financeIcon.svg'
import report from '../../../shared/assets/icons/reportsIcon.svg'
import profile from '../../../shared/assets/icons/circle-user.svg'


const roleBasedLinks = {
    owner: [
        { name: 'Лиды', href: '/leads', icon: <img alt='lead' src={lead} width="24px" /> },
        { name: 'Ученики', href: '/students', icon: <img alt='student' src={student} width="24px" /> },
        { name: 'Клиенты', href: '/clients', icon: <img alt='client' src={client} width="24px" /> },
        { name: 'Расписание', href: '/schedule', icon: <img alt='schedule' src={schedule} width="24px" /> },
        { name: 'Финансы', href: '/finances', icon: <img alt='finance' src={finance} width="24px" /> },
        { name: 'Отчёты', href: '/reports', icon: <img alt='report' src={report} width="24px" /> },
        { name: 'Профиль', href: '/profile', icon: <img alt='profile' src={profile} width="24px" /> },

    ],
    manager: [
        { name: 'Лиды', href: '/leads', icon: <img alt='lead' src={lead} width="24px" /> },
        { name: 'Клиенты', href: '/clients', icon: <img alt='client' src={client} width="24px" /> },
        { name: 'Профиль', href: '/profile', icon: <img alt='profile' src={profile} width="24px" /> },
    ],
    admin: [
        { name: 'Школы', href: '/admin/schools' },
        { name: 'Профиль', href: '/profile', icon: <img alt='profile' src={profile} width="24px" /> },

    ],
    receptionist: [
        { name: 'Ученики', href: '/students', icon: <img alt='student' src={student} width="24px" /> },
        { name: 'Расписание', href: '/schedule', icon: <img alt='schedule' src={schedule} width="24px" /> },
        { name: 'Профиль', href: '/profile', icon: <img alt='profile' src={profile} width="24px" /> },

    ],
    teacher: [
        { name: 'Ученики', href: '/students', icon: <img alt='student' src={student} width="24px" /> },
        { name: 'Расписание', href: '/schedule', icon: <img alt='schedule' src={schedule} width="24px" /> },
        { name: 'Профиль', href: '/profile', icon: <img alt='profile' src={profile} width="24px" /> },

    ],
    accountant: [
        { name: 'Финансы', href: '/finances', icon: <img alt='finance' src={finance} width="24px" /> },
        { name: 'Профиль', href: '/profile', icon: <img alt='profile' src={profile} width="24px" /> },

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
