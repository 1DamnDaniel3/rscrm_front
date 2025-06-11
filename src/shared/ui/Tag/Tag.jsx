import React from 'react';
import cn from 'classnames';
import s from './Tag.module.css';

// /**
//  * @param {string} text — содержимое тега ("18:00")
//  * @param {string} color — CSS-цвет (#ffcc00) или ключ (red, blue…)
//  */
export const Tag = ({ text, color }) => {
  const className = cn(s.tag, {
    [s[`tag_${color}`]]: !!color && !color.startsWith('#'),
  });
  const style = color && color.startsWith('#') ? { backgroundColor: color } : {};

  return (
    <span className={className} style={style}>
      {text}
    </span>
  );
};
