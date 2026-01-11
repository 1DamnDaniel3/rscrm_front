import { useState, useRef, useEffect } from 'react';
import cn from 'classnames'
import s from './EditableText.module.css'

// Shared компонента для изменяемого текста. 
export const EditableText = ({ value, onSave, className = '' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef(null);  

  // при монтировании если запущен процесс редактирования и 
  // ссылка на input есть, то сразу навести курсор на input
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setDraft(value);
  }, [value]);
  // завершить редактирование, ткнув в любую область
  const handleBlur = () => {
    setIsEditing(false);
    if (draft !== value) {
      onSave(draft);
    }
  };
  // просто чтобы можно было поддтвердить или прервать редактирование на кнопки
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
    if (e.key === 'Escape') {
      setDraft(value);
      setIsEditing(false);
    }
  };

  // если есть value - то показать value, если нет, то "-" в span
  // в input показывать draft
  return isEditing ? (
    <input
      ref={inputRef}
      className={cn(className, s.input)}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  ) : (
    <span
      className={cn(className, s.span)}
      onDoubleClick={() => setIsEditing(true)}
    >
      {value || '—'}
    </span>
  );
};
