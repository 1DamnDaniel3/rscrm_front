import { Table, TableRow, TableCell } from '../../shared'
import s from './EntityTable.module.css'

export const EntityTable = ({ data, columns, actions, expandedColumns }) => {
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
        // Формируем JSX для дополнительного раскрываемого содержимого
        const extraContent = expandedColumns ? (
          <div className={s.expanded}>
            {expandedColumns.map((col) => (
              <div className={s.expandedRow}>
                <strong>{col.title}</strong>{' '}

                <TableRow>
                  <TableCell
                    key={col.key}
                    align={col.align}
                    ellipsis={col.ellipsis}
                    maxWidth={col.maxWidth}
                    editable={col.editable}
                    editType={col.editType}
                    options={col.options}
                    onSave={(newValue) => {
                      console.log(`Save: ${item.id}.${col.key} = ${newValue}`)
                    }}
                  >

                    {col.render
                      ? col.render(item[col.key], item)
                      : item[col.key] || '—'}
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
                options={col.options}
                onSave={(newValue) => {
                  console.log(`Save: ${item.id}.${col.key} = ${newValue}`)
                }}
              >
                {col.render ? col.render(item[col.key], item) : item[col.key]}
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