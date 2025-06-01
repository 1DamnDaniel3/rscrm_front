import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteLead, selectUser, selectLeads, fetchLeads, selectStatuses } from '../../../../../entities'
import { DeleteEntityBtn } from '../../../../../features'
import { formatDate, normalizeToInputDate } from '../../../../../shared'
import { EntityTable } from '../../../EntityTable'
import { fetchStatuses } from '../../../../../entities/status/model/statusSlice'
import s from './LeadsTable.module.css'
// import { LeadStatusTag } from '@/entities/lead'

export const LeadsTable = ({ onEdit }) => {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const leads = useSelector(selectLeads);
  const status = useSelector(selectStatuses)

  useEffect(() => {

    const schoolId = user.school_id === "null" ? null : user.school_id;
    if (schoolId) {
      dispatch(fetchLeads(schoolId))
      dispatch(fetchStatuses(schoolId))
    }


  }, [dispatch, user.school_id])
  const statusOptions = (statusList) => statusList.map(s => s.name)



  const columns = [
    { key: 'name', title: 'Имя', ellipsis: true, maxWidth: "150px", editable: true, editType: 'text' },
    { key: 'phone', title: 'Телефон', ellipsis: true, maxWidth: "150px", editable: true, editType: 'text' },
    { key: 'source_name', title: 'Источник', ellipsis: true, maxWidth: "150px", align: "center", },
    // { key: 'qualification', title: 'Квалификация', ellipsis: true, maxWidth: "300px", editable: true, editType: 'text' },
    {
      key: 'trial_date', title: 'Дата пробного', render: formatDate, ellipsis: true, maxWidth: "170px", align: "center",
      editable: true, editType: 'date'
    },
    {
      key: 'created_at', title: 'Добавлен', render: formatDate, ellipsis: true, maxWidth: "170px", align: "center",
      editable: true, editType: 'date'
    },
    // { key: 'converted_to_client_at', title: 'Реализован', render: (value) => value || '—', ellipsis: true, maxWidth: "100px", align: "center" },
    {
      key: 'status_name', title: 'Этап', ellipsis: true, maxWidth: "170px", align: "center",
      editable: true, editType: 'select', options: statusOptions(status)
    },
    // { key: 'created_by', title: 'Кем создан', ellipsis: true, maxWidth: "100px", align: "center" },
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

  return <EntityTable
    data={leads}
    columns={columns}
    actions={actions}
    expandedColumns={expandedColumns} />
}
