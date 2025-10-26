import { login } from "../../auth/authSlice";

export const handleLoginSubmit = async ({ state, dispatchLocal, dispatch, navigate }) => {
  dispatchLocal({ type: 'SET_LOADING' });
  try {
    await dispatch(login({ email: state.email, password: state.password })).unwrap();
    dispatchLocal({ type: 'CLEAR_FORM' });
    navigate('/profile')
  } catch (error) {
    const message = error?.message || error || 'Неизвестная ошибка';
    dispatchLocal({ type: 'SET_ERROR', payload: error });
    throw message;
  } finally {
    dispatchLocal({ type: 'STOP_LOADING' });
  }
};
