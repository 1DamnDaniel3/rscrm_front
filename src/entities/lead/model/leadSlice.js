import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIs } from "../../../shared";

export const fetchLeads = createAsyncThunk(
    'leads/fetchLeads',
    async (school_id, { rejectWithValue }) => {
        try {
            const response = await APIs.lead.getSchoolLeads(school_id);

            return response.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'server error'
            return rejectWithValue(serverMessage)
        }
    }
)

export const deleteLead = createAsyncThunk(
    'leads/deleteLead',
    async (lead_id, { rejectWithValue }) => {
        try {
            const response = await APIs.lead.deleteLead(lead_id);

            return response.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'server error'
            return rejectWithValue(serverMessage)
        }
    }
)

export const updateLead = createAsyncThunk(
    'leads/updateLead',
    async ({ lead_id, data }, { rejectWithValue }) => {
        try {
            const response = await APIs.lead.updateLead(lead_id, data);

            return response.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'server error'
            return rejectWithValue(serverMessage)
        }
    }
)

const initialState = {
    leads: [],
    loading: false,
    error: null,

}

const leadSlice = createSlice({
    name: "leads",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // ===========================================fetch
            .addCase(fetchLeads.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLeads.fulfilled, (state, action) => {
                state.leads = action.payload.map(lead => ({
                    id: lead.id,
                    name: lead.name,
                    phone: lead.phone,
                    trial_date: lead.trial_date,
                    qualification: lead.qualification,
                    created_at: lead.created_at,
                    converted_to_client_at: lead.converted_to_client_at,
                    source_name: lead.Source?.name || '',
                    status_name: lead.Status?.name || '',
                    created_by: lead.UserAccount?.UserProfile?.full_name || '',
                }));
                state.loading = false;
            })
            .addCase(fetchLeads.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // =========================================== delete

            .addCase(deleteLead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteLead.fulfilled, (state, action) => {
                const deletedId = typeof action.payload.id === 'string' ? Number(action.payload.id) : action.payload.id;
                state.leads = state.leads.filter(lead => lead.id !== deletedId);
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // =========================================== delete

            .addCase(updateLead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateLead.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.leads = state.leads.filter(lead => lead.id !== action.payload.id);
            })
            .addCase(updateLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
})

export const selectLeads = (state) => state.leads.leads;
export const selectLoadLeads = (state) => state.leads.loading;
export const selectErrorLeads = (state) => state.leads.error;

export default leadSlice.reducer; 