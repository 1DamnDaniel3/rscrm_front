import { api } from '../../../shared/api/base'

export const clientApi = {
    addClient: async (data) => api.post('/clients/registration', data),
    // getAllClients: async () => api.get('/clients'),
    getAllClientsWhere: async (data) => api.post('/clients/getAllWhere', data),
    getClientById: async (id) => api.get(`/clients/${id}`),
    updateClient: async (id, data) => api.put(`/clients/${id}`, data),
    deleteClient: async (id) => api.delete(`/clients/${id}`),
    
    // Другие эндпоинты могут быть добавлены здесь
}