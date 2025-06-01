import { useState } from 'react';
import { normalizeToInputDate } from '../../../lib/formatDate';
import cn from 'classnames';
import s from './TableCell.module.css';


export const TableCell = ({
    children,
    align = 'left',
    ellipsis = false,
    maxWidth,
    className = '',
    editable = false,
    editType = 'text', // 'text' | 'select' | 'date'
    options = [],       // для select
    onSave,             // (newValue) => void
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [draftValue, setDraftValue] = useState(() => {
        if (editType === 'date') {
            return normalizeToInputDate(String(children));
        }
        return String(children);
    });

    const style = {};
    if (maxWidth) {
        style.maxWidth = maxWidth;
        style.width = maxWidth;
        style.minWidth = 0;
        style.flex = `0 0 ${maxWidth}`;
    }
    const handleBlur = () => {
        setIsEditing(false);
        if (onSave && draftValue !== String(children)) {
            onSave(draftValue);
        }
    };


    const handleChange = (e) => {
        setDraftValue(e.target.value);
    };

    const renderEditor = () => {
        switch (editType) {
            case 'text':
                return (
                    <input
                        className={s.input}
                        value={draftValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoFocus
                    />
                );
            case 'select':
                return (
                    <select
                        className={s.input}
                        value={draftValue}
                        onChange={(e) => {
                            setDraftValue(e.target.value);
                            onSave?.(e.target.value);
                        }}
                    >
                        {options.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                );
            case 'date':
                return (
                    <input
                        type="date"
                        className={s.input}
                        value={draftValue}
                        onChange={(e) => {
                            setDraftValue(e.target.value);
                            onSave?.(e.target.value);
                        }}
                    />
                );
            case 'textarea':
                return (
                    <textarea
                        className={s.input}
                        value={draftValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoFocus
                        rows={4}
                    />
                );
            default:
                return null;

        }
    };

    const isAutoEditor = editType === 'select' || editType === 'date';
    const isClickToEdit = editType === 'text' || editType === 'textarea';
    const shouldEdit = editable && (isEditing || isAutoEditor);

    return (
        <div
            className={cn(
                s.cell,
                s[align],
                { [s.ellipsis]: ellipsis },
                className
            )}
            style={style}
            title={ellipsis ? String(children) : undefined}
            onClick={() => {
                if (editable && isClickToEdit) {
                    setIsEditing(true);
                }
            }}
        >
            {shouldEdit ? renderEditor() : children}
        </div>
    );
};
