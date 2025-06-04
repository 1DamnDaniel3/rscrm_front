import { LeadsTable, Navigation, GroupFooter } from '../../../widgets'
import { HeroBlock } from '../../../shared'
import s from './Leads.module.css'



export const Leads = () => {
    return (
        <div className={s.pageContainer}>
            <HeroBlock heroTitle={"LEADS"}/>
            <Navigation />
            <LeadsTable />
            <GroupFooter />

        </div>
    )
}