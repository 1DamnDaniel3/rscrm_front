export const handleLoginSubmit = async ({ state, dispatchLocal, userLogin }) => {
  dispatchLocal({ type: 'SET_LOADING' });
  try {
    await userLogin({ email: state.email, password: state.password });
    dispatchLocal({ type: 'CLEAR_FORM' });
  } catch {
  } finally {
    dispatchLocal({ type: 'STOP_LOADING' });
  }
};
