import { useEffect, useState } from 'react';
import { normalizeToInputDate } from '../../../lib/formatDate';
import { IMaskInput } from 'react-imask';
import cn from 'classnames';
import s from './TableCell.module.css';

export const TableCell = ({
    children,          // Для select: это ID; для текста/телефона — само значение
    align = 'left',
    ellipsis = false,
    maxWidth,
    className = '',
    editable = false,
    editType = 'text', // 'text' | 'select' | 'date' | 'textarea'
    isPhone = false,
    options = [],      // Для select: [{ id, name }, …]
    onSave,
}) => {
    const [isEditing, setIsEditing] = useState(false);

    // Исходное значение → draftValue
    const [draftValue, setDraftValue] = useState(() => {
        if (editType === 'date') {
            return normalizeToInputDate(String(children));
        }
        return String(children);
    });

    useEffect(() => {
        if (editType === 'date') {
            setDraftValue(normalizeToInputDate(String(children)));
        } else {
            setDraftValue(String(children));
        }
    }, [children, editType]);

    const style = {};
    if (maxWidth) {
        style.maxWidth = maxWidth;
        style.width = maxWidth;
        style.minWidth = 0;
        style.flex = `0 0 ${maxWidth}`;
    }

    const handleBlur = () => {
        setIsEditing(false);

        if (editType === 'date' && isNaN(Date.parse(draftValue))) return;

        if (onSave && draftValue !== String(children)) {
            onSave(draftValue);
        }
    };


    const handleChange = (value) => {
        setDraftValue(value);
    };

    const renderEditor = () => {
        switch (editType) {
            case 'text':
                // Если телефон, используем IMaskInput
                return isPhone ? (
                    <IMaskInput
                        className={cn(s.input, className)}
                        mask="+7 (000) 000-00-00"
                        unmask={false} 
                        value={draftValue}
                        onAccept={handleChange}
                        onBlur={handleBlur}
                        autoFocus
                    />
                ) : (
                    <input
                        className={cn(s.input, className)}
                        value={draftValue}
                        onChange={e => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        autoFocus
                    />
                );

            case 'select':
                return (
                    <select
                        className={cn(s.input, className)}
                        value={draftValue}
                        onChange={e => {
                            const newVal = e.target.value;
                            setDraftValue(newVal);
                            onSave?.(newVal);
                        }}
                    >
                        {options.map(opt => (
                            <option key={opt.id} value={opt.id}>
                                {opt.name}
                            </option>
                        ))}
                    </select>
                );

            case 'date':
                return (
                    <input
                        type="date"
                        className={cn(s.input, className)}
                        value={draftValue}
                        onChange={e => {
                            const newVal = e.target.value;
                            setDraftValue(newVal);
                            onSave?.(newVal);
                        }}
                        onBlur={handleBlur}
                        autoFocus
                    />
                );

            case 'textarea':
                return (
                    <textarea
                        className={cn(s.input, className)}
                        value={draftValue}
                        onChange={e => handleChange(e.target.value)}
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

    const displayValue =
        !shouldEdit && editType === 'select'
            ? options.find(opt => String(opt.id) === String(children))?.name || ''
            : !shouldEdit && isPhone
                ? draftValue 
                : children;

    return (
        <div
            className={cn(
                s.cell,
                s[align],
                { [s.ellipsis]: ellipsis },
                className
            )}
            style={style}
            title={ellipsis ? String(displayValue) : undefined}
            onClick={() => {
                if (editable && isClickToEdit) {
                    setIsEditing(true);
                }
            }}
        >
            {shouldEdit ? renderEditor() : displayValue}
        </div>
    );
};
