import { Navigation, GroupFooter, ClientsTable } from '../../../widgets'
import { HeroBlock } from '../../../shared'
import s from './Clients.module.css'



export const Clients = () => {

    return (
        <div className={s.pageContainer}>
            <HeroBlock heroTitle={"CLIENTS"}/>
            <Navigation />
            <ClientsTable />
            <GroupFooter entity_type={"client"} />

        </div>
    )
}