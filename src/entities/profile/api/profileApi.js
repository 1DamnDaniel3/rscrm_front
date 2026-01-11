import {api} from '../../../shared'

export const profileApi = {
    create: async (data) => api.post('/user_profiles/create', data),
    update: async (data, id) => api.patch(`/user_profiles/update/${id}`, data),
    getAllWhere: async (data) => api.post('/user_profiles/getallwhere', data),
    getById: async (id) => api.get(`/user_profiles/getone/${id}`),
    getAll: async (id) => api.get(`/user_profiles/getall/${id}`),
    delete: async (id) => api.delete(`/user_profiles/delete/${id}`),
}