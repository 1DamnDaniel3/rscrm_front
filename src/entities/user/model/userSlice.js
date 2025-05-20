import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { APIs } from "../../../shared";

// ПОЛУЧИТЬ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ ШКОЛЫ
// export const fetchUsers = createAsyncThunk(
//     "users/fetchUsers",
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await APIs.user.getAllSchoolUsers(data)
//             if (!response) {
//                 throw new Error("Ошибка закрузки пользователей");
//             }
//             return await response.json();
//         } catch (error) {
//             return rejectWithValue(error.message)
//         }
//     }
// );

export const registerAdminSchool = createAsyncThunk(
    "users/registerAdminSchool",
    async (data, { rejectWithValue }) => {
        try {
            const response = await APIs.user.registerAdminSchool(data);
            if (!response) {
                throw new Error("Ошибка закрузки пользователей");
            }
            return await response.json();

        } catch (error) {
            return rejectWithValue(error.message)

        }
    }
)

// export const loginUser = createAsyncThunk(
//     "users/registerAdminSchool",
//     async (data, { rejectWithValue }) => {
//         try {
//             const response = await APIs.user.registerAdminSchool(data);
//             if (!response) {
//                 throw new Error("Ошибка закрузки пользователей");
//             }
//             return await response.json();

//         } catch (error) {
//             return rejectWithValue(error.message)

//         }
//     }
// )


const initialState = {
    schoolUsers: [],
    currentUser: null,
    loading: false,
    error: null,
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setCurrentUser(state, acion) {
            state.currentUser = acion.payload;
        }
    },
    extraReducers: builder => {
        builder
            // =================================== FETCH SCHOOL USERS
            // .addCase(fetchUsers.pending, state => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase(fetchUsers.fulfilled, (state, acion) => {
            //     state.users = acion.payload;
            //     state.loading = false;
            // })
            // .addCase(fetchUsers.rejected, (state, action) => {
            //     state.error = action.payload;
            //     state.loading = false;
            // })

            //  =================================== REGISTER ADMIN + SCHOOL

            .addCase(registerAdminSchool.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerAdminSchool.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registerAdminSchool.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }

})
export const selectSchoolUsers = (state) => state.users.schoolUsers;
export const selectUser = (state) => state.users.currentUser;
export const selectUsersLoading = (state) => state.users.loading;
export const selectUsersError = (state) => state.users.error;

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;