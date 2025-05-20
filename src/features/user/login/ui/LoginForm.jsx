import { useReducer } from "react";
import { loginReducer, initialState } from "../model/loginReducer";
import { handleLoginSubmit } from "../model/loginFormHandlers";
import { useAuth } from "../../../../app/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from '../../../../shared'

import s from './LoginForm.module.css';


export const LoginForm = () => {
  const [state, dispatchLocal] = useReducer(loginReducer, initialState);
  const { userLogin } = useAuth()
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmit({ state, dispatchLocal, userLogin });
    navigate('/')
  };

  return (

      <form onSubmit={onSubmit} className={s.form}>

        <Input
          type="email"
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
        {state.error && <div className={s.error}>{state.error}</div>}
      </form>


  );
};