import { api } from '../../../shared'

export const studentApi = {
    getAllWhere: async (data) => api.post('/students/getallwhere', data),
    getAllStudents: async () => api.get('/students/getall'),
    addStudentWithGroup: async(data) => api.post('/students/createandgroup', data),

    getGrouped: async (data) => api.post('/students/groupedstudents', data),
    createStudent: async (data) => api.post('/students/create', data),
    getOne: async (id) => api.get(`/students/getone/${id}`),
    updateStudent: async (id, data) => api.patch(`/students/update/${id}`, data),
    deleteStudent: async (id) => api.delete(`/students/delete/${id}`),
}
