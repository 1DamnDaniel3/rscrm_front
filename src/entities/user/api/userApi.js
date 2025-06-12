import {api} from '../../../shared'

export const userApi = {
    registerAdminSchool: async (data) => api.post('/users/registration/school', data),
    loginUser: async (data) => api.post('/users/login', data),
    logoutUser: async (data) => api.post('/users/logout', data),

    setUserProfile: async (id) => api.get(`/user_profiles/${id}`),
    authCheck: async (data) => api.get('/auth/check', data),
    getSchoolUsers: async (data) => api.post('./users/getAllWhere', data),
    getSchoolUsersProfiles: async (data) => api.post('./users/getWithRole', data),
}