import { api } from "../../../shared";

export const sourceApi = {
    getAll: async () => api.get('/sources'),
    createSource: (data) => api.post('/sources/registration', data),
    updateSource: (id, data) => api.put(`/sources/${id}`, data),
    deleteSource: (id) => api.delete(`/sources/${id}`),
}