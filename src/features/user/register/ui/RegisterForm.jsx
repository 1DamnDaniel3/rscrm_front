import s from './RegisterForm.module.css'
import { handleLoginSubmit } from '../model/registerFormHandler'
import { APIs, Input } from '../../../../shared'
import { useReducer } from 'react'
import { initialState, registerReducer } from '../model/regisretReducer'
import { type } from '@testing-library/user-event/dist/type'

export const RegisterForm = ({ setIsLoggin }) => {
    const [state, dispatchLocal] = useReducer(registerReducer, initialState)
    const registerUser = APIs.user.registerAdminSchool;

    const OnSubmit = (e) => {
        e.preventDefault();
        handleLoginSubmit({ state, dispatchLocal, registerUser })
        dispatchLocal({type: 'SET_USER_EMAIL'})
        setIsLoggin(true)
    }

    return (
        <form onSubmit={OnSubmit} className={s.form}>
            <div className={s.columns}>


                <div className={s.column}>
                    <p>О вас:</p>
                    <Input type="email" label="Email" value={state.account.email || ''}
                        onChange={(e) => dispatchLocal({ type: 'SET_USER_EMAIL', payload: e.target.value })} />
                    <Input type="password" label="Password" value={state.account.password || ''}
                        onChange={(e) => dispatchLocal({ type: 'SET_PASSWORD', payload: e.target.value })} />
                    <Input type="text" label="Полное имя" value={state.profile.full_name || ''}
                        onChange={(e) => dispatchLocal({ type: 'SET_USER_NAME', payload: e.target.value })} />
                    <Input type="text" label="Телефон" value={state.profile.phone || ''}
                        onChange={(e) => dispatchLocal({ type: 'SET_USER_PHONE', payload: e.target.value })} />
                    <Input type="date" label="Дата рождения" value={state.profile.birthdate || ''}
                        onChange={(e) => dispatchLocal({ type: 'SET_BIRTHDATE', payload: e.target.value })} />
                </div>

                <div className={s.column}>
                    <p>О школе:</p>
                    <Input type="email" label="Email" value={state.school.email || ''}
                        onChange={(e) => dispatchLocal({ type: 'SET_SCHOOL_EMAIL', payload: e.target.value })} />
                    <Input type="text" label="Город" value={state.school.city || ''}
                        onChange={(e) => dispatchLocal({ type: 'SET_CITY', payload: e.target.value })} />
                    <Input type="text" label="Наименование организации" value={state.school.name || ''}
                        onChange={(e) => dispatchLocal({ type: 'SET_SCHOOL_NAME', payload: e.target.value })} />
                    <Input type="text" label="Телефон" value={state.school.phone || ''}
                        onChange={(e) => dispatchLocal({ type: 'SET_SCHOOL_PHONE', payload: e.target.value })} />

                </div>
            </div>

            <button type="submit" className={s.button}>
                Зарегистрироваться
            </button>
        </form>
    )

}
