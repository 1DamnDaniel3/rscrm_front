import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { APIs } from '../../../shared';

// ====== async thunks ======

export const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async ({ school_id, entity_type }, { rejectWithValue }) => {
    try {
      const response = await APIs.group.getAllGroupsWhere({ school_id, entity_type });
      return response.data
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
      return response.data
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
      return {...response.data, id: Number(response.data.id)}; // приведение id к int
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
  groups: {},
  allIds: [],
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
        const groupsArray = action.payload?.data || [];

        const groupsById = {};
        const AllIds = [];

        groupsArray.forEach(group => {
          groupsById[group.id] = group;
          AllIds.push(group.id)
        });

        AllIds.sort((a, b) => a - b);

        state.groups = groupsById;
        state.allIds = AllIds;
        state.loading = false;

        state.selectedGroupId = AllIds.length > 0 ? AllIds[0] : null
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
        const deletedID = action.payload.id;
        if (!deletedID) return;
        
        // clear the states
        delete state.groups[deletedID];
        state.allIds = state.allIds.filter(id => id !== deletedID);
      
        if (state.selectedGroupId === deletedID){
          state.selectedGroupId = state.allIds.length > 0? state.allIds[0] : null
        }

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
        const id = action.payload.id;
        if (state.groups[id]){
          state.groups[id] = {...state.groups[id], ...action.payload};
        }
        state.loading = false
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

        state.groups[newGroup.id] = newGroup; // add to groups
          if (!state.allIds.includes(newGroup.id)) { // add to Ids
            state.allIds.push(newGroup.id);
          }
        state.selectedGroupId = newGroup.id; // select newGroup

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

export const selectGroups = createSelector(
    [
    (state) => state.groups.allIds ?? [],
    (state) => state.groups.groups ?? {},
  ],
  (allIds, groups) => allIds.map(id => groups[id])
);

export const selectGroupsLoading = (state) => state.groups.loading;
export const selectGroupsError = (state) => state.groups.error;

export default groupSlice.reducer;