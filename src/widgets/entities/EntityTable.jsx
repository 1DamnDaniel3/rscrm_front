import { Table, TableRow, TableCell } from '../../shared'
import s from './EntityTable.module.css'

export const EntityTable = ({ data, columns, actions }) => {
  return (
    <Table>
      {/* Header */}
      <TableRow className={s.header}>
        <TableCell children="#" maxWidth = '20px' align='center' />
        {columns.map((col) => (
          <TableCell
            key={col.key}
            align={col.align}
            ellipsis={col.ellipsis}
            maxWidth={col.maxWidth}
            title={col.title}
          >
            {col.title}
          </TableCell>
        ))}
        {actions && <TableCell align="center">Действия</TableCell>}
      </TableRow>


      {/* Rows */}
      {data.map((item, index) => (
        <TableRow key={item.id}>
          <TableCell children={index + 1} maxWidth = '40px' />
          {columns.map((col) => (
            <TableCell
              key={col.key}
              align={col.align}
              ellipsis={col.ellipsis}
              maxWidth={col.maxWidth}

              editable={col.editable}
              editType={col.editType}
              options={col.options}
              // onSave={(newValue) => handleCellSave(row.id, col.key, newValue)} Тут отправлять PUT запрос на изменение через handler
            >
              {col.render ? col.render(item[col.key], item) : item[col.key]}
            </TableCell>
          ))}
          {actions && (
            <TableCell align="center">
              {actions(item)}
            </TableCell>
          )}
        </TableRow>
      ))}
    </Table>
  )
}
