import { useReducer } from "react";
import { loginReducer, initialState } from "../model/loginReducer";
import { handleLoginSubmit } from "../model/loginFormHandlers";
import { useNavigate } from "react-router-dom";
import { Input } from '../../../../shared'

import s from './LoginForm.module.css';
import { useDispatch } from "react-redux";


export const LoginForm = () => {
  const [state, dispatchLocal] = useReducer(loginReducer, initialState);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLoginSubmit({ state, dispatchLocal, dispatch, navigate });
    } catch (error) {
      console.log(error)
    }


  };

  return (

    <form onSubmit={onSubmit} className={s.form}>

      <Input
        type="email"
        value={state.email}
        onChange={(e) => dispatchLocal({ type: 'SET_EMAIL', payload: e.target.value })}
        autoComplete="off"
        label="Email"

      />
      <Input
        type="password"
        value={state.password}
        onChange={(e) => dispatchLocal({ type: 'SET_PASSWORD', payload: e.target.value })}
        label="Password"

      />
      <button type="submit" disabled={state.loading} className={s.button}>
        {state.loading ? 'Загрузка...' : 'Войти'}
      </button>
      {state.error && <div className={s.error}>{`Ошибка входа`}</div>}
    </form>


  );
};