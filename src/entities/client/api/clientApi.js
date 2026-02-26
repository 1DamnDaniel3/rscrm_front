import { api } from '../../../shared/api/base'

export const clientApi = {
    addClient: async (data) => api.post('/clients/create', data),
    getAllClients: async () => api.get('/clients/getall'),
    getAllClientsWhere: async (data) => api.post('/clients/getallwhere', data),
    getClientById: async (id) => api.get(`/clients/getone/${id}`),
    updateClient: async (id, data) => api.patch(`/clients/update/${id}`, data),
    deleteClient: async (id) => api.delete(`/clients/delete/${id}`),

    createAndGroup: async (data) => api.post('/clients/createandgroup', data),
    getGrouped: async (data) => api.post('/clients/groupedclients', data),
    search: async (data) => api.get(`/clients/search?q=${data}` ),

    
    // Другие эндпоинты могут быть добавлены здесь
}