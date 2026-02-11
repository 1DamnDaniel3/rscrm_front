import { Table, TableContainer, TableHead, TableRow, TableCell, Paper, TableBody } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectStudents, updateStudent } from '../../../entities'
import { Fragment } from 'react'
import { EditableText } from '../../../shared'
import s from './StudentsTable.module.css'



export const StudentsTable = () => {
    const dispatch = useDispatch();
    const students = useSelector(selectStudents);

    return (
    <div>
        <TableContainer component={Paper} className={s.tableContainer}> 

                <Table>

                    <TableHead className={s.tablehead}>
                        <TableRow>
                            <TableCell className={s.cell}>#</TableCell>
                            <TableCell className={s.cell}>Имя</TableCell>
                            <TableCell className={s.cell}>Уровень навыков</TableCell>
                            <TableCell className={s.cell}>Дата рождения</TableCell>
                            <TableCell className={s.cell}>Возраст</TableCell>
                            <TableCell className={s.cell}>Контакт</TableCell>
                            <TableCell className={s.cell}>Удалить</TableCell>
                            <TableCell className={s.cell}>Подробнее</TableCell>
                        </TableRow>
                    </TableHead>

                    {/* ====================== BODY ====================== */}

                    <TableBody>

                        {students.map((student, idx) => {

                            return(
                                <Fragment key={student.id}>

                                    <TableRow key={student.id} className={s.infoRow}>

                                        <TableCell className={s.cell}>{idx + 1}</TableCell>
                                        <TableCell className={s.cell}>
                                            <EditableText value={student.name} className={s.NameInput} clicksToEdit={1}
                                                onSave={(newVal) => dispatch(updateStudent({id: student.id, data: {name: newVal}}))}/>
                                        </TableCell>
                                        <TableCell className={s.cell}>{student.skill_level}</TableCell>
                                        <TableCell className={s.cell}>{student.birthdate}</TableCell>
                                        <TableCell className={s.cell}>вычислить</TableCell>
                                        <TableCell className={s.cell}>
                                            
                                            <EditableText value={student.contact} className={s.NameInput} clicksToEdit={1}
                                                onSave={(newVal) => dispatch(updateStudent({id: student.id, data: {name: newVal}}))}/>
                                            </TableCell>
                                        <TableCell className={s.cell}>Удалить</TableCell>
                                        <TableCell className={s.cell}>^</TableCell>
                                    </TableRow>

                                </Fragment>
                            )

                        })}

                    </TableBody>

                </Table>
        </TableContainer>
    </div>)
}