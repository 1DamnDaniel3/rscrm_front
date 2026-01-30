import { Navigation, GroupFooter, LeadsTable } from '../../../widgets'
import {useLoadPageData} from '../model/useLoadPageData'
import { Button, HeroBlock } from '../../../shared'
import s from './Leads.module.css'
import { addLead } from '../../../entities'
import { useDispatch } from 'react-redux'



export const Leads = () => {
    const dispatch = useDispatch();
    const { newLeadData } = useLoadPageData({entity_type: "lead"});
    
    return (
        <div className={s.pageContainer}>
            <Button className={s.addButton} onClick={()=> dispatch(addLead(newLeadData))}/>
            <HeroBlock heroTitle={"LEADS"}/>
            <LeadsTable/>
            <Navigation />
            <GroupFooter entity_type={"lead"} />

        </div>
    )
}