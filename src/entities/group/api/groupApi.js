import { api } from "../../../shared";

export const groupApi = {
    addGroup: async (data) => api.post('/groups/create', data),
    getAllGroupsWhere: async (data) => api.post('/groups/getallwhere', data),
    getAllGroups: async () => api.get('/groups/getall'),
    getGroupById: async (id) => api.get(`/groups/getone/${id}`),
    updateGroup: async (id, data) => api.patch(`/groups/update/${id}`, data),
    deleteGroup: async (id) => api.delete(`/groups/delete/${id}`),
};