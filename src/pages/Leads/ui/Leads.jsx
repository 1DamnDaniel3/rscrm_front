import { Navigation, GroupFooter, LeadsTable } from '../../../widgets'
import {useLoadPageData} from '../model/useLoadPageData'
import { HeroBlock } from '../../../shared'
import s from './Leads.module.css'
import { useEffect } from 'react'



export const Leads = () => {
    useLoadPageData({entity_type: "lead"});
    
    return (
        <div className={s.pageContainer}>
            <HeroBlock heroTitle={"LEADS"}/>
            <LeadsTable/>
            <Navigation />
            <GroupFooter entity_type={"lead"} />

        </div>
    )
}