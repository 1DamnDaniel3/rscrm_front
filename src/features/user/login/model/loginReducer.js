export const initialState = {
  email: '',
  password: '',
  showPassword: false,
  loading: false,
  error: null,
};

export const loginReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'TOGGLE_PASSWORD':
      return { ...state, showPassword: !state.showPassword };
    case 'SET_LOADING':
      return { ...state, loading: true, error: null };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'CLEAR_FORM':
      return { ...state, password: '', loading: false, error: null};
    default:
      return state;
  }
};
