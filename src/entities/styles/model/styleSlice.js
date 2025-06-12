import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIs } from "../../../shared";

// --- THUNKS ---
export const fetchStyles = createAsyncThunk(
  'styles/fetchStyles',
  async (school_id, { rejectWithValue }) => {
    try {
      const response = await APIs.style.getAllStylesWhere({ school_id });
      return response.data;
    } catch (error) {
      const serverMessage = error.response?.data?.message || 'Ошибка сервера';
      return rejectWithValue(serverMessage);
    }
  }
);

export const addStyle = createAsyncThunk(
  'styles/addStyle',
  async (data, { rejectWithValue }) => {
    try {
      const response = await APIs.style.addStyle(data);
      return response.data;
    } catch (error) {
      const serverMessage = error.response?.data?.message || 'Ошибка сервера';
      return rejectWithValue(serverMessage);
    }
  }
);

export const updateStyle = createAsyncThunk(
  'styles/updateStyle',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await APIs.style.updateStyle(id, data);
      return response.data;
    } catch (error) {
      const serverMessage = error.response?.data?.message || 'Ошибка сервера';
      return rejectWithValue(serverMessage);
    }
  }
);

export const deleteStyle = createAsyncThunk(
  'styles/deleteStyle',
  async (id, { rejectWithValue }) => {
    try {
      const response = await APIs.style.deleteStyle(id);
      return response.data;
    } catch (error) {
      const serverMessage = error.response?.data?.message || 'Ошибка сервера';
      return rejectWithValue(serverMessage);
    }
  }
);

export const getStyleById = createAsyncThunk(
  'styles/getStyleById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await APIs.style.getStyleById(id);
      return response.data;
    } catch (error) {
      const serverMessage = error.response?.data?.message || 'Ошибка сервера';
      return rejectWithValue(serverMessage);
    }
  }
);

// --- SLICE ---
const initialState = {
  styles: [],
  currentStyle: null,
  loading: false,
  error: null,
};

const styleSlice = createSlice({
  name: "styles",
  initialState,
  reducers: {
    chooseStyle: (state, { payload }) => {
      state.currentStyle = payload;
    },
    clearCurrentStyle: state => {
      state.currentStyle = null;
    },
    archiveStyle: (state, { payload }) => {
      const style = state.styles.find(s => s.id === payload);
      if (style) {
        style.is_archived = true;
      }
    },
    restoreStyle: (state, { payload }) => {
      const style = state.styles.find(s => s.id === payload);
      if (style) {
        style.is_archived = false;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // ======== fetchStyles ========
      .addCase(fetchStyles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStyles.fulfilled, (state, action) => {
        state.styles = action.payload.map(style => ({
          id: style.id,
          name: style.name,
          active_from: style.active_from,
          active_to: style.active_to,
          is_archived: style.is_archived,
          school_id: style.school_id
        }));
        state.loading = false;
      })
      .addCase(fetchStyles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======== addStyle ========
      .addCase(addStyle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStyle.fulfilled, (state, action) => {
        const newStyle = action.payload;
        state.styles.push({
          id: newStyle.id,
          name: newStyle.name,
          active_from: newStyle.active_from,
          active_to: newStyle.active_to,
          is_archived: newStyle.is_archived,
          school_id: newStyle.school_id
        });
        state.loading = false;
      })
      .addCase(addStyle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======== updateStyle ========
      .addCase(updateStyle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStyle.fulfilled, (state, action) => {
        const updatedStyle = action.payload;
        const index = state.styles.findIndex(s => s.id === updatedStyle.id);

        if (index !== -1) {
          state.styles[index] = {
            id: updatedStyle.id,
            name: updatedStyle.name,
            active_from: updatedStyle.active_from,
            active_to: updatedStyle.active_to,
            is_archived: updatedStyle.is_archived,
            school_id: updatedStyle.school_id
          };
        }
        state.loading = false;
      })
      .addCase(updateStyle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======== deleteStyle ========
      .addCase(deleteStyle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStyle.fulfilled, (state, action) => {
        const deletedId = action.payload.id;
        state.styles = state.styles.filter(s => s.id !== deletedId);
        state.loading = false;
      })
      .addCase(deleteStyle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======== getStyleById ========
      .addCase(getStyleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStyleById.fulfilled, (state, action) => {
        const style = action.payload;
        state.currentStyle = {
          id: style.id,
          name: style.name,
          active_from: style.active_from,
          active_to: style.active_to,
          is_archived: style.is_archived,
          school_id: style.school_id
        };
        state.loading = false;
      })
      .addCase(getStyleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  chooseStyle,
  clearCurrentStyle,
  archiveStyle,
  restoreStyle
} = styleSlice.actions;

// Селекторы
export const selectStyles = (state) => state.style.styles;
export const selectStylesLoading = (state) => state.style.loading;
export const selectStylesError = (state) => state.style.error;
export const selectCurrentStyle = (state) => state.style.currentStyle;

export default styleSlice.reducer;