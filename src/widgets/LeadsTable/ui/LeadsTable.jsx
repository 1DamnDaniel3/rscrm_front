import { Paper, Table, TableBody, TableCell,
         TableContainer, TableHead, TableRow, IconButton as IcBtn, 
         Collapse,
         Box,
         Select,
         MenuItem, TextField} from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import DatePicker from 'react-date-picker';
import { debounce } from 'lodash';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import {
    deleteLead,
      selectGroups,
      selectLeads,
      selectProfilesById,
      selectSchoolUsers,
       selectSelectedGroupId, selectSources, selectSourcesById,
       selectSourcesIds,
       selectStatuses,
       selectStatusesByid,
       selectStatusesIds,
       updateLead} from '../../../entities';
import { useDispatch, useSelector } from 'react-redux';
import { formatDateTime, IconButton, Instruction, EditableText, SelectLong } from '../../../shared';
import icon from '../../../shared/assets/icons/garbage.svg';
import { Fragment, useState } from 'react';
import s from './LeadsTable.module.css'
import upArrow from '../../../shared/assets/images/upArrow.svg'
import downArrow from '../../../shared/assets/images/downArrow.svg'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';



export const LeadsTable = () => {
    const dispatch = useDispatch();
    const [trialDate, setTrialDate] = useState(null);  

    // data draw
    const profiles = useSelector(selectProfilesById)
    const statuses = useSelector(selectStatusesByid);
    const sources = useSelector(selectSourcesById);
    const groups = useSelector(selectGroups)
    const group_id = useSelector(selectSelectedGroupId);
    const users = useSelector(selectSchoolUsers);
    const leads = useSelector(selectLeads);

    // anotger data
    const instructionShow = groups.length === 0 || groups.length > 0 && leads.length === 0
    const sourcesIds = useSelector(selectSourcesIds)
    const statusesIds = useSelector(selectStatusesIds)
    dayjs.locale('ru');

    // expandable Rows

    const [openRowId, setOpenRowId] = useState(null);

    const toggleRow = (id) => {
        setOpenRowId(prev => (prev === id ? null : id));
    };

    

    return(
        <div>
            <TableContainer component={Paper} className={s.tableContainer}>

                <Table>

                    <TableHead className={s.tablehead}>
                        <TableRow>
                            <TableCell className={s.cell}>#</TableCell>
                            <TableCell className={s.cell}>Имя</TableCell>
                            <TableCell className={s.cell}>Телефон</TableCell>
                            <TableCell className={s.cell}>Ресурс</TableCell>
                            <TableCell className={s.cell}>Статус</TableCell>
                            <TableCell className={s.cell}>Пробное</TableCell>
                            <TableCell className={s.cell}>Удалить</TableCell>
                            <TableCell className={s.cell}>Подробнее</TableCell>
                        </TableRow>
                    </TableHead>


                    {/* ====================== Body ====================*/}

                    <TableBody>
                        {leads.map((lead, idx) => {
                            const userName = profiles[lead.created_by]?.full_name || '';


                            return (

                            <Fragment key={lead.id}>  
                            <TableRow key={lead.id} className={s.infoRow}>

                                <TableCell className={s.cell}>{idx+1}</TableCell>
                                <TableCell className={s.cell}>
                                    <EditableText value={lead.name} className={s.NameInput} clicksToEdit={1}
                                        onSave={(newVal) => dispatch(updateLead({id: lead.id, data: {name: newVal}}))}/>
                                </TableCell> 

                                <TableCell className={s.cell}>
                                    <EditableText value={lead.phone} className={s.PhoneInput} type="tel" clicksToEdit={1}
                                        onSave={(newVal) => dispatch(updateLead({id: lead.id, data: {phone: newVal}}))}/>
                                </TableCell>

                                <TableCell className={s.cell}>
                                    <Select
                                        size="small"
                                        value={sourcesIds.includes(lead.source_id)  ? lead.source_id : ''}
                                        displayEmpty
                                        onChange={(e) =>
                                        dispatch(updateLead({
                                            id: lead.id,
                                            data: { source_id: e.target.value }
                                        }))}
                                        className={s.MselectRoot}
                                    >
                                        <MenuItem value="" disabled>
                                        —
                                        </MenuItem>

                                        {sourcesIds.map(srcID => (
                                        <MenuItem key={srcID} value={srcID}>
                                            {sources[srcID].name}
                                        </MenuItem>
                                        ))}

                                    </Select>
                                </TableCell>
                                <TableCell className={s.cell}>
                                    <Select
                                        size="small"
                                        value={statusesIds.includes(lead.status_id) ? lead.status_id : ''}
                                        displayEmpty
                                        onChange={(e) =>
                                        dispatch(updateLead({
                                            id: lead.id,
                                            data: { status_id: e.target.value }
                                        }))}
                                        className={s.StatselectRoot}
                                        
                                    >
                                        <MenuItem value="" disabled>
                                        —
                                        </MenuItem>

                                        {statusesIds.map(statusID => (
                                        <MenuItem key={statusID} value={statusID}>
                                            {statuses[statusID].name}
                                        </MenuItem>
                                        ))}

                                    </Select>
                                </TableCell>
                                <TableCell className={s.cell}>
                                        <DatePicker onChange={(val) =>console.log(val)}
                                         value={lead.trial_date ? lead.trial_date : null}/>
                                    {/* {formatDateTime(lead.trial_date)} */}
                                
                                </TableCell>

                                <TableCell className={s.cell}><IconButton icon={icon}
                                title='Удалить' type='button' onClick={()=> dispatch(deleteLead(lead.id))}/></TableCell>

                                <TableCell padding="checkbox">
                                    <IcBtn size="small" sx={{color: "white"}} onClick={() => toggleRow(lead.id)}>
                                        {openRowId === lead.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IcBtn>
                                </TableCell>

                            </TableRow>

                            {/* ===== РАСКРЫВАЕМАЯ СТРОКА ===== */}

                                <TableRow>
                                    <TableCell
                                        colSpan={11} // ВАЖНО: по количеству колонок
                                        style={{ paddingBottom: 0, paddingTop: 0 }}
                                        className={s.expandableRow}
                                    >
                                        <Collapse in={openRowId === lead.id} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 2 }}>
                                            <div> <span>Заметка:</span>
                                                <EditableText value={lead.qualification} 
                                                className={s.LongText }
                                                clicksToEdit={1}
                                                onSave={(newVal) => 
                                                dispatch(updateLead({id: lead.id, data: {qualification: newVal}}))}/>
                                            </div>
                                            <div> <span>Добавлен: </span>
                                                {userName} {formatDateTime(lead.created_at)}
                                            </div>
                                            <div> <span>Переведён в клиента: </span>
                                                {formatDateTime(lead.converted_to_client_at)}
                                            </div>

                                        </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                                

                            </Fragment>  
                       
                        )})}

                    </TableBody>

                </Table>

            </TableContainer>
            
            {instructionShow ? 
            <div className={s.instructionContainer}>
                {groups.length === 0 ? 
                <div className={s.instruction}>
                    <Instruction text={"Добавьте группы"}/>
                    <img className={s.DownArrow} src={downArrow}></img>
                </div> 
                 : null}
                {groups.length > 0 && leads.length === 0 ? 
                <div className={s.instruction}>
                    <Instruction text={"Добавьте лидов"}/>
                    <img className={s.UpArrow} src={upArrow}></img>

                </div>
                : null}
            </div> : null}
            
        </div>
    )
}