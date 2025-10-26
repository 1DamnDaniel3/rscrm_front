import { api } from "../../../shared";

export const sourceApi = {
    getAll: async () => api.get('/sources/getall'),
    createSource: (data) => api.post('/sources/create', data),
    updateSource: (id, data) => api.patch(`/sources/update/${id}`, data),
    deleteSource: (id) => api.delete(`/sources/delete/${id}`),
}