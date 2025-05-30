import { useState } from 'react';
import cn from 'classnames';
import s from './TableCell.module.css';

const toInputDate = (dateStr) => {
  const parts = dateStr.split('.');
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  return dateStr;
};

const fromInputDate = (value) => {
  const parts = value.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}.${month}.${year}`;
  }
  return value;
};

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
      return toInputDate(String(children));
    }
    return String(children);
  });

  const style = {};
  if (ellipsis && maxWidth) {
    style.maxWidth = maxWidth;
    style.width = maxWidth;
    style.minWidth = 0;
  }

  const handleBlur = () => {
    setIsEditing(false);
    if (onSave && draftValue !== String(children)) {
      const valueToSave =
        editType === 'date' ? fromInputDate(draftValue) : draftValue;
      onSave(valueToSave);
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
              onSave?.(fromInputDate(e.target.value));
            }}
          />
        );
      default:
        return null;
    }
  };

  const isAutoEditor = editType === 'select' || editType === 'date';
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
        if (editable && editType === 'text') {
          setIsEditing(true);
        }
      }}
    >
      {shouldEdit ? renderEditor() : children}
    </div>
  );
};
