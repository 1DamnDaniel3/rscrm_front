// SelectShort.jsx
import React, { useState, useRef, useEffect } from 'react';
import s from './SelectShort.module.css';

export const SelectShort = ({
  options = [],           // [{ label, value }]
  value = null,           
  onChange = () => {},    
  placeholderIcon = null, 
  className = ''          
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Закрываем при клике вне
  useEffect(() => {
    const onClickOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleToggle = e => {
    e.stopPropagation();            // предотвращаем всплытие до родительского <Button>
    setOpen(o => !o);
  };

  const handleSelect = (e, val) => {
    e.stopPropagation();            // чтобы не закрывать родительский Button
    onChange(val);
    setOpen(false);
  };

  return (
    <div className={`${s.wrapper} ${className}`} ref={ref}>
      <button
        type="button"
        className={s.toggle}
        onClick={handleToggle}
      >
        {placeholderIcon || (
          <svg viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M11.9997 10.8284L7.04996 15.7782L5.63574 14.364L11.9997 8L18.3637 14.364L16.9495 15.7782L11.9997 10.8284Z"
              fill="rgba(255,255,255,1)"
            />
          </svg>
        )}
      </button>

      {open && (
        <ul className={s.options}>
          {options.map(opt => (
            <li
              key={opt.value}
              className={`${s.option} ${opt.value === value ? s.selected : ''}`}
              onClick={e => handleSelect(e, opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
