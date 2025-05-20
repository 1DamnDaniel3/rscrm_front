import s from './Loader.module.css'

export const Loader = () => {
    return (
        <div className={s.loader}>
            <li className={s.ball}></li>
            <li className={s.ball}></li>
            <li className={s.ball}></li>
        </div>
    )
}