import { CreateLessonForm } from '../../../features/lesson'
import { HeroBlock } from '../../../shared'
import { Navigation, ScheduleCalendar } from '../../../widgets'

import s from './Schedule.module.css'

export const Shedule = () => {
    return (
        <div>
            <Navigation />
            <div className={s.content}>
                <HeroBlock heroTitle={"SCHEDULE"}/>
                <ScheduleCalendar />
                <CreateLessonForm/>
            </div>

        </div>
    )
}