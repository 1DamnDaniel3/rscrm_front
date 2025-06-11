import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addClient, deleteClient, fetchClients, selectClients, selectSelectedGroupId, selectUser, updateClient } from '../../../../../entities';
import { AddEntityBtn, DeleteEntityBtn } from '../../../../../features';
import { formatDate, getAgeFromBirthdate } from '../../../../../shared';
import { EntityTable } from '../../../EntityTable';
import s from './ClientsTable.module.css'


export const ClientsTable = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const clients = useSelector(selectClients);
    const addThunk = addClient;
    const updateThunk = updateClient;
    const deleteThunk = deleteClient;
    const currentGroup = useSelector(selectSelectedGroupId)


    const groupedClient = currentGroup ? clients.filter(client =>
        Array.isArray(client.groups) && client.groups.some(group => group.id === currentGroup)) : [];

    const defaultAddData = {
        name: "Новый клиент",
        contact: '',
        phone: '',
        school_id: user.school_id,
        group_id: currentGroup,
    }

    useEffect(() => {

        const schoolId = user.school_id === 'null' ? null : user.school_id;
        if (schoolId) {
            dispatch(fetchClients(schoolId));
        }


    }, [dispatch, user.school_id])

    const columns = [
        { key: 'name', title: 'Имя', ellipsis: true, maxWidth: "250px", editable: true, editType: 'text' },
        { key: 'phone', title: 'Телефон', isPhone: true, ellipsis: true, maxWidth: "150px", editable: true, editType: 'text' },
        { key: 'contact', title: 'Контакт', ellipsis: true, maxWidth: "290px", editable: true, editType: 'text', },
        { key: 'created_at', title: 'Создан', isPhone: true, maxWidth: "100px", render: formatDate },
        { key: 'age', title: 'Возраст', align: 'center', maxWidth: "69px", render: getAgeFromBirthdate },
        { key: 'birthdate', title: 'Дата рождения', maxWidth: "140px", editable: true, editType: 'date', align: 'center' },
    ]

    const actions = (client) => (
        <>
            <DeleteEntityBtn
                entity={{
                    name: 'client'
                }}
                deleteThunk={deleteThunk}
                id={client.id}
            />
        </>
    )

    return (
        <div className={s.studentTable}>
            <div className={s.aboveTableActions}>
                <AddEntityBtn
                    entityName={"client"}
                    addThunk={addThunk}
                    entityData={defaultAddData}
                    onSuccess={() => dispatch(fetchClients(user.school_id))}

                />
            </div>
            <div>
                <EntityTable
                    data={groupedClient}
                    columns={columns}
                    updateThunk={updateThunk}
                    actions={actions}
                />
            </div>
        </div>
    )
}