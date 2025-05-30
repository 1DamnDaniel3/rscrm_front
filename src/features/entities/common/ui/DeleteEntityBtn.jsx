import { IconButton } from '../../../../shared'
import trashIco from '../../../../shared/assets/icons/garbage.svg'
import { useDispatch } from 'react-redux'

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
      icon={trashIco}
      onClick={handleDelete}
      title="Удалить"
    />
  )
}
