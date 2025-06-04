import { useDispatch } from 'react-redux'
import { IconButton } from '../../../../shared';
import icon from '../../../../shared/assets/icons/plusIcon.svg'
import s from './AddEntity.module.css'


export const AddEntityBtn = ({ entityName, addThunk, entityData }) => {
    const dispatch = useDispatch();

    const handleCreate = async () => {
        try {
            await dispatch(addThunk(entityData)).unwrap()
        } catch (err) {
            console.error(`Ошибка добавления ${entityName || 'сущности'}`, err)
        }
    }

    return (
        <IconButton
            title='Добавить запись'
            className={s.button}
            icon={icon}
            onClick={handleCreate}
            iconClass={s.icon}
        />
    )
}