import { Navigation, GroupFooter } from '../../../widgets'
import { HeroBlock } from '../../../shared'
import s from './Clients.module.css'



export const Clients = () => {

    return (
        <div className={s.pageContainer}>
            <HeroBlock heroTitle={"CLIENTS"}/>
            <Navigation />
            <GroupFooter entity_type={"client"} />

        </div>
    )
}