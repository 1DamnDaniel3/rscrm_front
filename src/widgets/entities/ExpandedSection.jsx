// components/EntityTable/ExpandedSection.jsx
import React from 'react'
import { Table, TableRow, TableCell } from '../../shared'
import s from './EntityTable.module.css'

/**
 * ExpandedSection рендерит заголовок и
 * либо одну строку, либо несколько — если items массив.
 *
 * props:
 * - title: string — заголовок секции
 * - items: array или единичный объект
 * - subColumns: массив конфигураций для ячеек в под-таблице:
 *     { key, align, ellipsis, maxWidth, render? }
 * - onSave: функция (id, fieldKey, newValue) для сохранения
 */
export const ExpandedSection = ({ title, items, subColumns, onSave }) => {
  // приводим к массиву, чтобы унифицировать рендер
  const list = Array.isArray(items) ? items : [items]

  return (
    <div className={s.expandedRow}>
      <strong className={s.expandedTitle}>{title}</strong>
      <Table>
        {list.map(subItem => (
          <TableRow key={subItem.id ?? JSON.stringify(subItem)}>
            {subColumns.map(col => (
              <TableCell
                key={col.key}
                align={col.align}
                ellipsis={col.ellipsis}
                maxWidth={col.maxWidth}
                editable={col.editable}
                editType={col.editType}
                isPhone={col.isPhone}
                options={col.options}
                onSave={newValue => {
                  if (col.editable) {
                    onSave(subItem.id ?? null, col.dataKey || col.key, newValue)
                  }
                }}
              >
                {col.render
                  ? col.render(subItem[col.key], subItem)
                  : subItem[col.key] ?? '—'}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </Table>
    </div>
  )
}
