import cn from 'classnames'
import s from './Table.module.css'

export const Table = ({ children, className = '' }) => {
    return (
        <div className={cn(s.table, className)}>
            {children}
        </div>
    )
}
