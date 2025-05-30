import { api } from "../../../shared";

export const groupApi = {
    addGroup: async (data) => api.post('/groups/registration', data),
    getAllGroupsWhere: async (data) => api.post('/groups/getAllWhere', data),
    getAllGroups: async () => api.get('/groups'),
    getGroupById: async (id) => api.get(`/groups/${id}`),
    updateGroup: async (id, data) => api.put(`/groups/${id}`, data),
    deleteGroup: async (id) => api.delete(`/groups/${id}`),
};