import { api } from '../../../shared'

// many-to-many relation students-clients 
export const studentClientsApi = {
    getAllWhere: async (data) => api.post('/student-clients/getallwhere', data),
    getAll: async () => api.get('/student-clients/getall'),
    create: async (data) => api.post('/student-clients/create', data),
    getOne: async (id) => api.get(`/student-clients/getone/${id}`),
    update: async (id, data) => api.patch(`/student-clients/update/${id}`, data),
    delete: async (id) => api.delete(`/student-clients/delete/${id}`),

    // endpoint for creating relation and get business-object Stu_Cli
    createRelation: async(data) => api.post('/student-clients/createandgetBO', data)
}