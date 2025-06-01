import s from './HeroBlock.module.css'

export const HeroBlock = ({ heroTitle }) => {
    return (
        <div className={s.heroBlock}>
            <h1 className={s.title}>{heroTitle}</h1>
            <span className={s.line}></span>
        </div>
    )
}
