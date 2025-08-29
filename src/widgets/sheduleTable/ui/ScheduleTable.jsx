import s from './ScheduleTable.module.css'
import { AddEntityBtn } from '../../../features'

const mockData = [
    {
        id: 1,
        group: 'Группа для новичков',
        weekday: 'Вторник',
        teacher: 'Teacher',
        time: '18:00',
        duration: '60 мин',
        activeFrom: '01.09.2025',
        activeTo: '31.12.2025',
    },
    {
        id: 2,
        group: 'Группа для новичков',
        weekday: 'Вторник',
        teacher: 'Teacher',
        time: '19:00',
        duration: '60 мин',
        activeFrom: '01.09.2025',
        activeTo: '31.12.2025',
    },
    {
        id: 3,
        group: 'Группа для новичков',
        weekday: 'Четверг',
        teacher: 'Teacher',
        time: '17:00',
        duration: '60 мин',
        activeFrom: '01.09.2025',
        activeTo: '31.12.2025',
    },
    {
        id: 4,
        group: 'Взрослые',
        weekday: 'Понедельник',
        teacher: 'Teacher',
        time: '19:00',
        duration: '90 мин',
        activeFrom: '01.09.2025',
        activeTo: '31.12.2025',
    },
    {
        id: 5,
        group: 'Взрослые',
        weekday: 'Пятница',
        teacher: 'Teacher',
        time: '19:00',
        duration: '90 мин',
        activeFrom: '01.09.2025',
        activeTo: '31.12.2025',
    },
]

export const MockScheduleTable = () => {
    return (
        <div className={s.wrapper}>
            <h2 className={s.title}>Управление расписанием</h2>

            <div className={s.aboveTableActions}>
                <AddEntityBtn />
            </div>
            <table className={s.table}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Группа</th>
                        <th>День недели</th>
                        <th>Преподаватель</th>
                        <th>Начало</th>
                        <th>Длительность</th>
                        <th>Активно с</th>
                        <th>Активно по</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {mockData.map((lesson, index) => (
                        <tr key={lesson.id}>
                            <td>{index + 1}</td>
                            <td>{lesson.group}</td>
                            <td>{lesson.weekday}</td>
                            <td>{lesson.teacher}</td>
                            <td>{lesson.time}</td>
                            <td>{lesson.duration}</td>
                            <td>{lesson.activeFrom}</td>
                            <td>{lesson.activeTo}</td>
                            <td className={s.actionsCell}>
                                <button className={s.deleteBtn}>🗑</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
