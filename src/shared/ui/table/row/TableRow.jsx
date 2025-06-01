import { useState } from 'react';
import cn from 'classnames';
import s from './TableRow.module.css';

export const TableRow = ({
  children,
  extraContent = null,
  className = '',
  onClick,
  hoverable = true,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = (e) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  };

  return (
    <>
      <div
        className={cn(s.row, { [s.hoverable]: hoverable }, className)}
        onClick={onClick}
      >

        {children}
        {/* Иконка для разворачивания */}
        {extraContent && (
          <div className={s.expandToggle} onClick={toggleExpand}>
            {expanded ? '▲' : '▼'}
          </div>
        )}
      </div>
      {expanded && extraContent && (
        <div className={s.expandedContent}>
          {extraContent}
        </div>
      )}
    </>
  );
};
