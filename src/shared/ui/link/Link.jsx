import s from './Link.module.css'


export const Link = ({ className, text, href }) => {
    return (
        <a
            className={className || s.menu__link}
            href={href || "#"}
        >
            {text}
        </a>
    )
}