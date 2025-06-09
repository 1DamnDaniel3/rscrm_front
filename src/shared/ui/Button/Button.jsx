// Button.jsx
import React from 'react';
import cn from 'classnames';
import s from './Button.module.css';

export const Button = ({ className, children, onClick }) => {
  const handleKeyPress = (e) => {
    const tag = e.target.tagName;
    const isTextInput = tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable;

    if (!isTextInput && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(e);
    }
  };


  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(className, s.button)}
      onClick={onClick}
      onKeyPress={handleKeyPress}
    >
      {children}
    </div>
  );
};
