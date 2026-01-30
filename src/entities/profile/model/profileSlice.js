import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
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
            return response.data
        }catch(error){
            return rejectWithValue(error.message)
        }
    }
)

const initialState = {
    profilesById: {},
    profilesAllIds: [],
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
        
        // =========================== fetchProfiles ========================

        .addCase(fetchProfiles.pending, state => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProfiles.fulfilled, (state, action) => {
            const payload = action.payload.data;


            const byId = {};
            const allIds = [];

            payload.forEach(profile => {
                    byId[profile.id] = profile
                    allIds.push(profile.id)
                });

            state.profilesById = byId;
            state.profilesAllIds = allIds

            state.loading=false
        })
        .addCase(fetchProfiles.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }) 
    }   
})

export const selectSchoolProfiles = createSelector(
    [
        (state) => state.profiles.profilesAllIds,
        (state) => state.profiles.profilesById,
    ],
    (ids, entities) => ids.map(id => entities[id])
);
export const selectProfilesById = (state) => state.profiles.profilesById;
export const selectProfile = (state) => state.profiles.currentProfile;
export const selectProfilesLoading = (state) => state.profiles.loading;
export const selectProfilesError = (state) => state.profiles.error;

export default profileSlice.reducer;