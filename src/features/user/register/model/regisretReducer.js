export const initialState = {
    school: {
        name: "",
        city: "",
        phone: "",
        email: ""
    },
    account: {
        email: "",
        password: ""
    },
    profile: {
        full_name: "",
        phone: "",
        birthdate: ""
    },
    showPassword: false,
    loading: false,
    error: null,

}

export const registerReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SCHOOL_EMAIL':
            return { ...state, school: { ...state.school, email: action.payload } };
        case 'SET_USER_EMAIL':
            return { ...state, account: { ...state.account, email: action.payload } };
        case 'SET_SCHOOL_NAME':
            return { ...state, school: { ...state.school, name: action.payload } };
        case 'SET_USER_NAME':
            return { ...state, profile: { ...state.profile, full_name: action.payload } };
        case 'SET_SCHOOL_PHONE':
            return { ...state, school: { ...state.school, phone: action.payload } };
        case 'SET_USER_PHONE':
            return { ...state, profile: { ...state.profile, phone: action.payload } };
        case 'SET_CITY':
            return { ...state, school: { ...state.school, city: action.payload } };
        case 'SET_BIRTHDATE':
            return { ...state, profile: { ...state.profile, birthdate: action.payload } };
        case 'SET_PASSWORD':
            return { ...state, account: { ...state.account, password: action.payload } };
        case 'TOGGLE_PASSWORD':
            return { ...state, showPassword: !state.showPassword };
        case 'SET_LOADING':
            return { ...state, loading: true, error: null };
        case 'SET_ERROR':
            return { ...state, loading: false, error: action.payload };
        case 'CLEAR_FORM':
            return initialState;
        default:
            return state;
    }
};