import s from './Leads.module.css'
import { LeadsTable, Navigation, GroupFooter } from '../../../widgets'
import { HeroBlock } from '../../../shared'


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