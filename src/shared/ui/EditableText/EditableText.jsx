import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import cn from 'classnames'
import { IMaskInput } from 'react-imask';
import s from './EditableText.module.css'


// Shared компонента для изменяемого текста. 
export const EditableText = forwardRef(({ value, onSave, className = '', type, clicksToEdit = 2  }, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const isPhone = type === "tel"
  const [clickCount, setClickCount] = useState(0); 
  const inputRef = useRef(null);  

  // Активация focus из другого компонента
  useImperativeHandle(ref, () => ({
    focusEditable: () => {
      setIsEditing(true)
      console.log(isEditing)
    }
  }));

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

  // Обработчик кликов
  const handleClick = () => {
    setClickCount((prev) => prev + 1);
  };

  // Проверка на количество кликов
  useEffect(() => {
    if (clickCount === clicksToEdit) {
      setIsEditing(true);
      setClickCount(0); // Сбрасываем количество кликов
    }
  }, [clickCount, clicksToEdit]);

  // если есть value - то показать value, если нет, то "-" в span
  // в input показывать draft
  if (!isEditing) {
    return (
      <span
        className={cn(className, s.span)}
        onClick={handleClick}
      >
        {value || '—'}
      </span>
    );
  }

if (isPhone) {
  return (
    <IMaskInput
      mask="+{7}(000)000-00-00"
      inputRef={inputRef}
      value={draft}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onAccept={(val) => setDraft(val)}
      placeholder=" "
      className={cn(className, s.input)}
    />
  );
}

return (
  <input
    ref={inputRef}
    className={cn(className, s.input)}
    value={draft}
    onChange={(e) => setDraft(e.target.value)}
    onBlur={handleBlur}
    onKeyDown={handleKeyDown}
  />
);
});
