import cn from 'classnames'
import s from './Footer.module.css'

export const Footer = ({className, children}) => {
    return (
        <footer className={cn(className, s.footer)}>
            {children}
        </footer>
    )
};