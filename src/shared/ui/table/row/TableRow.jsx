import cn from 'classnames'
import s from './TableRow.module.css'

export const TableRow = ({ 
    children, 
    onClick, 
    className = '', 
    hoverable = true 
}) => {
    return (
        <div 
            className={cn(
                s.row,
                { [s.hoverable]: hoverable },
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    )
}
