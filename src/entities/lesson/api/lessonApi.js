import { api } from '../../../shared'

export const lessonsApi = {
    addLesson: async(data) => api.post('/lessons/registration', data),
    generateLessons: async(data) => api.post('/lessons/generate', data),
    // getAllLessons: async() => api.get('/lessons'),
    getFilteredLessons: async(data) => api.post('/lessons/getAllWhere', data),
    getLessonById: async(id) => api.get(`/lessons/${id}`),
    updateLesson: async(id, data) => api.put(`/lessons/${id}`, data),    
    deleteLesson: async(id) => api.delete(`/lessons/${id}`),
}