import {api} from '../../../shared'

export const userApi = {
    registerAdminSchool: async (data) => api.post('/users/registration/school', data),
    loginUser: async (data) => api.post('/users/login', data),
    logoutUser: async (data) => api.post('/users/logout', data),
    authCheck: async (data) => api.get('/auth/check', data),
    getAllSchoolUsers: async (data) => api.get('./users/getFromSchool', data),
}