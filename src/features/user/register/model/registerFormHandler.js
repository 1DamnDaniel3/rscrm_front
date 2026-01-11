export const handleLoginSubmit = async ({ state, dispatchLocal, registerUser }) => {
    dispatchLocal({ type: 'SET_LOADING' });
    try {
        const data = {
            school: state.school,
            account: state.account,
            profile: state.profile,
        }
        await registerUser(data);
        dispatchLocal({ type: 'CLEAR_FORM' });
    } catch {
    } finally {
        dispatchLocal({ type: 'STOP_LOADING' });
    }
};
