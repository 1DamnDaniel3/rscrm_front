// components/EntityTable/EntityTable.jsx
import { Table, TableRow, TableCell } from '../../shared'
import { useDispatch } from 'react-redux'
import { ExpandedSection } from './ExpandedSection'
import s from './EntityTable.module.css'


export const EntityTable = ({ data, columns, actions, expandedColumns, updateThunk }) => {
  const dispatch = useDispatch()

  // коллбэк на все onSave
  const onSaveHandler = (entityId, fieldKey, newValue) => {
    dispatch(updateThunk({ id: entityId, data: { [fieldKey]: newValue } }))
  }

  return (
    <Table>
      {/* Заголовок */}
      <TableRow className={s.header}>
        <TableCell children="#" maxWidth="20px" align="center" />
        {columns.map(col => (
          <TableCell
            key={col.key}
            align={col.align}
            ellipsis={col.ellipsis}
            maxWidth={col.maxWidth}
          >
            {col.title}
          </TableCell>
        ))}
        {actions && (
          <TableCell align="center" maxWidth="200px">
            Действия
          </TableCell>
        )}
      </TableRow>

      {/* Строки */}
      {data.map((item, idx) => {
        const extraContent = expandedColumns && (
          <div className={`${s.expanded} ${s.expandedVisible}`}>
            {expandedColumns.map(cfg => (
              <ExpandedSection
                key={cfg.key}
                config={cfg}
                parentItem={item}
                onSave={onSaveHandler}
              />
            ))}
          </div>
        )

        return (
          <TableRow key={item.id} extraContent={extraContent}>
            <TableCell children={idx + 1} maxWidth="20px" align="center" />
            {columns.map(col => (
              <TableCell
                key={col.key}
                align={col.align}
                ellipsis={col.ellipsis}
                maxWidth={col.maxWidth}
                editable={col.editable}
                editType={col.editType}
                isPhone={col.isPhone}
                options={col.options}
                onSave={newValue =>
                  onSaveHandler(item.id, col.dataKey || col.key, newValue)
                }
              >
                {col.editType === 'select'
                  ? item[col.dataKey]
                  : col.render
                    ? col.render(item[col.key], item)
                    : item[col.key]}
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
