import cn from 'classnames'
import s from './AddButton.module.css'

export const AddButton = ({ className, children }) => {
    return (
        <button className={cn(className, s.button)}>
            {children}
        </button>
    )
}