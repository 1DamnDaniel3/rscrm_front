import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIs } from "../../../shared";

// ======================= Thunks =======================

export const fetchStatuses = createAsyncThunk(
    'statuses/fetchStatuses',
    async (school_id, { rejectWithValue }) => {
        try {
            const response = await APIs.status.getSchoolStatuses({ school_id });
            return response.data;
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'server error';
            return rejectWithValue(serverMessage);
        }
    }
);

export const addStatus = createAsyncThunk(
    'statuses/addStatus',
    async (data, { rejectWithValue }) => {
        try {
            const response = await APIs.status.addStatus(data);
            return response.data;
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'server error';
            return rejectWithValue(serverMessage);
        }
    }
);

export const updateStatus = createAsyncThunk(
    'statuses/updateStatus',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await APIs.status.updateStatus(id, data);
            return response.data;
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'server error';
            return rejectWithValue(serverMessage);
        }
    }
);

export const deleteStatus = createAsyncThunk(
    'statuses/deleteStatus',
    async (id, { rejectWithValue }) => {
        try {
            const response = await APIs.status.deleteStatus(id);
            return response.data;
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'server error';
            return rejectWithValue(serverMessage);
        }
    }
);

// ======================= Slice =======================

const initialState = {
    statuses: [],
    loading: false,
    error: null,
};

const statusSlice = createSlice({
    name: "statuses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchStatuses
            .addCase(fetchStatuses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStatuses.fulfilled, (state, action) => {
                state.statuses = action.payload;
                state.loading = false;
            })
            .addCase(fetchStatuses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // addStatus
            .addCase(addStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.statuses.push(action.payload);
            })
            .addCase(addStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // updateStatus
            .addCase(updateStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateStatus.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.statuses.findIndex(s => s.id === action.payload.id);
                if (index !== -1) {
                    state.statuses[index] = action.payload;
                }
            })
            .addCase(updateStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // deleteStatus
            .addCase(deleteStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.statuses = state.statuses.filter(s => s.id !== action.payload.id);
            })
            .addCase(deleteStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

// ======================= Selectors =======================

export const selectStatuses = (state) => state.statuses.statuses;
export const selectLoadStatuses = (state) => state.statuses.loading;
export const selectErrorStatuses = (state) => state.statuses.error;

export default statusSlice.reducer;
