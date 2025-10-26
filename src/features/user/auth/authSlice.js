import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIs } from "../../../shared";
import { setCurrentUser } from "../../../entities";

// Ожидает всю информацию о профиле пользователя в ответ на логин.
// Либо должен делать их сам.
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await APIs.user.loginUser({ email, password });

      const accountData = response.data.user;
      
      const profile = await APIs.user.setUserProfile(accountData.id)
      const fullUser = {...accountData, profile: profile.data}

      dispatch(setCurrentUser(fullUser));


      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await APIs.user.logoutUser();
      const data = await response.json();
      if (!response) throw new Error(data.message || 'Ошибка выхода');

      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)
// Ходит на сервер и проверяет валиден ли токен, приносит user'а и заполняет redux.
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await APIs.user.authCheck();
      if (!response) throw new Error(response.message || 'Ошибка');

      dispatch(setCurrentUser(response.data.user)); // вот тут мы восстанавливаем пользователя
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.isAuth = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================================= LOGOUT

      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
        state.loading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================================= CHECK AUTH
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.isAuth = true;
        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuth = false;
      });
  },
});

export const selectIsAuth = (state) => state.auth.isAuth;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
