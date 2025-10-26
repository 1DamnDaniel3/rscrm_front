import { api } from '../../../shared/api/base'

export const clientApi = {
    addClient: async (data) => api.post('/clients/create', data),
    // getAllClients: async () => api.get('/clients'),
    getAllClientsWhere: async (data) => api.post('/clients/getallwhere', data),
    getClientById: async (id) => api.get(`/clients/getone/${id}`),
    updateClient: async (id, data) => api.patch(`/clients/update/${id}`, data),
    deleteClient: async (id) => api.delete(`/clients/delete/${id}`),
    
    // Другие эндпоинты могут быть добавлены здесь
}