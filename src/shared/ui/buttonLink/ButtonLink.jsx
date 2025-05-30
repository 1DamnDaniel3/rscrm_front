import cn from 'classnames'
import s from './ButtonLink.module.css'

export const ButtonLink = ({ className, text, onClick  }) => {
  return (
    <button
      type={"button"}
      className={cn(className, s.buttonLink)}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
