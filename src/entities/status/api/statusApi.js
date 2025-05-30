import { api } from '../../../shared';

export const statusApi = {
    getSchoolStatuses: async (data) => api.post('/statuses/getAllWhere', data),
    addStatus: async (data) => api.post('/statuses/registration', data),
    getAllStatuses: async () => api.get('/statuses'),
    getStatusById: async (id) => api.get(`/statuses/${id}`),
    updateStatus: async (id, data) => api.put(`/statuses/${id}`, data),
    deleteStatus: async (id) => api.delete(`/statuses/${id}`),
};
