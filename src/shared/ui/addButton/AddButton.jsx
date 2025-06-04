import cn from 'classnames'
import s from './AddButton.module.css'

export const AddButton = ({ className, children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={cn(className, s.button)}>
                {children}
        </button>
    )
};  