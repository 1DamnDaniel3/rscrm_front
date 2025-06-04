import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteLead, selectUser, selectLeads, fetchLeads, selectStatuses, selectSources, fetchSources, updateLead, addLead } from '../../../../../entities'
import { AddEntityBtn, DeleteEntityBtn } from '../../../../../features'
import { formatDate, normalizeToInputDate } from '../../../../../shared'
import { EntityTable } from '../../../EntityTable'
import { fetchStatuses } from '../../../../../entities'
import s from './LeadsTable.module.css'

export const LeadsTable = ({ onEdit }) => {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const leads = useSelector(selectLeads);
  const status = useSelector(selectStatuses);
  const source = useSelector(selectSources);
  const updateThunk = updateLead;
  const addThunk = addLead;


  const defaultAddData = {
    name: "Новый Лид",
    phone: "",
    source_id: 1,
    status_id: 1,
    qualification: "",
    created_by: user.id,
    school_id: user.school_id,
  }

  useEffect(() => {

    const schoolId = user.school_id === "null" ? null : user.school_id;
    if (schoolId) {
      dispatch(fetchLeads(schoolId));
      dispatch(fetchStatuses(schoolId));
      dispatch(fetchSources());
    }


  }, [dispatch, user.school_id])
  const statusOptions = (statusList) => statusList.map(s => ({ name: s.name, id: s.id }))
  const sourceOptions = (sourceList) => sourceList.map(s => ({ name: s.name, id: s.id }))




  const columns = [
    { key: 'name', title: 'Имя', ellipsis: true, maxWidth: "150px", editable: true, editType: 'text' },
    { key: 'phone', title: 'Телефон', ellipsis: true, maxWidth: "150px", editable: true, editType: 'text', isPhone: true },
    {
      key: 'source_name', dataKey: 'source_id', title: 'Источник', ellipsis: true, maxWidth: "150px", align: "center",
      editable: true, editType: 'select', options: sourceOptions(source)
    },
    {
      key: 'trial_date', title: 'Дата пробного', render: formatDate, ellipsis: true, maxWidth: "170px", align: "center",
      editable: true, editType: 'date'
    },
    {
      key: 'created_at', title: 'Добавлен', render: formatDate, ellipsis: true, maxWidth: "170px", align: "center",
      editable: true, editType: 'date'
    },
    {
      key: 'status_name', dataKey: 'status_id', title: 'Этап', ellipsis: true, maxWidth: "170px", align: "center",
      editable: true, editType: 'select', options: statusOptions(status)
    },
  ]

  const expandedColumns = [
    {
      key: 'qualification',
      title: 'Квалификация:',
      editable: true,
      editType: 'textarea',
      maxWidth: '1270px',
    },
    {
      key: 'created_by',
      title: 'Кем создан: ',
      editable: false,
      maxWidth: '400px',
    },
    {
      key: 'converted_to_client_at',
      ellipsis: true,
      editable: true,
      editType: 'date',
      title: 'Реализован',
      render: formatDate,
    },
  ];


  const actions = (lead) => (
    <>
      <DeleteEntityBtn
        entity={{
          name: 'lead'
        }}
        deleteThunk={deleteLead}
        id={lead.id}
      />
    </>
  )

  return (
    <div className={s.leadsTable}>
      <div className={s.aboveTableActions}>
        <AddEntityBtn
          entityName={"leads"}
          addThunk={addThunk}
          entityData={defaultAddData}

        />
      </div>
      < EntityTable
        data={leads}
        columns={columns}
        actions={actions}
        expandedColumns={expandedColumns}
        updateThunk={updateThunk}
      />
    </div>
  )
}
