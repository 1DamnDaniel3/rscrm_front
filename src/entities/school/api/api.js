import { api } from "../../../shared";


export const schoolsApi = {
    loadAllSchools: async (data) => api.get('/schools'),
    getOne: async (id) => api.get(`/schools/${id}`),
    deleteSchool: async(id) => api.delete(`/schools/${id}`),
    updateSchool: async(data, id) => api.post(`/schools/${id}`, data)
}