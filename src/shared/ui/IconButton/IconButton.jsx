import cn from 'classnames'
import s from './IconButton.module.css'

export const IconButton = ({ 
  icon, 
  onClick, 
  title = '', 
  className = '', 
  type = 'button',
  iconClass
}) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      title={title}
      aria-label={title}
      className={cn(s.iconButton, className)}
    >
      <img className={cn(iconClass, s.image)} src={icon} alt={icon} />
    </button>
  )
}
