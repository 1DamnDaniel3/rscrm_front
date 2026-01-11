import { Paper, Table, TableBody, TableCell,
         TableContainer, TableHead, TableRow } from '@mui/material';
import {
      selectLeads,
      selectSchoolProfiles, selectSchoolUsers,
       selectSelectedGroupId, selectSourcesById, selectStatuses,
       selectStatusesByid} from '../../../entities';
import { useSelector } from 'react-redux';
import { formatDateTime } from '../../../shared';


export const LeadsTable = () => {
    const profiles = useSelector(selectSchoolProfiles)
    const statuses = useSelector(selectStatusesByid);
    const sources = useSelector(selectSourcesById);
    const group_id = useSelector(selectSelectedGroupId);
    const users = useSelector(selectSchoolUsers);
    const leads = useSelector(selectLeads);


    
    return(
        <div>
            <TableContainer component={Paper}>

                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Имя</TableCell>
                            <TableCell>Телефон</TableCell>
                            <TableCell>Квалификация</TableCell>
                            <TableCell>Ресурс</TableCell>
                            <TableCell>Статус</TableCell>
                            <TableCell>Пробное</TableCell>
                            <TableCell>Кем создан</TableCell>
                            <TableCell>Когда</TableCell>
                            <TableCell>Конвертирован</TableCell>
                        </TableRow>
                    </TableHead>

                    {/* ====================== Body ====================*/}

                    <TableBody>
                        {leads.map(lead => {
                            const sourceName = sources[lead.source_id]?.name || '';
                            const statusName = statuses[lead.status_id]?.name || '';
                            // const userName = profiles[lead.created_by]?.full_name || '';


                            return (
                            <TableRow key={lead.id}>

                                <TableCell>{lead.id}</TableCell>
                                <TableCell>{lead.name}</TableCell>  
                                <TableCell>{lead.phone}</TableCell>
                                <TableCell>{lead.qualification}</TableCell>
                                <TableCell>{sourceName}</TableCell>
                                <TableCell>{statusName}</TableCell>
                                <TableCell>{formatDateTime(lead.trial_date)}</TableCell>
                                <TableCell>{"userName"}</TableCell>

                            </TableRow>
                        
                        )})}

                    </TableBody>

                </Table>

            </TableContainer>


        </div>
    )
}