import { api } from "../../../shared";


export const schoolsApi = {
    loadAllSchools: async (data) => api.get('/schools/getall'),
    getOne: async (id) => api.get(`/schools/getoneschool/${id}`),
    deleteSchool: async(id) => api.delete(`/schools/delete/${id}`),
    updateSchool: async(data, id) => api.patch(`/schools/update/${id}`, data)
}