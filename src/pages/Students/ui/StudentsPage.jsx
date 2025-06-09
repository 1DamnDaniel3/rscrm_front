import { StudentTable, GroupFooter, Navigation } from '../../../widgets'
import { HeroBlock } from '../../../shared'
import s from './StudentsPage.module.css'

export const StudentsPage = () => {
    return(
        <div className={s.pageContainer}>
            <Navigation/>
            <HeroBlock heroTitle={"STUDENTS"}/>
            <StudentTable/>
            <GroupFooter entity_type={"student"}/>
        </div>
    )
}