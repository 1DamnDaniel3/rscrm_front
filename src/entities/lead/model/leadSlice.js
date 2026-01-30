import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { APIs } from "../../../shared";
import { act } from "react";

// --- THUNKS ---

// Лиды с фильтром
export const fetchLeads = createAsyncThunk(
    'leads/fetchLeads',
    async (data, { rejectWithValue }) => {
        try {
            const response = await APIs.lead.getAllLeadsWhere(data);
            return response.data;
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'server error';
            return rejectWithValue(serverMessage);
        }
    }
);

export const deleteLead = createAsyncThunk(
    'leads/deleteLead',
    async (id, { rejectWithValue }) => {
        try {
            const response = await APIs.lead.deleteLead(id);
            return response.data;
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'server error';
            return rejectWithValue(serverMessage);
        }
    }
);

export const updateLead = createAsyncThunk(
    'leads/updateLead',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await APIs.lead.updateLead(id, data);
            return response.data;
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'server error';
            return rejectWithValue(serverMessage);
        }
    }
);

export const addLead = createAsyncThunk(
    'leads/addLead',
    async (data, { rejectWithValue }) => {
        try {
            const response = await APIs.lead.addLeadWithGroup(data);
            return response.data;
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'server error';
            return rejectWithValue(serverMessage);
        }
    }
);

// ----================================ Filtered Leads ================================----

// Сгруппированные лиды
export const groupedLeads = createAsyncThunk(
    'leads/groupedLeads',
    async (data, {rejectWithValue}) =>{
        try{
            const responce = await APIs.lead.getGroupedLeads(data);
            return responce.data;
        } catch(error){
            const serverMessage = error.response?.data?.message || 'server error';
            return rejectWithValue(serverMessage);
        }
        
    }
)

// ------------------------------------------------------- SLICE -------------------------------------------

const initialState = {
    byId: {},
    allIds: [],
    loading: false,
    error: null,
};

const leadSlice = createSlice({
    name: "leads",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // ======== fetchLeads ========
            .addCase(fetchLeads.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLeads.fulfilled, (state, action) => {
                
                const leadsArray = action.payload?.data || [];

                const ById = {};
                const AllIds = [];

                leadsArray.forEach(lead => {
                    ById[lead.id] = lead
                    AllIds.push(lead.id)
                });

                AllIds.sort((a, b) => b - a);

                state.byId = ById;
                state.allIds = AllIds;

                state.loading = false;
            })
            .addCase(fetchLeads.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ======== deleteLead ========
            .addCase(deleteLead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteLead.fulfilled, (state, action) => {
                const deletedID = action.payload.id;
                if(!deletedID) return;

                delete state.byId[deletedID];
                if (state.allIds){
                    state.allIds = state.allIds.filter(id => id !== deletedID);
                }

                state.loading = false;
                state.error = null;
            })
            .addCase(deleteLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ======== updateLead ========
            .addCase(updateLead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateLead.fulfilled, (state, action) => {
                const { id, ...changes } = action.payload;

                if (state.byId[id]) {
                    state.byId[id] = {
                    ...state.byId[id],
                    ...changes
                    };
                }
                state.loading = false;
            })
            .addCase(updateLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ======== addLead ========
            .addCase(addLead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addLead.fulfilled, (state, action) => {
                const newLead = action.payload;
                state.byId[newLead.id] = newLead
                if (!state.allIds.includes(newLead.id)){
                    state.allIds.push(newLead.id)
                }
                state.allIds.sort((a, b) => b - a)  

                state.loading = false;
            })
            .addCase(addLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ---================== Filtered ==================---

            .addCase(groupedLeads.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(groupedLeads.fulfilled, (state, action) => {
                
                const leadsArray = action.payload?.data || [];

                const ById = {};
                const AllIds = [];

                leadsArray.forEach(lead => {
                    ById[lead.id] = lead
                    AllIds.push(lead.id)
                });

                AllIds.sort((a, b) => b - a);

                state.byId = ById;
                state.allIds = AllIds;

                state.loading = false;
            })
            .addCase(groupedLeads.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    }
});

export const selectLeads = createSelector(
    [
        (state) => state.leads.allIds,
        (state) => state.leads.byId,
    ],
    (ids, entities) => ids.map(id => entities[id])
);
export const selectLoadLeads = (state) => state.leads.loading;
export const selectErrorLeads = (state) => state.leads.error;

export default leadSlice.reducer;
