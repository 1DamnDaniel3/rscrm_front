import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { APIs } from '../../../shared';

// ====== async thunks ======

export const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async ({ school_id, entity_type }, { rejectWithValue }) => {
    try {
      const response = await APIs.group.getAllGroupsWhere({ school_id, entity_type });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Server error';
      return rejectWithValue(message);
    }
  }
);

export const deleteGroup = createAsyncThunk(
  'groups/deleteGroup',
  async (group_id, { rejectWithValue }) => {
    try {
      const response = await APIs.group.deleteGroup(group_id);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Server error';
      return rejectWithValue(message);
    }
  }
);

export const updateGroup = createAsyncThunk(
  'groups/updateGroup',
  async ({ group_id, data }, { rejectWithValue }) => {
    try {
      const response = await APIs.group.updateGroup(group_id, data);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Server error';
      return rejectWithValue(message);
    }
  }
);

export const addGroup = createAsyncThunk(
  'groups/addGroup',
  async (data, { rejectWithValue }) => {
    try {
      const response = await APIs.group.addGroup(data);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Server error';
      return rejectWithValue(message);
    }
  }
);

// ====== initial state ======

const initialState = {
  groups: [],
  selectedGroupId: null,
  loading: false,
  error: null,
};

// ====== slice ======

const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setSelectedGroupId(state, action) {
      state.selectedGroupId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder

      // === fetch groups ===
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        const sortedGroups = [...action.payload].sort((a, b) => a.id - b.id);
        state.groups = sortedGroups;
        state.loading = false;

        if (sortedGroups.length > 0) {
          state.selectedGroupId = sortedGroups[0].id;
        } else {
          state.selectedGroupId = null;
        }
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // === delete group ===
      .addCase(deleteGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        const deletedId = typeof action.payload.id === 'string' ? Number(action.payload.id) : action.payload.id;
        state.groups = state.groups
          .filter(group => group.id !== deletedId)
          .sort((a, b) => a.id - b.id);
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // === update group ===
      .addCase(updateGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        state.groups = state.groups
          .map((g) =>
            g.id === action.payload.id ? { ...g, ...action.payload } : g
          )
          .sort((a, b) => a.id - b.id);
        state.loading = false;
      })
      .addCase(updateGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // === add group ===
      .addCase(addGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addGroup.fulfilled, (state, action) => {
        const newGroup = action.payload;
        state.groups = [...state.groups, newGroup].sort((a, b) => a.id - b.id);
        state.selectedGroupId = newGroup.id;
        state.loading = false;
      })
      .addCase(addGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

// ====== selectors ======
export const { setSelectedGroupId } = groupSlice.actions;
export const selectSelectedGroupId = (state) => state.groups.selectedGroupId;
export const selectGroups = (state) => state.groups.groups;
export const selectGroupsLoading = (state) => state.groups.loading;
export const selectGroupsError = (state) => state.groups.error;

export default groupSlice.reducer;
