import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIs } from "../../../shared";

// --- THUNKS ---

export const fetchLeads = createAsyncThunk(
    'leads/fetchLeads',
    async (school_id, { rejectWithValue }) => {
        try {
            const response = await APIs.lead.getAllLeadsWhere({"school_id": school_id});
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
            const response = await APIs.lead.addSchoolLead(data);
            return response.data;
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'server error';
            return rejectWithValue(serverMessage);
        }
    }
);

// --- SLICE ---

const initialState = {
    leads: [],
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
                // Сортируем полученный массив по убыванию id
                const sortedPayload = action.payload.slice().sort((a, b) => {
                    const idA = typeof a.id === 'string' ? Number(a.id) : a.id;
                    const idB = typeof b.id === 'string' ? Number(b.id) : b.id;
                    return idB - idA; 
                });

                state.leads = sortedPayload.map(lead => ({
                    id: lead.id,
                    name: lead.name,
                    phone: lead.phone,
                    trial_date: lead.trial_date,
                    qualification: lead.qualification,
                    created_at: lead.created_at,
                    converted_to_client_at: lead.converted_to_client_at,
                    source_id: lead.Source?.id || '',
                    source_name: lead.Source?.name || '',
                    status_id: lead.Status?.id || '',
                    status_name: lead.Status?.name || '',
                    created_by: lead.UserAccount?.UserProfile?.full_name || '',
                    groups: lead.Groups || []
                }));

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
                let deletedId;
                if (action.payload && typeof action.payload === 'object' && 'id' in action.payload) {
                    deletedId = action.payload.id;
                } else {
                    deletedId = action.payload;
                }
                deletedId = typeof deletedId === 'string' ? Number(deletedId) : deletedId;
                state.leads = state.leads.filter(lead => lead.id !== deletedId);
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
                state.loading = false;
                state.error = null;

                const updated = action.payload;
                const updatedId = typeof updated.id === 'string'
                    ? Number(updated.id)
                    : updated.id;

                const idx = state.leads.findIndex(l => l.id === updatedId);
                if (idx < 0) {
                    state.leads.push({
                        id: updatedId,
                        name: updated.name,
                        phone: updated.phone,
                        trial_date: updated.trial_date,
                        qualification: updated.qualification,
                        created_at: updated.created_at,
                        converted_to_client_at: updated.converted_to_client_at,
                        source_id: updated.Source?.id ?? null,
                        source_name: updated.Source?.name || '',
                        status_id: updated.Status?.id ?? null,
                        status_name: updated.Status?.name || '',
                        created_by: updated.UserAccount?.UserProfile?.full_name || '',
                        groups: updated?.Groups || []
                    });
                } else {
                    const existing = state.leads[idx];

                    existing.name = updated.name;
                    existing.phone = updated.phone;
                    existing.trial_date = updated.trial_date;
                    existing.qualification = updated.qualification;
                    existing.created_at = updated.created_at;
                    existing.converted_to_client_at = updated.converted_to_client_at;

                    const newSourceId = updated.Source?.id != null
                        ? (typeof updated.Source.id === 'string' ? Number(updated.Source.id) : updated.Source.id)
                        : null;
                    if (newSourceId !== null && newSourceId !== existing.source_id) {
                        existing.source_id = newSourceId;
                        existing.source_name = updated.Source?.name ?? existing.source_name;
                    }

                    const newStatusId = updated.Status?.id != null
                        ? (typeof updated.Status.id === 'string' ? Number(updated.Status.id) : updated.Status.id)
                        : null;
                    if (newStatusId !== null && newStatusId !== existing.status_id) {
                        existing.status_id = newStatusId;
                        existing.status_name = updated.Status?.name ?? existing.status_name;
                    }

                    const newCreator = updated.UserAccount?.UserProfile?.full_name;
                    if (newCreator) {
                        existing.created_by = newCreator;
                    }
                }
            })
            .addCase(updateLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                alert(action.payload);
            })

            // ======== addLead ========
            .addCase(addLead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addLead.fulfilled, (state, action) => {
                // Сбрасываем флаг загрузки
                state.loading = false;
                state.error = null;

                const lead = action.payload;
                const newId = typeof lead.id === 'string' ? Number(lead.id) : lead.id;

                // Добавляем новый лид, а затем сортируем весь список по убыванию id
                state.leads.push({
                    id: newId,
                    name: lead.name,
                    phone: lead.phone,
                    trial_date: lead.trial_date,
                    qualification: lead.qualification,
                    created_at: lead.created_at,
                    converted_to_client_at: lead.converted_to_client_at,
                    source_id: lead.Source?.id ?? null,
                    source_name: lead.Source?.name ?? '',
                    status_id: lead.Status?.id ?? null,
                    status_name: lead.Status?.name ?? '',
                    created_by: lead.UserAccount?.UserProfile?.full_name ?? '',
                    groups: lead.Groups || []
                });

                // Сортируем по убыванию id (новые наверху)
                state.leads.sort((a, b) => {
                    const idA = typeof a.id === 'string' ? Number(a.id) : a.id;
                    const idB = typeof b.id === 'string' ? Number(b.id) : b.id;
                    return idB - idA;
                });
            })
            .addCase(addLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                alert(action.payload);
            });
    }
});


export const selectLeads = (state) => state.leads.leads;
export const selectLoadLeads = (state) => state.leads.loading;
export const selectErrorLeads = (state) => state.leads.error;

export default leadSlice.reducer;
