import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { APIs } from "../../../shared";
import { studentClients } from "../../students";

// --- THUNKS ---

export const fetchClients = createAsyncThunk(
    'clients/fetchClients',
    async (_, { rejectWithValue }) => {
        try {
            const response = await APIs.client.getAllClients();
            return response.data;
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'Ошибка сервера';
            return rejectWithValue(serverMessage);
        }
    }
);

export const deleteClient = createAsyncThunk(
    'clients/deleteClient',
    async (id, { rejectWithValue }) => {
        try {
            const response = await APIs.client.deleteClient(id);
            return response.data
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'Ошибка сервера';
            return rejectWithValue(serverMessage);
        }
    }
);

export const updateClient = createAsyncThunk(
    'clients/updateClient',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await APIs.client.updateClient(id, data);
            return response.data;
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'Ошибка сервера';
            return rejectWithValue(serverMessage);
        }
    }
);

export const addClient = createAsyncThunk(
    'clients/addClient',
    async (data, { rejectWithValue }) => {
        try {
            const response = await APIs.client.addClient(data);
            return response.data;
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'Ошибка сервера';
            return rejectWithValue(serverMessage);
        }
    }
);



// ----================================ Filtered Leads ================================----

// Сгруппированные ученики
export const groupedClients = createAsyncThunk(
    'leads/groupedClients',
    async (data, {rejectWithValue}) =>{
        try{
            const responce = await APIs.client.getGrouped(data);
            return responce.data;
        } catch(error){
            const serverMessage = error.response?.data?.message || 'server error';
            return rejectWithValue(serverMessage);
        }
        
    }
)
// for async searching 
export const SearchClients = createAsyncThunk(
    'clients/SearchClients',
    async (name, { rejectWithValue }) => {
        try {
            const response = await APIs.client.search(name);
            return response.data;
        } catch (error) {
            const serverMessage = error.response?.data?.message || 'Ошибка сервера';
            return rejectWithValue(serverMessage);
        }
    }
);

// --------------------------- SLICE ---------------------------

const initialState = {
    byId: {},
    allIds: [],
    studentClientsIds: {},
    searchIds: [],
    loading: false,
    error: null,
};

const clientSlice = createSlice({
    name: "clients",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ======== fetchClients ========
            .addCase(fetchClients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchClients.fulfilled, (state, action) => {
                const clientsData = action.payload?.data || [];

                const ById = {};
                const AllIds = [];

                clientsData.forEach(client => {
                    ById[client.id] = client
                    AllIds.push(client.id)
                });

                AllIds.sort((a, b) => a - b)

                state.byId = ById;
                state.allIds = AllIds;

                state.loading = false;
                state.error = null;
            })
            .addCase(fetchClients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // ======== deleteClient ========
            .addCase(deleteClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteClient.fulfilled, (state, action) => {
                const deletedID = action.payload.id;
                if(!deletedID) return;

                delete state.byId[deletedID];
                if (state.allIds){
                    state.allIds = state.allIds.filter(id => id !== deletedID);
                }

                state.loading = false;
                state.error = null;
            })
            .addCase(deleteClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // ======== updateClient ========
            .addCase(updateClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateClient.fulfilled, (state, action) => {
                
                const {id, ...changes} = action.payload;

                if(state.byId[id]){
                    state.byId[id] = {
                        ...state.byId[id],
                        ...changes
                    };
                }                
                state.loading = false;
                state.error = null;
            })
            .addCase(updateClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // ======== addClient ========
            .addCase(addClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addClient.fulfilled, (state, action) => {

                const newClient = action.payload;
                state.byId[newClient.id] = newClient

                if (!state.allIds.includes(newClient.id)){
                    state.allIds.push(newClient.id)
                }
                state.allIds.sort((a, b) => b - a)  

                state.loading = false;
                state.error = null;
            })
            .addCase(addClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // ---================== Filtered ==================---
                        
            .addCase(groupedClients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(groupedClients.fulfilled, (state, action) => {
                
                const cliArray = action.payload?.data || [];
                const ById = {};
                 const AllIds = [];
                cliArray.forEach(client => {
                    ById[client.id] = client
                     AllIds.push(client.id)
                });
                  AllIds.sort((a, b) => b - a);
                  state.byId = ById;
                  state.allIds = AllIds;
                state.loading = false;
            })
            .addCase(groupedClients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Search Clients

            .addCase(SearchClients.pending, (state) => {
                 state.loading = true;
                 state.error = null;
            })
            .addCase(SearchClients.fulfilled, (state, action) => {
                
                const payload = action.payload?.data || [];

                payload.forEach(client => {
                    state.byId[client.id] = client
                });
                state.searchIds = payload.map(c => c.id)



                state.loading = false;
            })
            .addCase(SearchClients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    }
});

// Селекторы
export const selectClients = createSelector(
    [
        (state) => state.clients.allIds,
        (state) => state.clients.byId,
    ],
    (ids, entities) => ids.map(id => entities[id])
);
export const selectClientsById = (state) => state.clients.byId;
export const selectClientsLoading = (state) => state.clients.loading;
export const selectClientsError = (state) => state.clients.error;

export const selectClientsByStudent = createSelector(
    [
        (state) => state.clients.studentClientsIds,
        (state) => state.clients.byId,
        (_, studentId) => studentId
    ],
    (studentClientsIds, byId, studentId) => {
        const ids = studentClientsIds[studentId] || [];
        return ids.map(id => byId[id]);
    }
);
// Search

export const selectSearchClients = createSelector(
  (state) => state.clients.byId,
  (state) => state.clients.searchIds,
  (byId, searchIds) => searchIds.map(id => byId[id])
);

export default clientSlice.reducer;