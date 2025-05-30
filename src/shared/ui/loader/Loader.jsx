import s from './Loader.module.css'
import cn from 'classnames'

export const Loader = ({className}) => {
    return (
        <div className={cn(s.loader, className)}>
            <li className={s.ball}></li>
            <li className={s.ball}></li>
            <li className={s.ball}></li>
        </div>
    )
}