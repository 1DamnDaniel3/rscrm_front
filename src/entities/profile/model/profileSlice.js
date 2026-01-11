import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import reducer, { fetchUsers } from "../../user/model/userSlice"
import { APIs } from "../../../shared"


export const fetchProfiles = createAsyncThunk(
    "profiles/fetchProfiles",
    async (data, {rejectWithValue}) => {
        try{
            const response = await APIs.profile.getAllWhere(data)
            if(!response){
                throw new Error("Ошибка загрузки профилей")
            }
            const profilesByID = Object.fromEntries(response.data.map(s => [s.id, s]))
            return await profilesByID
        }catch(error){
            return rejectWithValue(error.message)
        }
    }
)

const initialState = {
    schoolProfiles: {},
    currentProfile: null,
    loading: false,
    error: null,
}

const profileSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers:{

    },
    extraReducers: builder => {
        builder
        
        // =========================== fetchUsers ========================

        .addCase(fetchProfiles.pending, state => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProfiles.fulfilled, (state, action) => {
            state.loading=false
            state.schoolProfiles = action.payload;
        })
        .addCase(fetchProfiles.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }) 
    }   
})

export const selectSchoolProfiles = (state) => state.profiles.schoolProfiles;
export const selectProfile = (state) => state.profiles.currentProfile;
export const selectProfilesLoading = (state) => state.profiles.loading;
export const selectProfilesError = (state) => state.profiles.error;

export default profileSlice.reducer;