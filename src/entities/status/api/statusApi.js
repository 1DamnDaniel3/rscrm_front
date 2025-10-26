import { api } from '../../../shared';

export const statusApi = {
    getAllStatusesWhere: async (data) => api.post('/statuses/getallwhere', data),
    addStatus: async (data) => api.post('/statuses/create', data),
    getAllStatuses: async () => api.get('/statuses/getall'),
    getStatusById: async (id) => api.get(`/statuses/getone/${id}`),
    updateStatus: async (id, data) => api.patch(`/statuses/update/${id}`, data),
    deleteStatus: async (id) => api.delete(`/statuses/delete/${id}`),
};
