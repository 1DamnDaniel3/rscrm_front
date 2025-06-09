import { useDispatch, useSelector } from 'react-redux';
import { addStudent, deleteStudent, fetchStatuses, fetchStudents, selectSelectedGroupId, selectStatuses, selectStudents, selectUser, updateStudent } from '../../../../../entities';
import { EntityTable } from '../../../EntityTable';
import { useEffect } from 'react';
import { formatDate, getAgeFromBirthdate } from '../../../../../shared';
import s from './StudentsTable.module.css';
import { render } from '@testing-library/react';
import { DeleteEntityBtn } from '../../../../../features';
import { DataList } from './DataList';



export const StudentTable = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const students = useSelector(selectStudents);
    const statuses = useSelector(selectStatuses)
    const addThunk = addStudent;
    const updateThunk = updateStudent;
    const deleteThunk = deleteStudent;
    const currentGroup = useSelector(selectSelectedGroupId)

    console.log(students)

    const groupedStudents = currentGroup ? students.filter(student =>
        Array.isArray(student.groups) && student.groups.some(group => group.id === currentGroup)) : [];

    const defaultAddData = {
        name: "Новый ученик",
    }

    useEffect(() => {

        const schoolId = user.school_id === 'null' ? null : user.school_id;
        if (schoolId) {
            dispatch(fetchStudents(schoolId));
            dispatch(fetchStatuses({ school_id: schoolId, type: "student" }))
        }

    }, [dispatch, user.school_id])

    const statusOptions = (statusList) => statusList.map(s => ({ name: s.name, id: s.id }));


    const columns = [
        { key: 'name', title: 'Имя', ellipsis: true, maxWidth: "180px", editable: true, editType: 'text' },
        { key: 'birthdate', title: 'Дата рождения', maxWidth: "150px", editable: true, editType: 'date' },
        { key: 'age', title: 'Возраст', align: 'center', maxWidth: "69px", render: getAgeFromBirthdate },
        { key: 'created_at', title: 'Зачислен(-а)', editable: false, ellipsis: true, maxWidth: "100px", render: formatDate },
        { key: 'skill_level', title: 'Уровень', align: 'center', maxWidth: "150px" },
        { key: 'contact', title: 'Контакт', align: 'left', ellipsis: true, maxWidth: "200px", editable: true, editType: 'text' },
        {
            key: 'status_name', title: 'Cтатус', align: 'left', ellipsis: true,
            maxWidth: "100px", editable: true, editType: 'select', options: statusOptions(statuses)
        },
    ]

    const expandedColumns = [
        {
            key: 'clients', title: 'Клиенты', ellipsis: true,
            render: (_, student) =>
                (<DataList data={student.clients} name={'client_name'}/>)
        },
        {
            key: 'subscriptions', title: 'Абонементы', ellipsis: true,
            render: (_, student) =>
                (<DataList data={student.subscriptions} />)
        },
    ]

    const actions = (student) => (
        <>
            <DeleteEntityBtn
                entity={{
                    name: 'student'
                }}
                deleteThunk={deleteThunk}
                id={student.id}
            />
        </>
    )

    return (
        <div className={s.studentTable}>
            <div>

            </div>
            <div>
                <EntityTable
                    data={groupedStudents}
                    columns={columns}
                    updateThunk={updateThunk}
                    expandedColumns={expandedColumns}
                    actions={actions}
                />
            </div>
        </div>
    )
}