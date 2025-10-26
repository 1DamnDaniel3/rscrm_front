import { api } from '../../../shared'

export const lessonsApi = {
    addLesson: async(data) => api.post('/lessons/create', data),
    generateLessons: async(data) => api.post('/lessons/generate', data),
    // getAllLessons: async() => api.get('/lessons'),
    getFilteredLessons: async(data) => api.post('/lessons/getallwhere', data),
    getLessonById: async(id) => api.get(`/lessons/getone/${id}`),
    updateLesson: async(id, data) => api.patch(`/lessons/update/${id}`, data),    
    deleteLesson: async(id) => api.delete(`/lessons/delete/${id}`),
}