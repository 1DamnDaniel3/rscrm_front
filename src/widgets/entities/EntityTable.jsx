import { Table, TableRow, TableCell } from '../../shared'
import s from './EntityTable.module.css'
import { useDispatch } from 'react-redux'

export const EntityTable = ({ data, columns, actions, expandedColumns, updateThunk }) => {
  const dispatch = useDispatch()

  const onSaveHandler = (entity_id, data) => {
    console.log('data', data)
    dispatch(updateThunk({ id: entity_id, data }))
  }

  return (
    <Table>
      {/* Заголовок */}
      <TableRow className={s.header}>
        <TableCell children="#" maxWidth="20px" align="center" />
        {columns.map((col) => (
          <TableCell
            key={col.key}
            align={col.align}
            ellipsis={col.ellipsis}
            maxWidth={col.maxWidth}
          >
            {col.title}
          </TableCell>
        ))}
        {actions && <TableCell align="center" maxWidth="200px">Действия</TableCell>}
      </TableRow>

      {/* Строки */}
      {data.map((item, index) => {
        // JSX для дополнительного раскрываемого содержимого
        const extraContent = expandedColumns ? (
          <div className={`${s.expanded} ${s.expandedVisible}`}>
            {expandedColumns.map((col) => (
              <div className={s.expandedRow} key={col.key}>
                <strong>{col.title}</strong>{' '}
                <TableRow>
                  <TableCell
                    key={col.key}
                    align={col.align}
                    ellipsis={col.ellipsis}
                    maxWidth={col.maxWidth}
                    editable={col.editable}
                    editType={col.editType}
                    isPhone={col.isPhone}
                    options={col.options}
                    onSave={(newValue) => {
                      const field = col.dataKey || col.key
                      onSaveHandler(item.id, { [field]: newValue })
                    }}
                  >
                    {col.render ? col.render(item[col.key], item) : item[col.key] || '—'}
                  </TableCell>
                </TableRow>
              </div>
            ))}
          </div>
        ) : null

        return (
          <TableRow key={item.id} extraContent={extraContent}>
            <TableCell children={index + 1} maxWidth="20px" align="center" />
            {columns.map((col) => (
              <TableCell
                key={col.key}
                align={col.align}
                ellipsis={col.ellipsis}
                maxWidth={col.maxWidth}
                editable={col.editable}
                editType={col.editType}
                isPhone={col.isPhone}
                options={col.options}
                onSave={(newValue) => {
                  const field = col.dataKey || col.key
                  onSaveHandler(item.id, { [field]: newValue })
                }}
              >
                {col.editType === 'select'
                  ? item[col.dataKey]
                  : (col.render ? col.render(item[col.key], item) : item[col.key])}
              </TableCell>
            ))}
            {actions && (
              <TableCell align="center" maxWidth="200px">
                {actions(item)}
              </TableCell>
            )}
          </TableRow>
        )
      })}
    </Table>
  )
}
