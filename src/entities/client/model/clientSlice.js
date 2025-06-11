import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIs } from "../../../shared";

// --- THUNKS ---

export const fetchClients = createAsyncThunk(
    'clients/fetchClients',
    async (school_id, { rejectWithValue }) => {
        try {
            // Используем getAllClientsWhere с фильтром по school_id
            const response = await APIs.client.getAllClientsWhere({ school_id });
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
            await APIs.client.deleteClient(id);
            return { id }; // Возвращаем ID удаленного клиента
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

// --- SLICE ---

const initialState = {
    clients: [],
    loading: false,
    error: null,
};

// Функция для преобразования данных клиента
const transformClient = (client) => ({
    id: client.id,
    name: client.name,
    phone: client.phone,
    birthdate: client.birthdate,
    age: client.birthdate,
    contact: client.contact,
    created_at: client.created_at,
    school_id: client.school_id,
    groups: client.Groups || client.groups || []
});

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
                state.loading = false;
                state.error = null;
                
                // Преобразуем и сортируем клиентов (новые сверху)
                state.clients = action.payload
                    .map(transformClient)
                    .sort((a, b) => b.id - a.id);
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
                state.loading = false;
                state.error = null;
                state.clients = state.clients.filter(
                    client => client.id !== action.payload.id
                );
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
                state.loading = false;
                state.error = null;
                
                const updated = action.payload;
                const existingClient = state.clients.find(c => c.id === updated.id);
                
                if (!existingClient) {
                    state.clients.push(transformClient(updated));
                } else {
                    // Обновляем существующего клиента, сохраняя группы
                    const updatedClient = transformClient({
                        ...updated,
                        Groups: updated.Groups || existingClient.groups
                    });
                    
                    state.clients = state.clients.map(client => 
                        client.id === updated.id ? updatedClient : client
                    );
                }
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
                state.loading = false;
                state.error = null;
                
                // Добавляем нового клиента в начало списка
                const newClient = transformClient(action.payload);
                state.clients = [newClient, ...state.clients];
            })
            .addCase(addClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

// Селекторы
export const selectClients = (state) => state.clients.clients;
export const selectClientsLoading = (state) => state.clients.loading;
export const selectClientsError = (state) => state.clients.error;

export default clientSlice.reducer;