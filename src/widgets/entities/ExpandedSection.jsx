// components/EntityTable/ExpandedSection.jsx
import React from 'react'
import { Table, TableRow, TableCell } from '../../shared'
import s from './EntityTable.module.css'

/**
 * Универсальный ExpandedSection:
 *
 * - config: {
 *     key, title,
 *     // для старого сценария:
 *     render?, editable, editType, options, isPhone, ellipsis, maxWidth, dataKey,
 *     // для “под-таблицы”:
 *     subColumns?: [{ key, title, render?, align, ellipsis, maxWidth, dataKey?, editable?, editType?, options? }, …]
 *   }
 * - parentItem: объект строки таблицы
 * - onSave: (entityId, fieldKey, newValue) => void
 */
export const ExpandedSection = ({ config, parentItem, onSave }) => {
    const {
        key,
        title,
        render,
        editable,
        editType,
        options,
        isPhone,
        ellipsis,
        maxWidth,
        dataKey,
        subColumns,
    } = config

    const value = parentItem[key]
    const list = Array.isArray(value) ? value : [value]

    return (
        <div className={s.expandedRow}>
            <strong className={s.expandedTitle}>{title}</strong>
            <Table className={s.Table}>

                {/* ————— Шапка вложенной таблицы ————— */}
                {subColumns && (
                    <TableRow className={s.subHeader}>
                        {subColumns.map(col => (
                            <TableCell className={s.headerCells}
                                key={col.key}
                                align={col.align}
                                ellipsis={col.ellipsis}
                                maxWidth={col.maxWidth}
                            >
                                {col.title}
                            </TableCell>
                        ))}
                    </TableRow>
                )}
                {subColumns ? (
                    // “под-таблица” для массива subColumns
                    list.map(subItem => (
                        <TableRow key={subItem.id ?? JSON.stringify(subItem)} className={s.row}>
                            {subColumns.map(col => (
                                <TableCell
                                    className={s.expandedCell}
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
                                            onSave(
                                                // для subItem мы пока не меняем “сущность” — диспатчим с родительским ID
                                                parentItem.id,
                                                col.dataKey || col.key,
                                                newValue
                                            )
                                        }
                                    }}
                                >
                                    {col.render
                                        ? col.render(subItem[col.key], subItem)
                                        : subItem[col.key] ?? '—'}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    // единичная строка с одним TableCell
                    list.map((single, i) => (
                        <TableRow key={i} className={s.row}>
                            <TableCell
                                className={s.expandedCell}
                                align={config.align}
                                ellipsis={ellipsis}
                                maxWidth={maxWidth}
                                editable={editable}
                                editType={editType}
                                isPhone={isPhone}
                                options={options}
                                onSave={newValue => {
                                    if (editable) {
                                        onSave(parentItem.id, dataKey || key, newValue)
                                    }
                                }}
                            >
                                {render
                                    ? render(parentItem[key], parentItem)
                                    : parentItem[key] ?? '—'}
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </Table>
        </div>
    )
}
