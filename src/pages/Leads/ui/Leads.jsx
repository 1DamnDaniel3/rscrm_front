import s from './Leads.module.css'
import { LeadsTable, Navigation, GroupFooter } from '../../../widgets'


export const Leads = () => {
    return (
        <div className={s.pageContainer}>
            <h1>LEADS</h1>
            <Navigation />
            <LeadsTable />
            <GroupFooter/>

        </div>
    )
}