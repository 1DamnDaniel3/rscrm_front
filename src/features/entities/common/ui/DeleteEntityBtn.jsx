import { IconButton } from '../../../../shared'
import { useDispatch } from 'react-redux'
import trashIco from '../../../../shared/assets/icons/garbage.svg'
import s from './DeleteEntityBtn.module.css'


export const DeleteEntityBtn = ({ entityName, deleteThunk, id }) => {
  const dispatch = useDispatch()

  const handleDelete = async () => {
    try {
      await dispatch(deleteThunk(id)).unwrap()
    } catch (err) {
      console.error(`Ошибка удаления ${entityName || 'сущности'}`, err)
    }
  }

  return (
    <IconButton
      className={s.deleteBtn}
      icon={trashIco}
      onClick={handleDelete}
      title="Удалить запись"
    />
  )
}
