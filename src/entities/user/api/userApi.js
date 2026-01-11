import {api} from '../../../shared'

export const userApi = {
    registerAdminSchool: async (data) => api.post('/ownerschool/register', data),
    loginUser: async (data) => api.post('/user_accounts/login', data),
    logoutUser: async (data) => api.post('/user_accounts/logout', data),

    setUserAccount: async (id) => api.get(`/user_accounts/getone/${id}`),
    authCheck: async (data) => api.get('/auth/check', data),
    getSchoolUsers: async (data) => api.post('./user_accounts/getallwhere', data),
}