import { CreateLessonForm } from '../../../features/lesson'
import { HeroBlock } from '../../../shared'
import { Navigation, ScheduleCalendar, MockScheduleTable } from '../../../widgets'

import s from './Schedule.module.css'

export const Shedule = () => {
    return (
        <div>
            <Navigation />
            <div className={s.content}>
                <HeroBlock heroTitle={"SCHEDULE"} />
                <ScheduleCalendar />
                <MockScheduleTable />
                <h2 className={s.title}>Создать занятие</h2>
                <CreateLessonForm />
            </div>

        </div>
    )
}