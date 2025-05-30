import { IconButton } from "../IconButton/IconButton";
import plus from '../../assets/icons/plusIcon.svg'
import cn from 'classnames'
import s from './Footer.module.css'

export const Footer = ({className, onClick, butthonClass}) => {
    return (
        <footer className={cn(className, s.footer)}>
            <IconButton icon={plus} onClick={onClick} className={cn(butthonClass, s.plusBtn)}/>
        </footer>
    )
};