import { api } from '../../../shared'

export const studentApi = {
    // getAllStudents: async () => api.get('/students'),
    getStudentsWhere: async (data) => api.post('/students/getAllStudInfo', data),
    addStudent: async (data) => api.post('/students/registration', data),
    getStudentById: async (id) => api.get(`/students/${id}`),
    updateStudent: async (id, data) => api.put(`/students/${id}`, data),
    deleteStudent: async (id) => api.delete(`/students/${id}`),
}
