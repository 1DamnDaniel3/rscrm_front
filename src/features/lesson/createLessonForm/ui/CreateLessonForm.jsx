import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button, ButtonLink, SelectLong } from '../../../../shared'
import {
    fetchGroups,
    fetchStyles,
    selectGroups,
    selectStyles,
    selectUser,
    fetchUsers,
    selectSchoolUsers,
    addLesson,
} from '../../../../entities'
import s from './CreateLessonForm.module.css'

export const CreateLessonForm = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const teachers = useSelector(selectSchoolUsers)
    const groups = useSelector(selectGroups)
    const styles = useSelector(selectStyles)

    const [formData, setFormData] = useState({
        group_id: '',
        direction_id: '',
        teacher_id: '',
        lesson_date: '',
        start_time: '',
        duration_minutes: '',
        is_canceled: false,
        school_id: user.school_id || '',
    })

    useEffect(() => {
        const schoolId = user.school_id === 'null' ? null : user.school_id
        if (schoolId) {
            dispatch(fetchUsers({ school_id: schoolId, role: 'teacher' }))
            dispatch(fetchStyles(schoolId))
            dispatch(fetchGroups({ school_id: schoolId, entity_type: 'student' }))
            setFormData(fd => ({ ...fd, school_id: schoolId }))

        }
    }, [dispatch, user?.school_id])

    const handleChange = e => {
        const { name, value, type } = e.target
        setFormData(fd => ({
            ...fd,
            [name]:
                type === 'number'
                    ? value === '' ? '' : Number(value)
                    : value,
        }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(addLesson(formData))
            .unwrap()
            .then(() => {
                setFormData({
                    group_id: '',
                    direction_id: '',
                    teacher_id: '',
                    lesson_date: '',
                    start_time: '',
                    duration_minutes: '',
                    is_canceled: false,
                    school_id: formData.school_id,
                })
            })
            .catch(err => {
                console.error('Ошибка создания урока:', err)
            })
    }

    // опции для <SelectLong>
    const teacherOptions = teachers.map(u => ({
        value: u.id,
        label: u.UserProfile?.full_name || '— без имени —',
    }))
    const groupOptions = groups.map(g => ({
        value: String(g.id),
        label: g.name,
    }))
    const styleOptions = styles.map(st => ({
        value: String(st.id),
        label: st.name,
    }))

    return (
        <form className={s.form} onSubmit={handleSubmit}>
            <SelectLong
                name="teacher_id"
                label="Преподаватель"
                options={teacherOptions}
                value={formData.teacher_id}
                onChange={handleChange}
            />

            <SelectLong
                name="group_id"
                label="Группа"
                options={groupOptions}
                value={formData.group_id}
                onChange={handleChange}
            />

            <SelectLong
                name="direction_id"
                label="Направление (стиль)"
                options={styleOptions}
                value={formData.direction_id}
                onChange={handleChange}
            />

            <Input
                type="date"
                name="lesson_date"
                label="Дата урока"
                value={formData.lesson_date}
                onChange={handleChange}
            />

            <Input
                type="time"
                name="start_time"
                label="Время начала"
                value={formData.start_time}
                onChange={handleChange}
            />

            <Input
                type="number"
                name="duration_minutes"
                label="Длительность (минуты)"
                value={formData.duration_minutes}
                onChange={handleChange}
            />

            <div className={s.actions}>
                <ButtonLink
                    className={s.buttonLink}
                    text="Отмена"
                    onClick={() =>
                        setFormData(fd => ({
                            ...fd,
                            group_id: '',
                            direction_id: '',
                            teacher_id: '',
                            lesson_date: '',
                            start_time: '',
                            duration_minutes: '',
                        }))
                    }
                />
                <button className={s.button} type="submit">Создать урок</button>
            </div>
        </form>
    )
}
