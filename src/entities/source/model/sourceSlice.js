import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIs } from "../../../shared";

// Получение всех источников по school_id
export const fetchSources = createAsyncThunk(
    'sources/fetchSources',
    async (_, { rejectWithValue }) => {
        try {
            const response = await APIs.source.getAll();
            return response.data;
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'server error';
            return rejectWithValue(serverMessage);
        }
    }
);

// Создание источника
export const createSource = createAsyncThunk(
    'sources/createSource',
    async (data, { rejectWithValue }) => {
        try {
            const response = await APIs.source.createSource(data);
            return response.data;
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'server error';
            return rejectWithValue(serverMessage);
        }
    }
);

// Обновление источника
export const updateSource = createAsyncThunk(
    'sources/updateSource',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await APIs.source.updateSource(id, data);
            return response.data;
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'server error';
            return rejectWithValue(serverMessage);
        }
    }
);

// Удаление источника
export const deleteSource = createAsyncThunk(
    'sources/deleteSource',
    async (id, { rejectWithValue }) => {
        try {
            const response = await APIs.source.deleteSource(id);
            return response.data;
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'server error';
            return rejectWithValue(serverMessage);
        }
    }
);

const initialState = {
    sources: [],
    loading: false,
    error: null
};

const sourceSlice = createSlice({
    name: 'sources',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchSources
            .addCase(fetchSources.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSources.fulfilled, (state, action) => {
                state.sources = action.payload;
                state.loading = false;
            })
            .addCase(fetchSources.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // createSource
            .addCase(createSource.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSource.fulfilled, (state, action) => {
                state.sources.push(action.payload);
                state.loading = false;
            })
            .addCase(createSource.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // updateSource
            .addCase(updateSource.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSource.fulfilled, (state, action) => {
                const index = state.sources.findIndex(src => src.id === action.payload.id);
                if (index !== -1) {
                    state.sources[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateSource.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // deleteSource
            .addCase(deleteSource.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteSource.fulfilled, (state, action) => {
                state.sources = state.sources.filter(src => src.id !== action.payload.id);
                state.loading = false;
            })
            .addCase(deleteSource.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const selectSources = (state) => state.sources.sources;
export const selectSourcesLoading = (state) => state.sources.loading;
export const selectSourcesError = (state) => state.sources.error;

export default sourceSlice.reducer;
