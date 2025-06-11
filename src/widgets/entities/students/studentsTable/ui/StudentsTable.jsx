import { useDispatch, useSelector } from 'react-redux';
import {
    addStudent, deleteStudent, fetchStatuses,
    fetchStudents, selectSelectedGroupId, selectStatuses,
    selectStudents, selectUser, updateStudent
} from '../../../../../entities';
import { EntityTable } from '../../../EntityTable';
import { useEffect } from 'react';
import { formatDate, getAgeFromBirthdate } from '../../../../../shared';
import { AddEntityBtn, DeleteEntityBtn } from '../../../../../features';
import s from './StudentsTable.module.css';




export const StudentTable = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const students = useSelector(selectStudents);
    const statuses = useSelector(selectStatuses)
    const addThunk = addStudent;
    const updateThunk = updateStudent;
    const deleteThunk = deleteStudent;
    const currentGroup = useSelector(selectSelectedGroupId)


    const groupedStudents = currentGroup ? students.filter(student =>
        Array.isArray(student.groups) && student.groups.some(group => group.id === currentGroup)) : [];

    const defaultAddData = {
        name: "Новый ученик",
        skill_level: 'beginner',
        school_id: user.school_id,
        group_id: currentGroup,
    }

    useEffect(() => {

        const schoolId = user.school_id === 'null' ? null : user.school_id;
        if (schoolId) {
            dispatch(fetchStudents(schoolId));
            dispatch(fetchStatuses({ school_id: schoolId, type: "student" }))
        }

    }, [dispatch, user.school_id])

    const statusOptions = (statusList) => statusList.map(s => ({ name: s.name, id: s.id }));
    const skillOptions = [
        { name: 'beginner', id: 'beginner', },
        { name: 'middle', id: 'middle', },
        { name: 'pro', id: 'pro', }]


    const columns = [
        { key: 'name', title: 'Имя', ellipsis: true, maxWidth: "180px", editable: true, editType: 'text' },
        { key: 'birthdate', title: 'Дата рождения', maxWidth: "150px", editable: true, editType: 'date' },
        { key: 'age', title: 'Возраст', align: 'center', maxWidth: "69px", render: getAgeFromBirthdate },
        { key: 'created_at', title: 'Зачислен(-а)', editable: false, ellipsis: true, maxWidth: "100px", render: formatDate },
        { key: 'skill_level', title: 'Уровень', align: 'center', maxWidth: "150px", editable: true, editType: 'select', options: skillOptions },
        { key: 'contact', title: 'Контакт', align: 'left', ellipsis: true, maxWidth: "200px", editable: true, editType: 'text' },
        {
            key: 'status_name', title: 'Cтатус', align: 'left', ellipsis: true,
            maxWidth: "100px", editable: true, editType: 'select', options: statusOptions(statuses)
        },
    ]

    // Новая конфигурация sub-таблиц:
    const expandedColumns = [
        {
            key: 'clients',
            title: 'Клиенты',
            // описываем колонки для каждого клиента
            subColumns: [
                {
                    key: 'client_name', title: 'Имя клиента', maxWidth: '250px',
                },
                {
                    key: 'phone', title: 'Телефон', maxWidth: '150px',
                },
                {
                    key: 'relation', title: 'Кем является', maxWidth: '100px', align: 'center',
                },
                {
                    key: 'contact', title: 'контакт', maxWidth: '400px', 
                },

            ],
        },
        {
            key: 'subscriptions',
            title: 'Абонементы',
            subColumns: [
                {
                    key: 'sub_name', title: 'Название абонемента', maxWidth: '180px', ellipsis: true
                },
                {
                    key: 'issued_at', title: 'Начало', align: 'left', render: formatDate, maxWidth: '150px', editable: true, editType: 'date'
                },
                {
                    key: 'expires_at', title: 'Окончание', align: 'left', render: formatDate, maxWidth: '150px',
                },
                {
                    key: 'remaining_visits', title: 'Осталось посещений', align: 'center', maxWidth: '150px',
                },
            ],
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
            <div className={s.aboveTableActions}>
                <AddEntityBtn
                    entityName={"students"}
                    addThunk={addThunk}
                    entityData={defaultAddData}
                    onSuccess={() => dispatch(fetchStudents(user.school_id))}

                />
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