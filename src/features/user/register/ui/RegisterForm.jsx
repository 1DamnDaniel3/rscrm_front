import { handleLoginSubmit } from '../model/registerFormHandler'
import { APIs, Input } from '../../../../shared'
import { useReducer } from 'react'
import { initialState, registerReducer } from '../model/regisretReducer'
import s from './RegisterForm.module.css'


export const RegisterForm = ({ setIsLoggin }) => {
    const [state, dispatchLocal] = useReducer(registerReducer, initialState)
    const registerUser = APIs.user.registerAdminSchool;

    const OnSubmit = (e) => {
        e.preventDefault();
        const rightDate = state.profile.birthdate
    ? new Date(state.profile.birthdate).toISOString()
    : null;

     // создаём обновлённый объект
      const updatedState = {
        ...state,
        profile: {
          ...state.profile,
          birthdate: rightDate,
        },
      };

        handleLoginSubmit({ state: updatedState, dispatchLocal, registerUser })
        setIsLoggin(true)
    }

    

    return (
        <form onSubmit={OnSubmit} className={s.form}>
            <div className={s.columns}>


                <div className={s.column}>
                    <p>О вас:</p>
                    
                    <Input type="email" className={s.formField} label={"Email"} value={state.account.email || '' }
                        onChange={(e) => dispatchLocal({ type: 'SET_USER_EMAIL', payload: e.target.value})} required />
                    <Input type="password" className={s.formField} label="Password" value={state.account.password || ''}
                        onChange={(e) => dispatchLocal({ type: 'SET_PASSWORD', payload: e.target.value })} required />
                    <Input type="text" className={s.formField} label="Полное имя" value={state.profile.full_name || ''}
                        onChange={(e) => dispatchLocal({ type: 'SET_USER_NAME', payload: e.target.value })} required />
                    
                    <Input type="tel" className={s.formField} label="Телефон" autoComplete = "tel" value={state.profile.phone || ''}
                        onChange={(e) => dispatchLocal({ type: 'SET_USER_PHONE', payload: e.target.value })}  required/>
                    <Input type="date" className={s.formField} label="Дата рождения" value={state.profile.birthdate || ''}
                        onChange={(e) => dispatchLocal({ type: 'SET_BIRTHDATE', payload: e.target.value })} required/>
                </div>

                <div className={s.column}>
                    <p>О школе:</p>
                    <Input type="email" className={s.formField} label="Email" value={state.school.email || ''}
                        onChange={(e) => dispatchLocal({ type: 'SET_SCHOOL_EMAIL', payload: e.target.value })} />
                    <Input type="text" className={s.formField} label="Город" value={state.school.city || ''}
                        onChange={(e) => dispatchLocal({ type: 'SET_CITY', payload: e.target.value })} required/>
                    <Input type="text" className={s.formField} label="Наименование организации" value={state.school.name || ''}
                        onChange={(e) => dispatchLocal({ type: 'SET_SCHOOL_NAME', payload: e.target.value })} required/>
                    <Input type="tel" className={s.formField} label="Телефон" value={state.school.phone || ''}
                        onChange={(e) => dispatchLocal({ type: 'SET_SCHOOL_PHONE', payload: e.target.value })} />
                    <div className={s.requiredInfoWrapper}>
                        <i className={s.requiredSymbol}>*</i>
                        <span> — обязательные поля</span>
                    </div>

                </div>
            </div>

            <button type="submit" className={s.button}>
                Зарегистрироваться
            </button>
        </form>
    )

}
