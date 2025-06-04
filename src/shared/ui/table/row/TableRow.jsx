import { useState, useRef, useEffect } from 'react';
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
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  const toggleExpand = (e) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  };

  useEffect(() => {
    if (contentRef.current) {
      setHeight(expanded ? contentRef.current.scrollHeight : 0);
    }
  }, [expanded, extraContent]);

  return (
    <>
      <div
        className={cn(s.row, { [s.hoverable]: hoverable }, className)}
        onClick={onClick}
      >
        {children}
        {extraContent && (
          <div className={s.expandToggle} onClick={toggleExpand}>
            {expanded ? '▲' : '▼'}
          </div>
        )}
      </div>
      {extraContent && (
        <div
          ref={contentRef}
          className={s.expandedWrapper}
          style={{
            maxHeight: `${height}px`,
            opacity: expanded ? 1 : 0,
          }}
        >
          <div className={s.expandedContent}>{extraContent}</div>
        </div>
      )}
    </>
  );
};
